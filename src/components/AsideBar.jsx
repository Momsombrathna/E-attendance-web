import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
//import { IoChevronBackSharp } from "react-icons/io5";
//import { IoChevronForward } from "react-icons/io5";
//import { VscSignOut } from "react-icons/vsc";
import { PiGraduationCap } from "react-icons/pi";
import { LuUser } from "react-icons/lu";
import { IoHomeOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { isAdmin, isUser, logout } from "../context/AuthContext";
import { FaUsers } from "react-icons/fa6";
import { PiStudent } from "react-icons/pi";
import { RiAdminLine } from "react-icons/ri";
import { PiGraduationCapLight } from "react-icons/pi";
import { BiChevronsLeft } from "react-icons/bi";
import { BiChevronsRight } from "react-icons/bi";
import { adminRoutes, userRoutes } from "../routes/routesPoint";

import Logo from "../assets/e-attendance.png";
import Cookies from "js-cookie";

const AsideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [username, setUsername] = useState("");
  const [userProfile, setUserProfile] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const name = Cookies.get("username");
    const profile = Cookies.get("profile");
    const email = Cookies.get("email");

    setUsername(name);
    setUserProfile(profile);
    setUserEmail(email);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // handle close drawer and open drawer
  const handleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
  };

  // Dummy message count
  const messageCount = 200;

  return (
    <>
      <div className="flex flex-row h-screen">
        <div className="max-h-full">
          <div
            className={`fixed z-40 top-0 left-0 w-44 h-full bg-base-100 border-r border-base-300 transform transition-all duration-200 ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Add your drawer content here */}

            <div className="mt-16">
              <div className="py-4 overflow-y-auto">
                <ul className="space-y-1 font-medium">
                  {isAdmin() && (
                    <>
                      <h3 className="ms-3 font-medium mb-4 text-eee-500">
                        ADMIN SCREEN
                      </h3>
                      <li>
                        <Link
                          to={adminRoutes.dashboard}
                          className="flex items-center p-2 pl-6 hover:bg-base-200 group"
                        >
                          <LuLayoutDashboard className="w-5 h-5 text-base-400" />
                          <span className="ms-3 text-sm font-medium text-base-400">
                            Dashboard
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={adminRoutes.manageUsers}
                          className="flex items-center p-2 pl-6 text-base-400 hover:bg-base-200 group"
                        >
                          <FaUsers className="w-5 h-5 text-base-400" />
                          <span className="ms-3 text-sm font-medium text-base-400">
                            Users
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={adminRoutes.manageUsers}
                          className="flex items-center p-2 pl-6 text-base-400 hover:bg-base-200 group"
                        >
                          <PiStudent className="w-5 h-5 text-base-400" />
                          <span className="ms-3 text-sm font-medium text-base-400">
                            Students
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={adminRoutes.manageUsers}
                          className="flex items-center p-2 pl-6 text-base-400 hover:bg-base-200 group"
                        >
                          <RiAdminLine className="w-5 h-5 text-base-400" />
                          <span className="ms-3 text-sm font-medium text-base-400">
                            Teachers
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={adminRoutes.manageClasses}
                          className="flex items-center p-2 pl-6 text-base-400 hover:bg-base-200 group"
                        >
                          <PiGraduationCapLight className="w-5 h-5 text-base-400" />
                          <span className="ms-3 text-sm font-medium text-base-400">
                            Classes
                          </span>
                        </Link>
                      </li>
                    </>
                  )}

                  {isUser() && (
                    <>
                      <h3 className="ms-3 font-medium mb-4 text-eee-500">
                        USER SCREEN
                      </h3>
                      <li>
                        <Link
                          to={userRoutes.home}
                          className="flex items-center p-2 pl-6 hover:bg-base-200 group"
                        >
                          <IoHomeOutline className="w-5 h-5 text-base-400" />
                          <span className="ms-3 text-sm font-medium text-base-400">
                            Home
                          </span>
                        </Link>
                      </li>

                      <li>
                        <Link
                          to={userRoutes.profile}
                          className="flex items-center p-2 pl-6 text-base-400 hover:bg-base-200 group"
                        >
                          <LuUser className="w-5 h-5 text-base-400" />
                          <span className="ms-3 text-sm font-medium text-base-400">
                            Profile
                          </span>
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/classes"
                          className="flex items-center p-2 pl-6 text-base-400 hover:bg-base-200 group"
                        >
                          <PiGraduationCap className="w-5 h-5 text-base-400" />
                          <span className="ms-3 text-sm font-medium text-base-400">
                            Classes
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/attendance"
                          className="flex items-center p-2 pl-6 text-base-400 hover:bg-base-200 group"
                        >
                          <PiGraduationCap className="w-5 h-5 text-base-400" />
                          <span className="ms-3 text-sm font-medium text-base-400">
                            Join Class
                          </span>
                        </Link>
                      </li>
                    </>
                  )}
                  <h3 className="ms-3 font-medium mb-4 mt-2 text-eee-500">
                    PERSONAL
                  </h3>
                  <li>
                    <Link
                      to="/notification"
                      className="flex items-center p-2 pl-6 text-base-400 hover:bg-base-200 group"
                    >
                      <IoNotificationsOutline className="w-5 h-5 text-base-400" />
                      <span className="ms-3 text-sm font-medium text-base-400">
                        Notifications
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/classes"
                      className="flex items-center p-2 pl-6 text-base-400 hover:bg-base-200 group"
                    >
                      <IoMailOutline className="w-5 h-5 text-base-400" />
                      <span className="ms-3 text-sm font-medium text-base-400">
                        Messages
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`w-full h-screen overflow-hidden bg-base-200 transition-all duration-200 ease-in-out ${
            isOpen ? "pl-44" : ""
          }`}
        >
          <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 bg-base-300">
            <div className="navbar">
              <div className="flex-1">
                {isOpen ? (
                  <BiChevronsLeft
                    onClick={handleDrawer}
                    className="w-8 h-8 text-base-400 bg-base-100 hover:bg-base-200 rounded-md p-1 cursor-pointer"
                  />
                ) : (
                  <BiChevronsRight
                    onClick={handleDrawer}
                    className="w-8 h-8 bg-base-100 hover:bg-base-200 rounded-md p-1 text-base-400 cursor-pointer"
                  />
                )}

                <div className="hidden md:flex items-center px-4">
                  <img
                    src={Logo}
                    className="h-10 w-auto me-3 sm:h-7"
                    alt="e-attendance"
                  />
                  <p className="self-center pr-2 md:text-lg text-md font-bold whitespace-nowrap text-e_attendance-200">
                    E-attendance
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search"
                  className="input input-ghost bg-base-100 rounded-md md:rounded-lg border border-base-200 w-64 md:w-96"
                />

                <button className="btn btn-square btn-ghost relative">
                  <IoNotificationsOutline className="w-6 h-6 text-base-400" />
                  <span className="badge badge-sm badge-outline absolute top-1 right-1 bg-primary p-1 text-primary-content">
                    {messageCount > 99 ? "99+" : messageCount}
                  </span>
                </button>

                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img alt="User Profile" src={userProfile} />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                  >
                    <li>
                      <a
                        href="/profile"
                        className="justify-between bg-base-300"
                      >
                        {userEmail}
                      </a>
                    </li>
                    <li>
                      <a href="/profile" className="justify-between">
                        Profile
                        <span className="badge">New</span>
                      </a>
                    </li>
                    <li>
                      <a>Settings</a>
                    </li>
                    <li>
                      <button onClick={handleLogout}>Logout</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>

          <div
            className="h-full mt-12
          overflow-y-auto bg-base-200
          "
          >
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AsideBar;
