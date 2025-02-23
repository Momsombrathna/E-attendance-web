import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import {
  QueryRequest,
  DeleteRequest,
  CreateClassRequest,
} from "../../api/apiService";
import apiPoints from "../../api/endpoints";
import ScaleLoader from "react-spinners/ScaleLoader";
import Fuse from "fuse.js";
import { IoAddCircleOutline } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
import { Link } from "react-router-dom";
import { LuUsers } from "react-icons/lu";
import { FaQrcode } from "react-icons/fa6";
import { LuDownload } from "react-icons/lu";
import { IoMdShare } from "react-icons/io";
import CryptoJs from "crypto-js";
import QRCode from "react-qr-code";
import { GrUserAdmin } from "react-icons/gr";
import { IoIosAddCircleOutline } from "react-icons/io";
import { HiOutlinePencilSquare } from "react-icons/hi2";

const fetcher = (url) =>
  QueryRequest(apiPoints.classEndpoints.classOwner, "GET");

const UserHome = () => {
  const { data, error } = useSWR(apiPoints.classEndpoints.classOwner, fetcher);
  const [searchQuery, setSearchQuery] = useState("");
  const [classDes, SetClassDes] = useState("");
  const [loading, setLoading] = useState("");

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

  const fuse = new Fuse(data, {
    keys: ["className", "ownerName", "students.studentName"],
    includeScore: true,
  });
  const results = searchQuery
    ? fuse.search(searchQuery).map((result) => result.item)
    : data;

  const handleDeleteClass = async (classId, ownerId) => {
    try {
      await DeleteRequest(
        apiPoints.classEndpoints.deleteSingleClass(classId),
        "DELETE",
        ownerId
      );
      mutate(apiPoints.classEndpoints.classOwner);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateClass = async () => {
    setLoading(true);

    try {
      await CreateClassRequest(
        apiPoints.classEndpoints.addClass,
        "POST",
        classDes
      );
      setLoading(false);
      document.getElementById("my_modal").close();
      mutate(apiPoints.classEndpoints.classOwner);
    } catch (error) {
      document.getElementById("my_modal").close();
      console.log(error);
    }
  };

  return (
    <>
      <main className="overflow-y-auto bg overflow-hidden h-screen px-2 p-2">
        <section className="flex mt-6 w-full">
          <div className="w-full h-14 bg-base-300 flex flex-row content-center items-center rounded-lg p-5">
            <div className="breadcrumbs md:flex hidden text-sm">
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/users">User</a>
                </li>
                <li>User Profile</li>
              </ul>
            </div>
            <div className="ml-auto md:w-2/3 w-full h-8 flex gap-3 items-center">
              {/* search bar */}
              <div className="relative w-full">
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="absolute top-0 right-0 rounded-l-none btn bg-base-800 text-base-content">
                  Search
                </button>
              </div>
              <button
                onClick={() => document.getElementById("my_modal").showModal()}
                className="btn text-base-content ml-auto"
              >
                Create
                <IoAddCircleOutline
                  size={"2rem"}
                  className="text-base-content"
                />
              </button>
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
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Class Description
                            "
                        value={classDes}
                        onChange={(e) => SetClassDes(e.target.value)}
                      />
                    </div>
                    <div className="flex mt-5 flex-row items-center">
                      <button
                        onClick={handleCreateClass}
                        className="btn btn-sm btn-ghost bg-base-200"
                      >
                        {loading ? "Loading..." : "Create"}
                      </button>
                    </div>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
        </section>
        <section className="flex mt-3 w-full flex-col">
          {results.map((data) => (
            <div key={data._id} className="bg-base-300 p-2 rounded-lg mb-4">
              <div className="flex items-center">
                <img
                  src={`${data.classProfile}?timestamp=${new Date().getTime()}`}
                  alt={`${data.className} Profile`}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div className="flex flex-col">
                  <div className="flex flex-row gap-2 items-center content-center">
                    <h2 className="text-xl font-bold">{data.className}</h2>
                    <p className="text-xl font-bold">
                      {" "}
                      &#91; {data.code} &#93;{" "}
                    </p>
                  </div>
                  <p>Owner: {data.ownerName}</p>

                  <p>Created: {new Date(data.created).toLocaleDateString()}</p>
                </div>
                <div className="ml-auto flex flex-row content-center gap-2  items-center">
                  <div
                    onClick={() =>
                      document.getElementById("my_modal_2").showModal()
                    }
                    tabIndex={0}
                    title="Members"
                    role="button"
                    className="
                        md:flex hidden
                        btn btn-sm
                        btn-ghost
                        rounded-btn
                        bg-base-200
                        dropdown-toggle"
                  >
                    <IoIosAddCircleOutline size={"1.5rem"} />
                  </div>

                  <dialog id="my_modal_2" className="modal">
                    <div className="modal-box">
                      <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                          ✕
                        </button>
                      </form>
                      <div className="flex flex-row items-center content-center gap-2">
                        <h3 className="font-bold text-base-800 text-lg">
                          Class QR code
                        </h3>
                      </div>
                      <div className="flex flex-col w-full items-center content-center py-2 gap-2">
                        <div className="flex flex-row items-center gap-2">
                          <button className="btn btn-sm btn-circle btn-ghost bg-base-200">
                            <LuDownload size={"1.5rem"} />
                          </button>
                          <button className="btn btn-sm btn-circle btn-ghost bg-base-200">
                            <IoMdShare size={"1.5rem"} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </dialog>
                  <div
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                    tabIndex={0}
                    title="Members"
                    role="button"
                    className="
                        md:flex hidden
                        btn btn-sm
                        btn-ghost
                        rounded-btn
                        bg-base-200
                        dropdown-toggle
                      "
                  >
                    <LuUsers size={"1.5rem"} />
                  </div>
                  <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                      <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                          ✕
                        </button>
                      </form>
                      <h3 className="font-bold text-base-800 text-lg">
                        Members
                      </h3>
                      <div className="flex flex-col py-2 gap-2">
                        {data.students.map((student) => (
                          <div
                            key={student.studentName}
                            className="flex flex-row items-center gap-2"
                          >
                            <img
                              src={`${
                                student.studentProfile
                              }?timestamp=${new Date().getTime()}`}
                              alt={`${student.studentName} Profile`}
                              className="w-10 h-10 rounded-full"
                            />

                            <div className=" flex flex-row items-center gap-2">
                              <p>{student.studentName}</p>
                              {student.studentId === data.owner ? (
                                <span title="Class Owner">✅</span>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </dialog>
                  <td className="px-3 text-center">
                    <div className="dropdown dropdown-end">
                      <div
                        tabIndex={0}
                        role="button"
                        className="
                        btn btn-sm
                        btn-ghost
                        rounded-btn
                        bg-base-200
                        dropdown-toggle
                      "
                      >
                        <HiDotsHorizontal size={"1rem"} />
                      </div>

                      <ul
                        tabIndex={0}
                        className="dropdown-content flex justify-center mt-2 items-center z-[1] backdrop-blur-sm bg-base-100  rounded-box w-24 md:h-20 h-40"
                      >
                        <div className="flex flex-col w-20 gap-2">
                          <div>
                            <button
                              onClick={() =>
                                handleDeleteClass(data._id, data.owner)
                              }
                              className="bg-red-500 w-20 text-white py-1 px-3 rounded-md text-xs font-medium"
                            >
                              Delete
                            </button>
                          </div>
                          <div>
                            <Link
                              to={`/class-owner-detail/${encodeURIComponent(
                                CryptoJs.AES.encrypt(
                                  JSON.stringify(data._id),
                                  "secret-key-123"
                                ).toString()
                              )}`}
                            >
                              <button className="bg-blue-500 w-20 text-white py-1 px-3 rounded-md text-xs font-medium">
                                View
                              </button>
                            </Link>
                          </div>

                          <div
                            onClick={() =>
                              document.getElementById("my_modal_3").showModal()
                            }
                            tabIndex={0}
                            title="Members"
                            role="button"
                            className="
                                     md:hidden flex
                                      btn btn-sm
                                      btn-ghost
                                      rounded-btn
                                      bg-base-200
                                      dropdown-toggle
                                    "
                          >
                            <LuUsers size={"1.5rem"} />
                          </div>
                          <div
                            onClick={() =>
                              document.getElementById("my_modal_2").showModal()
                            }
                            tabIndex={0}
                            title="Members"
                            role="button"
                            className="
                                      md:hidden flex
                                      btn btn-sm
                                      btn-ghost
                                      rounded-btn
                                      bg-base-200
                                      dropdown-toggle"
                          >
                            <FaQrcode size={"1.5rem"} />
                          </div>
                        </div>
                      </ul>
                    </div>
                  </td>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </>
  );
};

export default UserHome;
