import React, { useState } from "react";
import {
  MdDashboard,
  MdOutlineAddTask,
  MdOutlineDoNotDisturbOnTotalSilence,
  MdTaskAlt,
  MdExpandMore,
  MdExpandLess,
  MdLogout,
} from "react-icons/md";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

// Sidebar link data
const mainLinks = [
  { label: "Dashboard", link: "dashboard", icon: <MdDashboard /> },
  { label: "Tasks", link: "tasks", icon: <FaTasks /> },
  { label: "Completed", link: "completed/completed", icon: <MdTaskAlt /> },
];

const otherLinks = [
  { label: "Team", link: "team", icon: <FaUsers /> },
  { label: "Hackathons Blogs", link: "note", icon: <MdOutlineDoNotDisturbOnTotalSilence /> },
  { label: "Hacker Assistance", link: "ai", icon: <FaTasks /> },
];

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  // State for collapsing sections
  const [isMainOpen, setIsMainOpen] = useState(true);
  const [isOtherOpen, setIsOtherOpen] = useState(true);

  // Function to map over navigation links
  const NavLink = ({ el }) => (
    <Link
      to={el.link}
      className={clsx(
        "flex items-center gap-4 p-3 rounded-lg transition duration-300",
        path === el.link.split("/")[0]
          ? "bg-green-600 text-white" // Active link color
          : "text-gray-400 hover:bg-gray-700 hover:text-white" // Inactive link hover and text color
      )}
    >
      <span className={path === el.link.split("/")[0] ? "text-white" : "text-gray-400"}>
        {el.icon}
      </span>
      <span className="text-lg font-semibold">{el.label}</span>
    </Link>
  );

  return (
    <div className="w-64 h-full bg-gray-900 shadow-xl flex flex-col">
      {/* Logo Section */}
      <div className="flex items-center p-4">
        <img src="src/assets/logo.png" alt="Logo" className="w-12 h-12" />
        <span className="text-white text-xl font-bold ml-2">HackTask Me</span>
      </div>

      {/* Main Links Section */}
      <div className="flex-1 px-2 py-4">
        {/* Section Header */}
        <div
          className="flex items-center justify-between cursor-pointer text-gray-400 hover:text-white transition duration-300"
          onClick={() => setIsMainOpen(!isMainOpen)}
        >
          <span className="text-lg font-semibold">Main</span>
          {isMainOpen ? <MdExpandLess /> : <MdExpandMore />}
        </div>

        {/* Collapsible Main Links */}
        {isMainOpen && (
          <div className="mt-2">
            {mainLinks.map((link) => (
              <NavLink el={link} key={link.label} />
            ))}
          </div>
        )}

        {/* Other Links Section */}
        <div
          className="flex items-center justify-between cursor-pointer text-gray-400 mt-6 hover:text-white transition duration-300"
          onClick={() => setIsOtherOpen(!isOtherOpen)}
        >
          <span className="text-lg font-semibold">Others</span>
          {isOtherOpen ? <MdExpandLess /> : <MdExpandMore />}
        </div>

        {/* Collapsible Other Links */}
        {isOtherOpen && (
          <div className="mt-2">
            {otherLinks.map((link) => (
              <NavLink el={link} key={link.label} />
            ))}
          </div>
        )}
      </div>

      {/* Trash Section */}
      <div className="py-4 px-2">
        <Link
          to="/trashed"
          className="flex items-center gap-4 p-3 rounded-lg transition duration-300 text-gray-400 hover:bg-gray-700 hover:text-white"
        >
          <FaTrashAlt />
          <span className="text-lg font-semibold">Trash</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
