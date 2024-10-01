import React, { useState, useEffect } from "react";
import { Listbox, Transition, Dialog } from "@headlessui/react";
import { BsChevronExpand } from "react-icons/bs";
import { MdCheck } from "react-icons/md";
import { BiImages } from "react-icons/bi";
import ModalWrapper from "../ModalWrapper";
import Textbox from "../Textbox";
import Button from "../Button";
import SelectList from "../SelectList";
import UserList from "./UserList";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { dateFormatter } from "../../utils";

import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useTrashTaskMutation,
} from "../../redux/slices/api/taskApiSlice";

import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../utils/firebase";

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORITY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const AddTask = ({ open, setOpen, task }) => {
  const defaultValues = {
    title: task?.title || "",
    date: dateFormatter(task?.date || new Date()),
    team: task?.team || [],
    stage: task?.stage?.toUpperCase() || LISTS[0],
    priority: task?.priority?.toUpperCase() || PRIORITY[2],
    assets: task?.assets || [],
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ defaultValues });

  const [team, setTeam] = useState(defaultValues.team);
  const [stage, setStage] = useState(defaultValues.stage);
  const [priority, setPriority] = useState(defaultValues.priority);
  const [assets, setAssets] = useState(defaultValues.assets);
  const [uploading, setUploading] = useState(false);

  const [createTask, { isLoading: isCreating }] = useCreateTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const [trashTask, { isLoading: isTrashing }] = useTrashTaskMutation();

  useEffect(() => {
    if (task) {
      setValue("title", task.title);
      setValue("date", dateFormatter(task.date));
      setValue("team", task.team);
      setValue("stage", task.stage?.toUpperCase());
      setValue("priority", task.priority?.toUpperCase());
      setValue("assets", task.assets);
      setTeam(task.team);
      setStage(task.stage?.toUpperCase());
      setPriority(task.priority?.toUpperCase());
      setAssets(task.assets);
    }
  }, [task, setValue]);

  const submitHandler = async (data) => {
    setUploading(true);
    try {
      const fileURLs = [];
      for (const file of assets) {
        if (file && file.name) {
          const fileURL = await uploadFile(file);
          if (fileURL) {
            fileURLs.push(fileURL);
          }
        }
      }
  
      // Combine existing assets with newly uploaded assets
      const allAssets = [...(task?.assets || []), ...fileURLs.filter(url => url)];
  
      const newData = {
        ...data,
        assets: allAssets.filter(url => url), // Ensure no undefined URLs
        team: team.filter(Boolean), // Filter out null or undefined values
        stage: stage || LISTS[0],
        priority: priority || PRIORITY[2],
      };
  
      console.log("Data to send:", newData);
      console.log("Task ID:", task?._id);
  
      let res;
      if (task?._id) {
        res = await updateTask({ ...newData, _id: task._id }).unwrap();
      } else {
        res = await createTask(newData).unwrap();
      }
      toast.success(res.message);
      setTimeout(() => {
        setOpen(false);
      }, 500);
    } catch (error) {
      console.error("Error in submitHandler:", error.response ? error.response.data : error.message);
      toast.error("An error occurred while processing your request.");
    } finally {
      setUploading(false);
    }
  };
  

  const handleSelect = (e) => {
    const files = Array.from(e.target.files).filter(file => file && file.name); // Filter out invalid files
    setAssets(files);
  };

  const uploadFile = async (file) => {
    if (!file || !file.name) {
      return null; // Skip processing invalid files
    }

    const storage = getStorage(app);
    const name = new Date().getTime() + "-" + file.name;
    const storageRef = ref(storage, name);

    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log("Uploading");
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              resolve(downloadURL); // Return the download URL
            })
            .catch((error) => {
              reject(error);
            });
        }
      );
    });
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Dialog.Title
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            {task ? "UPDATE TASK" : "ADD TASK"}
          </Dialog.Title>

          <div className="mt-2 flex flex-col gap-6">
            <Textbox
              placeholder="Task Title"
              type="text"
              name="title"
              label="Task Title"
              className="w-full rounded"
              register={register("title", { required: "Title is required" })}
              error={errors.title ? errors.title.message : ""}
            />

            <UserList setTeam={setTeam} team={team} />

            <div className="flex gap-4">
              <SelectList
                label="Task Stage"
                lists={LISTS}
                selected={stage}
                setSelected={setStage}
              />

              <div className="w-full">
                <Textbox
                  placeholder="Date"
                  type="date"
                  name="date"
                  label="Task Date"
                  className="w-full rounded"
                  register={register("date", { required: "Date is required!" })}
                  error={errors.date ? errors.date.message : ""}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <SelectList
                label="Priority Level"
                lists={PRIORITY}
                selected={priority}
                setSelected={setPriority}
              />

              <div className="w-full flex items-center justify-center mt-4">
                <label
                  className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4"
                  htmlFor="imgUpload"
                >
                  <input
                    type="file"
                    className="hidden"
                    id="imgUpload"
                    onChange={handleSelect}
                    accept=".jpg, .png, .jpeg"
                    multiple={true}
                  />
                  <BiImages />
                  <span>Add Assets</span>
                </label>
              </div>
            </div>

            <div className="bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4">
              {uploading ? (
                <span className="text-sm py-2 text-red-500">
                  Uploading assets
                </span>
              ) : (
                <Button
                  label="Submit"
                  type="submit"
                  className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto"
                />
              )}

              <Button
                type="button"
                className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
                onClick={() => setOpen(false)}
                label="Cancel"
              />
            </div>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddTask;
