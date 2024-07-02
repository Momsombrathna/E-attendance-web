import React from "react";
import { FaIdCard } from "react-icons/fa";
import PieCharts from "../partials/PieCharts";
import UserActivityChart from "../partials/UserActivityChart";
import UsersChart from "../partials/UsersChart";
import ClassAndTeacherCharts from "../partials/ClassAndTeacherChart";

const ChartCard = ({
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
        <div className="flex md:flex-row flex-col gap-3">
          <div className="backdrop-blur-xl bg-white/10  flex-col relative mt-5 md:w-64 w-80 h-60 px-5 md:px-0 rounded-lg shadow-md flex items-center justify-center">
            <div className=" absolute  top-2 text-sm  px-2 rounded-xl text-eee-500 left-2">
              <p className=" fnt-medium text-gray-400">User's card count</p>
            </div>
            <div className="mt-4">
              <FaIdCard size={"10rem"} className=" text-green-400" />
            </div>
            <p className="text-2xl text-green-500 md:text-md  font-medium">
              {total_users_card}
            </p>
          </div>

          <div className="backdrop-blur-xl bg-white/10  relative mt-5 md:w-96 w-80 h-60 px-5 md:px-0 rounded-lg shadow-md flex items-center justify-center">
            <div className="mt-1 absolute top-1 text-sm px-2 rounded-xl text-eee-500 left-2">
              <p className="text-gray-400">Users and Admin chart</p>
            </div>
            <div className="flex mt-5 px-2 flex-row w-full items-center justify-center">
              <UsersChart total_users={total_users} total_admin={total_admin} />
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/10 relative  mt-5 md:w-96 w-80 h-60 px-5 md:px-0 rounded-lg shadow-md flex items-center justify-center">
            <div className=" mt-1 absolute top-1 text-sm px-2 rounded-xl text-eee-500 left-2">
              <p className="text-gay-400">Pie charts for user</p>
            </div>
            <div className="flex mt-5 px-2 flex-row w-full items-center justify-center">
              <PieCharts
                total_students={total_students}
                total_teachers={total_teachers}
                total_courses={total_classes}
              />
            </div>
          </div>
        </div>
        <div className="flex md:flex-row flex-col gap-3">
          <div className="backdrop-blur-xl bg-white/10  relative mt-5 md:w-96 w-80 h-60 px-5 md:px-0 rounded-lg shadow-md flex items-center justify-center">
            <div className=" mt-1 absolute top-1 text-sm  px-2 rounded-xl text-eee-500 left-2">
              <p className="text-gay-400">
                Pie charts for user verified and not verified
              </p>
            </div>
            <div className="flex mt-5 px-2 flex-row w-full items-center justify-center">
              <UserActivityChart
                userActive={total_verified}
                userNonactive={total_unverified}
              />
            </div>
          </div>
          <div className="backdrop-blur-xl bg-white/10  relative mt-5 md:w-96 w-80 h-60 px-5 md:px-0 rounded-lg shadow-md flex items-center justify-center">
            <div className=" mt-1 absolute top-1 text-sm px-2 rounded-xl text-eee-500 left-2">
              <p className="text-gay-400">Teacher and Classes charts</p>
            </div>
            <div className="flex mt-5 px-2 flex-row w-full items-center justify-center">
              <ClassAndTeacherCharts
                total_teachers={total_teachers}
                total_class={total_classes}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChartCard;
