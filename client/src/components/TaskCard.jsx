import clsx from "clsx";
import React, { useState } from "react";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../utils";
import TaskDialog from "./task/TaskDialog";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import UserInfo from "./UserInfo";
import { IoMdAdd } from "react-icons/io";
import AddSubTask from "./task/AddSubTask";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const TaskCard = ({ task }) => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-full h-fit bg-white shadow-lg p-4 rounded-lg transition-transform hover:scale-105">
        <div className="flex justify-between mb-2">
          <div className={clsx("flex items-center text-sm font-medium", PRIOTITYSTYELS[task?.priority])}>
            <span className="text-xl">{ICONS[task?.priority]}</span>
            <span className="ml-2 uppercase">{task?.priority} Priority</span>
          </div>
          {user?.isAdmin && <TaskDialog task={task} />}
        </div>

        <div className="flex items-center gap-2 mb-1">
          <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])} />
          <h4 className="text-lg font-semibold line-clamp-1 text-black">{task?.title}</h4>
        </div>
        <span className="text-sm text-gray-600">{formatDate(new Date(task?.date))}</span>

        <div className="w-full border-t border-gray-200 my-2" />
        
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center text-sm text-gray-600">
              <BiMessageAltDetail />
              <span className="ml-1">{task?.activities?.length}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <MdAttachFile />
              <span className="ml-1">{task?.assets?.length}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FaList />
              <span className="ml-1">{task?.subTasks?.length} Subtasks</span>
            </div>
          </div>
          <div className="flex items-center">
            {task?.team?.slice(0, 3).map((member, index) => (
              <div
                key={index}
                className={clsx("w-8 h-8 rounded-full text-white flex items-center justify-center text-sm -mr-1", BGS[index % BGS.length])}
              >
                <UserInfo user={member} />
              </div>
            ))}
            {task?.team?.length > 3 && (
              <div className="w-8 h-8 rounded-full text-white flex items-center justify-center text-sm -mr-1 bg-gray-500">
                +{task?.team.length - 3}
              </div>
            )}
          </div>
        </div>

        {task?.subTasks?.length > 0 ? (
          <div className="py-2 border-t border-gray-200">
            <h5 className="text-base line-clamp-1 font-semibold text-black">{task?.subTasks[0].title}</h5>
            <span className="text-sm text-gray-600">{formatDate(new Date(task?.subTasks[0]?.date))}</span>
          </div>
        ) : (
          <div className="py-2 border-t border-gray-200">
            <span className="text-gray-500">No Sub Task</span>
          </div>
        )}

        <div className="w-full pb-2">
          <button
            onClick={() => setOpen(true)}
            disabled={!user.isAdmin}
            className="w-full flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600 disabled:cursor-not-allowed disabled:text-gray-300 transition-colors"
          >
            <IoMdAdd className="text-lg" />
            <span>ADD SUBTASK</span>
          </button>
        </div>
      </div>

      <AddSubTask open={open} setOpen={setOpen} id={task._id} />
    </>
  );
};

export default TaskCard;
