import clsx from "clsx";
import React from "react";
import { IoMdAdd } from "react-icons/io";

const TaskTitle = ({ label, className }) => {
  return (
    <div className="w-full h-12 px-4 rounded-md bg-gray-50 flex items-center justify-between shadow-sm transition-transform hover:scale-105">
      <div className="flex gap-3 items-center">
        <div className={clsx("w-5 h-5 rounded-full", className)} />
        <p className="text-base font-semibold text-gray-800">{label}</p>
      </div>
    </div>
  );
};

export default TaskTitle;
