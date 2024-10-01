import clsx from "clsx";
import moment from "moment";
import React, { useState } from "react";
import { FaBug, FaTasks, FaThumbsUp, FaUser } from "react-icons/fa";
import {
  MdKeyboardDoubleArrowUp,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  MdOutlineDoneAll,
  MdOutlineMessage,
  MdTaskAlt,
} from "react-icons/md";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import Loading from "../components/Loader";
import { useGetSingleTaskQuery } from "../redux/slices/api/taskApiSlice";
import { PRIOTITYSTYELS, TASK_TYPE, getInitials } from "../utils";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const bgColor = {
  high: "bg-red-200",
  medium: "bg-yellow-200",
  low: "bg-blue-200",
};

const TaskDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleTaskQuery(id);
  const task = data?.task;

  if (isLoading) {
    return (
      <div className="py-10">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-5 mb-4 overflow-y-hidden">
      <h1 className="text-3xl text-gray-800 font-bold">{task?.title}</h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="md:w-1/2 space-y-4">
            <div className="flex items-center justify-between">
              <div
                className={clsx(
                  "flex gap-2 items-center text-base font-semibold px-4 py-2 rounded-full",
                  PRIOTITYSTYELS[task?.priority],
                  bgColor[task?.priority]
                )}
              >
                <span className="text-lg">{ICONS[task?.priority]}</span>
                <span className="uppercase">{task?.priority} Priority</span>
              </div>
              <span className="text-gray-500">{task?.stage}</span>
            </div>

            <p className="text-gray-600">Created At: {new Date(task?.date).toLocaleDateString()}</p>

            <div className="flex items-center gap-8 border-b pb-4">
              <div>
                <span className="font-semibold">Assets:</span> {task?.assets?.length}
              </div>
              <div>
                <span className="font-semibold">Sub-Tasks:</span> {task?.subTasks?.length}
              </div>
            </div>

            <div className="space-y-4 py-4">
              <p className="text-gray-600 font-semibold">Task Team</p>
              {task?.team?.map((member, index) => (
                <div key={index} className="flex gap-4 items-center border-b pb-2">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                    {getInitials(member?.name)}
                  </div>
                  <div>
                    <p className="font-semibold">{member?.name}</p>
                    <span className="text-gray-500">{member?.title}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 py-4">
              <p className="text-gray-600 font-semibold">Sub-Tasks</p>
              {task?.subTasks?.map((subTask, index) => (
                <div key={index} className="flex gap-3 items-center border-b pb-2">
                  <MdTaskAlt className="text-violet-600" size={26} />
                  <div className="flex flex-col">
                    <span className="text-gray-500">{new Date(subTask?.date).toLocaleDateString()}</span>
                    <p className="text-gray-700">{subTask?.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/2 space-y-4">
            <p className="text-lg font-semibold">Assets</p>
            <div className="grid grid-cols-2 gap-4">
              {task?.assets?.map((asset, index) => (
                <img
                  key={index}
                  src={asset}
                  alt={task?.title}
                  className="rounded-lg h-36 cursor-pointer transition-transform duration-300 hover:scale-110"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
