import React from "react";
import { PiStudent } from "react-icons/pi";
import { PiChalkboardTeacher } from "react-icons/pi";
import { PiGraduationCap } from "react-icons/pi";
import { IoPeopleOutline } from "react-icons/io5";
import { FaIdCard } from "react-icons/fa";
import PieCharts from "../partials/PieCharts";
import UserActivityChart from "../partials/UserActivityChart";

const AdminCard = ({
  total_users,
  total_students,
  total_teachers,
  total_classes,
  total_users_card,
  total_verified,
  total_unverified,
}) => {
  return (
    <>
      <section className="flex w-auto flex-col ">
        <main className="flex gap-2 justify-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-3">
            <a href="/manage-users">
              <div className="bg-white md:w-64 w-80 hover:bg-purple-100 hover:border hover:border-purple-300  h-24 rounded-lg shadow-md flex items-center justify-center">
                <div className="flex px-2 flex-row w-full items-center justify-center gap-3">
                  <div className=" bg-pink-100 rounded-full p-2">
                    <IoPeopleOutline className="text-5xl h-12 w-12 flex pr-0  p-1  md:text-6xl text-eee-700" />
                  </div>
                  <div className="flex w-52 flex-col">
                    <p className="text-lg md:text-lg text-eee-700 font-medium">
                      User
                    </p>
                    <p className="text-2xl text-pink-500 md:text-md font-medium">
                      {total_users}
                    </p>
                  </div>
                </div>
              </div>
            </a>

            <a href="manage-users">
              <div className="bg-white md:w-64 w-80 hover:bg-purple-100 hover:border hover:border-purple-300  h-24 rounded-lg shadow-md flex items-center justify-center">
                <div className="flex px-2 flex-row w-full items-center justify-center gap-3">
                  <div className=" bg-yellow-100 rounded-full p-2">
                    <PiStudent className="text-5xl h-12 w-12 flex pr-0  p-1  md:text-6xl text-eee-700" />
                  </div>
                  <div className="flex w-52 flex-col">
                    <p className="text-lg md:text-lg text-eee-700 font-medium">
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
              <div className="bg-white md:w-64 w-80 hover:bg-purple-100 hover:border hover:border-purple-300 h-24 rounded-lg shadow-md flex items-center justify-center">
                <div className="flex px-2 flex-row w-full items-center justify-center gap-3">
                  <div className=" bg-green-100 rounded-full p-2">
                    <PiChalkboardTeacher className="text-5xl h-12 w-12 flex pr-0  p-1  md:text-6xl text-eee-700" />
                  </div>
                  <div className="flex w-52 flex-col">
                    <p className="text-lg md:text-lg text-eee-700 font-medium">
                      Teachers
                    </p>
                    <p className="text-2xl md:text-md text-green-500 font-medium">
                      {total_teachers}
                    </p>
                  </div>
                </div>
              </div>
            </a>

            <a href="manage-users">
              <div className="bg-white md:w-64 w-80 hover:bg-purple-100 hover:border hover:border-purple-300 h-24 rounded-lg shadow-md flex items-center justify-center">
                <div className="flex px-2 flex-row w-full items-center justify-center gap-3">
                  <div className=" bg-blue-100 rounded-full p-2">
                    <PiGraduationCap className="text-5xl h-12 w-12 flex pr-0  p-1  md:text-6xl text-eee-700" />
                  </div>
                  <div className="flex w-52 flex-col">
                    <p className="text-lg md:text-lg text-eee-700 font-medium">
                      Classes
                    </p>
                    <p className="text-2xl md:text-md text-blue-500 font-medium">
                      {total_classes}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </main>
        <div className="flex md:flex-row flex-col gap-3">
          <div className="bg-white flex-col relative mt-5 md:w-64 w-80 h-60 px-5 md:px-0 rounded-lg shadow-md flex items-center justify-center">
            <div className=" absolute bg-purple-100 top-2 text-sm  px-2 rounded-xl text-eee-500 left-2">
              <p className="text-xl fnt-medium text-eee-700">
                User's card count
              </p>
            </div>
            <div className="mt-4">
              <FaIdCard size={"10rem"} className=" text-green-400" />
            </div>
            <p className="text-2xl text-green-500 md:text-md  font-medium">
              {total_users_card}
            </p>
          </div>

          <div className="bg-white relative mt-5 md:w-96 w-80 h-60 px-5 md:px-0 rounded-lg shadow-md flex items-center justify-center">
            <div className=" mt-1 absolute top-1 text-sm bg-yellow-100 px-2 rounded-xl text-eee-500 left-2">
              <p>Pie charts for user</p>
            </div>
            <div className="flex mt-5 px-2 flex-row w-full items-center justify-center">
              <PieCharts
                total_students={total_students}
                total_teachers={total_teachers}
                total_courses={total_classes}
              />
            </div>
          </div>
          <div className="bg-white relative mt-5 md:w-96 w-80 h-60 px-5 md:px-0 rounded-lg shadow-md flex items-center justify-center">
            <div className=" mt-1 absolute top-1 text-sm bg-cyan-100 px-2 rounded-xl text-eee-500 left-2">
              <p>Pie charts for user verified and not verified</p>
            </div>
            <div className="flex mt-5 px-2 flex-row w-full items-center justify-center">
              <UserActivityChart
                userActive={total_verified}
                userNonactive={total_unverified}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminCard;
