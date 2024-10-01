import clsx from "clsx";
import React, { useState } from "react";
import {
  MdDelete,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineRestore,
} from "react-icons/md";
import Title from "../components/Title";
import Button from "../components/Button";
import { PRIOTITYSTYELS, TASK_TYPE } from "../utils";
import ConfirmatioDialog from "../components/Dialogs";
import {
  useDeleteRestoreTaskMutation,
  useGetAllTaskQuery,
} from "../redux/slices/api/taskApiSlice";
import Loading from "../components/Loader";
import { toast } from "sonner";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const Trash = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [msg, setMsg] = useState(null);
  const [type, setType] = useState("delete");
  const [selected, setSelected] = useState("");

  const { data, isLoading, error, refetch } = useGetAllTaskQuery({
    strQuery: "",
    isTrashed: "true",
    search: "",
  });

  const [deleteRestoreTask] = useDeleteRestoreTaskMutation();

  const handleDeleteRestore = async () => {
    try {
      let result = await deleteRestoreTask({ id: selected, actionType: type }).unwrap();
      toast.success(result?.message);
      setOpenDialog(false);
      refetch();
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || error.error);
    }
  };

  const openDialogForAction = (actionType, id, message) => {
    setType(actionType);
    setSelected(id);
    setMsg(message);
    setOpenDialog(true);
  };

  const deleteClick = (id) => openDialogForAction("delete", id, "Do you want to permanently delete the selected item?");
  const restoreClick = (id) => openDialogForAction("restore", id, "Do you want to restore the selected item?");
  const deleteAllClick = () => openDialogForAction("deleteAll", null, "Do you want to permanently delete all items?");
  const restoreAllClick = () => openDialogForAction("restoreAll", null, "Do you want to restore all items in the trash?");

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading tasks. Please try again later.</div>;

  const TableHeader = () => (
    <thead className="border-b border-gray-300">
      <tr className="text-black text-left">
        <th className="py-2">Task Title</th>
        <th className="py-2">Priority</th>
        <th className="py-2">Stage</th>
        <th className="py-2 line-clamp-1">Modified On</th>
        <th className="py-2">Actions</th>
      </tr>
    </thead>
  );

  const TableRow = ({ item }) => (
    <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10">
      <td className="py-2">
        <div className="flex items-center gap-2">
          <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[item.stage])} />
          <p className="w-full line-clamp-2 text-base text-black">{item?.title}</p>
        </div>
      </td>
      <td className="py-2 capitalize">
        <div className="flex gap-1 items-center">
          <span className={clsx("text-lg", PRIOTITYSTYELS[item?.priority])}>{ICONS[item?.priority]}</span>
          <span>{item?.priority}</span>
        </div>
      </td>
      <td className="py-2 capitalize text-center">{item?.stage}</td>
      <td className="py-2 text-sm">{new Date(item?.date).toDateString()}</td>
      <td className="py-2 flex gap-1 justify-end">
        <Button icon={<MdOutlineRestore className="text-xl text-gray-500" />} onClick={() => restoreClick(item._id)} />
        <Button icon={<MdDelete className="text-xl text-red-600" />} onClick={() => deleteClick(item._id)} />
      </td>
    </tr>
  );

  return (
    <>
      <div className="w-full md:px-1 px-0 mb-6">
        <div className="flex items-center justify-between mb-8">
          <Title title="Trashed Tasks" />
          <div className="flex gap-2 md:gap-4 items-center">
            <Button label="Restore All" icon={<MdOutlineRestore />} className="text-black" onClick={restoreAllClick} />
            <Button label="Delete All" icon={<MdDelete />} className="text-red-600" onClick={deleteAllClick} />
          </div>
        </div>
        <div className="bg-white px-2 md:px-6 py-4 shadow-md rounded">
          <div className="overflow-x-auto">
            <table className="w-full mb-5">
              <TableHeader />
              <tbody>
                {data?.tasks?.length > 0 ? (
                  data.tasks.map((task) => <TableRow key={task._id} item={task} />)
                ) : (
                  <tr>
                    <td colSpan="5" className="py-4 text-center text-gray-500">No trashed tasks found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        msg={msg}
        onClick={handleDeleteRestore}
      />
    </>
  );
};

export default Trash;
