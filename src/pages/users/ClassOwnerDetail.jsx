import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CryptoJS from "crypto-js";
import apiPoints from "../../api/endpoints";
import { QueryRequest } from "../../api/apiService";
import useSWR, { mutate } from "swr";
import ScaleLoader from "react-spinners/ScaleLoader";
import Fuse from "fuse.js";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineEdit, MdOutlineRemoveRedEye } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import { RiDeleteBin2Line } from "react-icons/ri";
import { GoPeople } from "react-icons/go";
import { TbMapPin2 } from "react-icons/tb";
import MapPicker from "../../hooks/MapPicker";

const ClassOwnerDetail = () => {
  const { classId } = useParams();
  const [search, setSearch] = useState("");

  const bytes = CryptoJS.AES.decrypt(
    decodeURIComponent(classId),
    "secret-key-123"
  );

  const decryptedClassId = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  const fetcher = async (url) =>
    QueryRequest(apiPoints.attendance.getTimeline(decryptedClassId), "GET");

  const { data, error } = useSWR(
    apiPoints.attendance.getTimeline(decryptedClassId),
    fetcher
  );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <h1>Error fetching data</h1>
      </div>
    );
  if (!data)
    return (
      <div className="flex justify-center items-center h-screen">
        <ScaleLoader color="#4A90E2" />
      </div>
    );

  const classData = data.attendance;

  const fuse = new Fuse(classData, {
    keys: ["classData.description", "classData.date", "classData.studentName"],
  });

  const results = fuse.search(search);
  const classDataResults = search ? results.map((result) => result.item) : data;

  const convertRange = (range) => {
    const meters = range * 1000;
    return `${meters} m`;
  };

  return (
    <>
      <main className=" bg overflow-hidden h-screen px-2 p-2">
        <section className="flex mt-6 w-full">
          <div className="w-full h-14 bg-base-300 flex flex-row content-center items-center rounded-lg p-5">
            <div className="breadcrumbs md:flex hidden text-sm">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="#">Class</Link>
                </li>

                <li>User Profile</li>
              </ul>
            </div>
            <div className="ml-auto md:w-1/2 w-full h-8 flex gap-3 items-center">
              {/* search bar */}
              <div className="relative w-full">
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="absolute top-0 right-0 rounded-l-none btn bg-base-800 text-base-content">
                  <IoSearch size={"1.5rem"} />
                </button>
              </div>
              <button
                onClick={() => document.getElementById("my_modal").showModal()}
                className="btn text-base-content ml-auto"
              >
                <span className="md:flex hidden">Create</span>
                <IoAddCircleOutline
                  size={"2rem"}
                  className="text-base-content"
                />
              </button>

              {/* Create timeline */}
              <dialog id="my_modal" className="modal">
                <div className="modal-box">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <div className="flex flex-row items-center content-center">
                    <h3 className="font-bold text-base-800 text-lg">
                      Create Class
                    </h3>
                  </div>
                  <div className="flex flex-col w-full items-center content-center">
                    <div className="flex flex-row items-center">
                      {/* <input
                              type="text"
                              className="input input-bordered w-full"
                              placeholder="Class Description
                                  "
                              value={classDes}
                              onChange={(e) => SetClassDes(e.target.value)}
                            /> */}
                    </div>
                    <div className="flex mt-5 flex-row items-center">
                      {/* <button
                              onClick={handleCreateClass}
                              className="btn btn-sm btn-ghost bg-base-200"
                            >
                              {loading ? "Loading..." : "Create"}
                            </button> */}
                    </div>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
        </section>
        <section className="flex mt-3 w-full flex-col">
          <div className="overflow-x-auto w-full mb-6">
            <table
              className="
              table w-full table-compact table-zebra table-striped table-hover
            "
            >
              <tbody>
                {!classData.length ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No data found
                    </td>
                  </tr>
                ) : (
                  classData.map((classData) => (
                    <tr className=" rounded-lg bg-base-300" key={classData._id}>
                      <td className="truncate md:text-sm text-xs">
                        {classData.description}
                      </td>
                      <td className="md:text-sm text-xs">
                        {new Date(classData.from).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </td>
                      <td className="md:text-sm text-xs">
                        {new Date(classData.to).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </td>

                      <td className="flex flex-row gap-2">
                        <span
                          title="Location range"
                          className="btn btn-sm bg-base-100 hover:base-400 btn-ghost md:flex hidden"
                        >
                          {convertRange(classData.location_range)}
                        </span>
                        {/* View */}
                        <button
                          title="View attendance"
                          onClick={() => {
                            document.getElementById("my_modal_4").showModal();
                          }}
                          className="btn btn-sm btn-ghost bg-base-100 hover:bg-base-400 rounded-btn md:flex hidden"
                        >
                          <GoPeople size={"1.5rem"} />
                        </button>
                        {/* Map */}
                        <button
                          title="View map"
                          onClick={() => {
                            document.getElementById("model_map").showModal();
                          }}
                          className="btn btn-sm btn-ghost bg-base-100 hover:bg-base-400 rounded-btn md:flex hidden"
                        >
                          <TbMapPin2 size={"1.5rem"} />
                        </button>
                        {/* Map */}
                        <dialog id="model_map" className="modal">
                          <div className="modal-box">
                            <form method="dialog">
                              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                ✕
                              </button>
                            </form>
                            <h3 className="font-bold text-base-800 text-lg">
                              Map
                            </h3>
                            <div className="overflow-x-auto w-full flex flex-col items-center content-center">
                              <div className="w-full h-full bg-base-300 rounded-lg">
                                <MapPicker
                                  lat={classData.latitude}
                                  lon={classData.longitude}
                                  zoom={18}
                                  radius={classData.location_range}
                                />
                              </div>
                            </div>
                          </div>
                        </dialog>
                        {/* View attendance */}
                        <dialog id="my_modal_4" className="modal">
                          <div className="modal-box">
                            <form method="dialog">
                              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                ✕
                              </button>
                            </form>
                            <h3 className="font-bold text-base-800 text-lg">
                              Attendance
                            </h3>
                            <div className="overflow-x-auto w-full flex flex-col p-2 items-center content-center">
                              <tbody className="w-full bg-base-300 rounded-lg">
                                {!classData.attendances.length ? (
                                  <p>No attendance data found</p>
                                ) : (
                                  classData.attendances.map((attendance) => (
                                    <tr key={attendance._id}>
                                      <td className="w-20">
                                        <img
                                          src={attendance.studentProfile}
                                          className="w-8 h-8 rounded-full"
                                          alt="profile"
                                        />
                                      </td>

                                      <td>{attendance.studentName}</td>
                                      <td className="md:text-sm text-xs">
                                        {new Date(
                                          attendance.checkedIn
                                        ).toLocaleString("en-GB", {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                          hour12: true,
                                        })}
                                      </td>
                                      <td className="md:text-sm text-xs">
                                        {new Date(
                                          attendance.checkedOut
                                        ).toLocaleString("en-GB", {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                          hour12: true,
                                        })}
                                      </td>
                                      <td>
                                        {attendance.status === "absent" ? (
                                          <span className="text-red-500">
                                            ❌
                                          </span>
                                        ) : (
                                          <span className="text-green-500">
                                            ✅
                                          </span>
                                        )}
                                      </td>
                                    </tr>
                                  ))
                                )}
                              </tbody>
                            </div>
                          </div>
                        </dialog>
                      </td>
                      <td className="px-3 text-center">
                        <div className="dropdown dropdown-end">
                          <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-sm btn-ghost bg-base-100 hover:bg-base-400 rounded-btn dropdown-toggle "
                          >
                            <HiDotsHorizontal size={"1rem"} />
                          </div>

                          <ul
                            tabIndex={0}
                            className="dropdown-content flex justify-center mt-2 items-center z-[1] backdrop-blur-sm bg-base-100  rounded-box w-16 md:h-20 h-40"
                          >
                            <div className="flex flex-col items-center content-center gap-1">
                              {/* edit */}

                              <button
                                title="View attendance"
                                onClick={() => {
                                  document
                                    .getElementById("my_modal_4")
                                    .showModal();
                                }}
                                className="btn btn-sm btn-ghost bg-base-200 hover:bg-base-400  rounded-btn md:hidden flex"
                              >
                                <GoPeople size={"1.5rem"} />
                              </button>
                              {/* Map */}
                              <button
                                title="View map"
                                onClick={() => {
                                  document
                                    .getElementById("model_map")
                                    .showModal();
                                }}
                                className="btn btn-sm btn-ghost bg-base-200 hover:bg-base-400  rounded-btn md:hidden flex"
                              >
                                <TbMapPin2 size={"1.5rem"} />
                              </button>
                              <button className="btn btn-sm bg-base-200 hover:bg-base-400 btn-ghost">
                                <MdOutlineEdit size={"1.5rem"} />
                              </button>
                              <button
                                // onClick={() =>
                                //   handleDeleteClass(data._id, data.owner)
                                // }
                                className="btn btn-sm btn-ghost rounded-btn bg-red-400"
                              >
                                <RiDeleteBin2Line
                                  size={"1.5rem"}
                                  className="text-base-200"
                                />
                              </button>
                            </div>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
};

export default ClassOwnerDetail;
