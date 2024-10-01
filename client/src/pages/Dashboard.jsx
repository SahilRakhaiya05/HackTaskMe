import React from "react";
import {
  MdAdminPanelSettings,
  MdKeyboardDoubleArrowUp,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import { FaNewspaper, FaUsers } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import moment from "moment";
import clsx from "clsx";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, getInitials } from "../utils";
import UserInfo from "../components/UserInfo";
import { useGetDashboardstatesQuery } from "../redux/slices/api/taskApiSlice";
import Loading from "../components/Loader";
import Chart from "../components/Chart";

const TaskTable = ({ tasks }) => {
  const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  };

  const TableHeader = () => (
    <thead className="bg-gray-200 text-gray-800">
      <tr>
        <th className="py-3 text-left">Task Title</th>
        <th className="py-3 text-left">Priority</th>
        <th className="py-3 text-left">Team</th>
        <th className="py-3 text-left hidden md:block">Created At</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-3 flex items-center">
        <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])} />
        <p className="ml-2 text-gray-800 font-medium">{task.title}</p>
      </td>
      <td className="py-3">
        <div className="flex items-center">
          <span className={clsx("text-lg", PRIOTITYSTYELS[task.priority])}>
            {ICONS[task.priority]}
          </span>
          <span className="ml-1 capitalize">{task.priority}</span>
        </div>
      </td>
      <td className="py-3">
        <div className="flex">
          {task.team.map((m, index) => (
            <div key={index} className={clsx("w-7 h-7 rounded-full flex items-center justify-center text-sm -mr-1", BGS[index % BGS.length])}>
              <UserInfo user={m} />
            </div>
          ))}
        </div>
      </td>
      <td className="py-3 hidden md:block">
        <span className="text-gray-600">{moment(task.date).fromNow()}</span>
      </td>
    </tr>
  );

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-lg">
      <table className="w-full">
        <TableHeader />
        <tbody>
          {tasks?.map((task, id) => (
            <TableRow key={id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const UserTable = ({ users }) => {
  const TableHeader = () => (
    <thead className="bg-gray-200 text-gray-800">
      <tr>
        <th className="py-3 text-left">Full Name</th>
        <th className="py-3 text-left">Status</th>
        <th className="py-3 text-left">Created At</th>
      </tr>
    </thead>
  );

  
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-lg">
      <table className="w-full">
        <TableHeader />
        <tbody>
          {users?.map((user, index) => (
            <TableRow key={index + user?._id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Dashboard = () => {
  const { data, isLoading } = useGetDashboardstatesQuery();

  if (isLoading)
    return (
      <div className="py-10">
        <Loading />
      </div>
    );

  const totals = data?.tasks || {};

  const stats = [
    {
      _id: "1",
      label: "Total Tasks",
      total: data?.totalTasks || 0,
      icon: <FaNewspaper />,
      bg: "bg-blue-600",
    },
    {
      _id: "2",
      label: "Completed Tasks",
      total: totals["completed"] || 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-green-600",
    },
    {
      _id: "3",
      label: "In Progress Tasks",
      total: totals["in progress"] || 0,
      icon: <LuClipboardEdit />,
      bg: "bg-yellow-600",
    },
    {
      _id: "4",
      label: "To Do Tasks",
      total: totals["todo"] || 0,
      icon: <FaArrowsToDot />,
      bg: "bg-red-600",
    },
  ];

  const Card = ({ label, count, bg, icon }) => (
    <div className="bg-white p-5 rounded-lg shadow-md flex items-center justify-between transition-transform transform hover:scale-105">
      <div className="flex flex-col">
        <p className="text-gray-700 font-medium">{label}</p>
        <span className="text-2xl font-bold">{count}</span>
      </div>
      <div className={clsx("w-12 h-12 rounded-full flex items-center justify-center text-white", bg)}>
        {icon}
      </div>
    </div>
  );

  return (
    <div className="h-full py-6 px-8 bg-gray-50">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Hacker Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map(({ icon, bg, label, total }, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>

      <div className="bg-white mb-10 p-6 rounded-lg shadow-lg">
        <h4 className="text-xl text-gray-800 font-semibold mb-4">Task Chart</h4>
        <Chart data={data?.graphData} />
      </div>

    </div>
  );
};

export default Dashboard;
