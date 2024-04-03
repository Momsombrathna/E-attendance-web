import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { IoChevronForward } from "react-icons/io5";
import { VscSignOut } from "react-icons/vsc";
import { PiGraduationCap } from "react-icons/pi";
import { LuUser } from "react-icons/lu";
import { IoHomeOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { isAdmin, isUser, logout } from "../auth/AuthContext";
import Logo from "../assets/e-attendance.png";
import Cookies from "js-cookie";
import { api_url, decodedToken, decodedUserID } from "../api/config";
import Swal from "sweetalert2";
import axios from "axios";

const AsideBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  // handle close drawer and open drawer
  const handleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div className="flex flex-row ">
        <div>
          <div
            className={`fixed top-0 left-0 w-44 h-full bg-white drop-shadow-2xl dark:bg-gray-800 transform transition-all duration-200 ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <button
              className="p-2 mt-20 flex float-right absolute text-white bg-white drop-shadow-md rounded-full hover:bg-eee-100 top-2 right-0 transform translate-x-1/2 -translate-y-1/2"
              onClick={handleDrawer}
            >
              {isOpen ? (
                <IoChevronBackSharp class="w-5 h-5 text-eee-700" />
              ) : (
                <IoChevronForward class="w-5 h-5 pl-2 text-eee-700" />
              )}
            </button>
            {/* Add your drawer content here */}

            <div className=" mt-2">
              <a href="/" class="flex items-center ps-1 mb-5">
                <img
                  src={Logo}
                  class=" h-10 w-auto me-3 sm:h-7"
                  alt="e-attendance"
                />
                <p class="self-center pr-2 md:text-lg text-md font-bold whitespace-nowrap text-e_attendance-200">
                  E-Attendance
                </p>
              </a>
              <div class="py-4 overflow-y-auto">
                <ul class="space-y-1 font-medium">
                  {isAdmin() && (
                    <>
                      <h3 class="ms-3 font-medium mb-4 text-eee-500">ADMIN</h3>
                      <li>
                        <Link
                          to="/dashboard"
                          class={`flex items-center p-2 text-slate-800 hover:bg-eee-100 group
                        `}
                        >
                          <LuLayoutDashboard class="w-5 h-5 text-eee-700" />
                          <span class="ms-3 text-sm font-medium text-eee-700">
                            Dashboard
                          </span>
                        </Link>
                      </li>
                      <hr />
                    </>
                  )}

                  {(isUser() || isAdmin()) && (
                    <>
                      <h3 class="ms-3 font-medium mb-4 text-eee-500">USER</h3>
                      <li>
                        <Link
                          to="/"
                          class={`flex items-center p-2 hover:bg-eee-100 group`}
                          activeClassName="bg-eee-100"
                        >
                          <IoHomeOutline class="w-5 h-5 text-eee-700" />
                          <span class="ms-3 text-sm font-medium text-eee-700">
                            Home
                          </span>
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/profile"
                          class="flex items-center p-2 text-slate-800 hover:bg-eee-100 group"
                        >
                          <LuUser class="w-5 h-5 text-eee-700" />
                          <span class="ms-3 text-sm font-medium text-eee-700">
                            Profile
                          </span>
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/classes"
                          class="flex items-center p-2 text-slate-800 hover:bg-eee-100 group"
                        >
                          <PiGraduationCap class="w-5 h-5 text-eee-700" />
                          <span class="ms-3 text-sm font-medium text-eee-700">
                            Classes
                          </span>
                        </Link>
                      </li>

                      <hr />
                      <h3 class="ms-3 font-medium mb-4  mt-2 text-eee-500">
                        PERSONAL
                      </h3>
                      <li>
                        <Link
                          to="/notification"
                          class="flex items-center p-2 text-slate-800 hover:bg-eee-100 group"
                        >
                          <IoNotificationsOutline class="w-5 h-5 text-eee-700" />
                          <span class="ms-3 text-sm font-medium text-eee-700">
                            Notifications
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/classes"
                          class="flex items-center p-2 text-slate-800 hover:bg-eee-100 group"
                        >
                          <IoMailOutline class="w-5 h-5 text-eee-700" />
                          <span class="ms-3 text-sm font-medium text-eee-700">
                            Messages
                          </span>
                        </Link>
                      </li>
                      <hr />
                    </>
                  )}
                  <li>
                    <div
                      onClick={handleLogout}
                      class="flex items-center cursor-pointer p-2 text-slate-800 hover:bg-eee-100 group"
                    >
                      <VscSignOut class="w-5 h-5 text-eee-700" />
                      <span class="ms-3 text-sm font-medium text-eee-700">
                        Logout
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className={`flex-grow ${isOpen ? " pl-44" : ""}`}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AsideBar;
