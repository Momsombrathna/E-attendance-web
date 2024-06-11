import React from "react";
import { PiStudent } from "react-icons/pi";
import { PiChalkboardTeacher } from "react-icons/pi";
import { PiGraduationCap } from "react-icons/pi";
import { IoPeopleOutline } from "react-icons/io5";
import { FaIdCard } from "react-icons/fa";
import PieCharts from "../partials/PieCharts";
import UserActivityChart from "../partials/UserActivityChart";
import { RiAdminLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa6";
import UsersChart from "../partials/UsersChart";
import ClassAndTeacherCharts from "../partials/ClassAndTeacherChart";

const AdminCard = ({
  total_all_users,
  total_students,
  total_teachers,
  total_classes,
  total_users_card,
  total_verified,
  total_unverified,
  total_users,
  total_admin,
}) => {
  return (
    <>
      <section className="flex w-auto flex-col ">
        <main className="flex gap-2 justify-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-3">
            <a href="/manage-users">
              <div className=" backdrop-blur-xl bg-white/10  md:w-64 w-80 hover:bg-white/20  h-24 rounded-lg shadow-md flex items-center justify-center">
                <div className="flex px-2 flex-row w-full items-center justify-center gap-3">
                  <div className=" bg-pink-100 rounded-full p-2">
                    <IoPeopleOutline className="text-5xl h-12 w-12 flex pr-0  p-1  md:text-6xl text-gray-700" />
                  </div>
                  <div className="flex w-52 flex-col">
                    <p className="text-lg md:text-lg text-gray-200 font-medium">
                      All Users
                    </p>
                    <p className="text-2xl text-pink-500 md:text-md font-medium">
                      {total_all_users}
                    </p>
                  </div>
                </div>
              </div>
            </a>

            <a href="/manage-users">
              <div className="backdrop-blur-xl bg-white/10  md:w-64 w-80 hover:bg-white/20  h-24 rounded-lg shadow-md flex items-center justify-center">
                <div className="flex px-2 flex-row w-full items-center justify-center gap-3">
                  <div className=" bg-yellow-100 rounded-full p-2">
                    <PiStudent className="text-5xl h-12 w-12 flex pr-0  p-1  md:text-6xl text-gray-700" />
                  </div>
                  <div className="flex w-52 flex-col">
                    <p className="text-lg md:text-lg text-gray-200 font-medium">
                      Students
                    </p>
                    <p className="text-2xl md:text-md text-yellow-500 font-medium">
                      {total_students}
                    </p>
                  </div>
                </div>
              </div>
            </a>

            <a href="manage-users">
              <div className="backdrop-blur-xl bg-white/10  md:w-64 w-80 hover:bg-white/20 h-24 rounded-lg shadow-md flex items-center justify-center">
                <div className="flex px-2 flex-row w-full items-center justify-center gap-3">
                  <div className=" bg-green-100 rounded-full p-2">
                    <PiChalkboardTeacher className="text-5xl h-12 w-12 flex pr-0  p-1  md:text-6xl text-gray-700" />
                  </div>
                  <div className="flex w-52 flex-col">
                    <p className="text-lg md:text-lg text-gray-200 font-medium">
                      Teachers
                    </p>
                    <p className="text-2xl md:text-md text-green-500 font-medium">
                      {total_teachers}
                    </p>
                  </div>
                </div>
              </div>
            </a>

            <a href="/manage-classes">
              <div className="backdrop-blur-xl bg-white/10  md:w-64 w-80 hover:bg-white/20 h-24 rounded-lg shadow-md flex items-center justify-center">
                <div className="flex px-2 flex-row w-full items-center justify-center gap-3">
                  <div className=" bg-blue-100 rounded-full p-2">
                    <PiGraduationCap className="text-5xl h-12 w-12 flex pr-0  p-1  md:text-6xl text-gray-700" />
                  </div>
                  <div className="flex w-52 flex-col">
                    <p className="text-lg md:text-lg text-gray-200 font-medium">
                      Classes
                    </p>
                    <p className="text-2xl md:text-md text-blue-500 font-medium">
                      {total_classes}
                    </p>
                  </div>
                </div>
              </div>
            </a>

            <a href="/manage-users">
              <div className="backdrop-blur-xl bg-white/10 md:w-64 w-80 hover:bg-white/20 h-24 rounded-lg shadow-md flex items-center justify-center">
                <div className="flex px-2 flex-row w-full items-center justify-center gap-3">
                  <div className=" bg-purple-100 rounded-full p-2">
                    <RiAdminLine className="text-5xl h-12 w-12 flex pr-0  p-1  md:text-6xl text-gray-700" />
                  </div>
                  <div className="flex w-52 flex-col">
                    <p className="text-lg md:text-lg text-gray-200 font-medium">
                      Admin
                    </p>
                    <p className="text-2xl md:text-md text-purple-500 font-medium">
                      {total_admin}
                    </p>
                  </div>
                </div>
              </div>
            </a>

            <a href="/manage-users">
              <div className="backdrop-blur-xl bg-white/10 md:w-64 w-80 hover:bg-white/20 h-24 rounded-lg shadow-md flex items-center justify-center">
                <div className="flex px-2 flex-row w-full items-center justify-center gap-3">
                  <div className=" bg-red-100 rounded-full p-2">
                    <FaRegUser className="text-5xl h-12 w-12 flex pr-0  p-1  md:text-6xl text-gray-700" />
                  </div>
                  <div className="flex w-52 flex-col">
                    <p className="text-lg md:text-lg text-gray-200 font-medium">
                      Users
                    </p>
                    <p className="text-2xl md:text-md text-red-500 font-medium">
                      {total_users}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </main>
      </section>
    </>
  );
};

export default AdminCard;
