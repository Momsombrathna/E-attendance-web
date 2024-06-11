import React, { useState, useEffect } from "react";
import { api_url, decodedToken } from "../../../api/config";
import ScaleLoader from "react-spinners/ScaleLoader";
import axios from "axios";
import { format } from "date-fns";
import Map from "./MapPicker";
import { FaMapMarkedAlt } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { BiSolidShow } from "react-icons/bi";

const User = ({ id }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      fetch(`${api_url}/admin/get-user/${id}`, {
        method: "GET",
        headers: {
          "auth-token": decodedToken,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          setUser(data);
        });
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full">
        {loading ? (
          <div className="container mx-auto py-2 px-2 sm:px-4">
            <div className="flex justify-center items-center h-8">
              <ScaleLoader color="#c4c4c4" loading={loading} size={10} />
            </div>
          </div>
        ) : (
          <div className="flex p-2 flex-row gap-1">
            <div>
              <img
                className=" rounded-full w-14 h-14"
                src={user.profile}
                alt="class-profile"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-md text-eee-700 fon-medium">
                <span className="text-eee-700">{user.username}</span>
              </h2>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const GetTimeLine = ({ classId }) => {
  const [attendances, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimeLine = async () => {
      try {
        const res = await axios.get(
          `${api_url}/admin/get-timeline/${classId}`,
          {
            headers: {
              "auth-token": decodedToken,
            },
          }
        );
        setAttendance(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchTimeLine();
  }, [classId]);

  const formateDate = (data) => {
    if (data && !isNaN(new Date(data))) {
      return format(new Date(data), "dd/MM/yyyy HH:mm");
    } else {
      console.error(`Invalid date: ${data}`);
      return data;
    }
  };

  const formateTime = (data) => {
    if (data && !isNaN(new Date(data))) {
      return format(new Date(data), "HH:mm:ss");
    } else {
      console.error(`Invalid date: ${data}`);
      return data;
    }
  };

  return (
    <>
      {loading ? (
        <div className="container mx-auto px-4 sm:px-8">
          <div
            style={{
              height: "615px",
            }}
            className="flex justify-center items-center"
          >
            <ScaleLoader color="#c4c4c4" loading={loading} size={15} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex  flex-col gap-2">
            <table className="min-w-full text-center divide-y divide-gray-500">
              <thead className="bg-gray-200 border border-1  w-full">
                <tr>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-800 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-800 uppercase tracking-wider">
                    From
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-800 uppercase tracking-wider">
                    To
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-800 uppercase tracking-wider">
                    Checked In
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-800 uppercase tracking-wider">
                    Check Out
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-800 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-800 uppercase tracking-wider">
                    See more
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-400 rounded-xl divide-y divide-gray-500">
                {attendances.attendance.map((data, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 border whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {data.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 border whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formateDate(data.from)}
                      </div>
                    </td>
                    <td className="px-6 py-4 border whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formateDate(data.to)}
                      </div>
                    </td>
                    <td className="px-6 py-4 border text-center whitespace-nowrap">
                      <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs font-medium">
                        {data.attendances.filter(
                          (att) => att.checkedIn === true
                        ).length > 0
                          ? data.attendances.filter(
                              (att) => att.checkedIn === true
                            ).length
                          : "0"}
                      </span>
                    </td>
                    <td className="px-6 py-4 border whitespace-nowrap">
                      <span className="bg-sky-200 text-sky-600 py-1 px-3 rounded-full text-xs font-medium">
                        {data.attendances.filter(
                          (att) => att.checkedOut === true
                        ).length > 0
                          ? data.attendances.filter(
                              (att) => att.checkedOut === true
                            ).length
                          : "0"}
                      </span>
                    </td>
                    <td className="px-6 py-4 border whitespace-nowrap">
                      <div className="text-sm text-eee-100">
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <button
                          title="Click to open the map"
                          className="py-1 px-2 hover:bg-sky-800 bg-sky-500 rounded-md"
                          onClick={() =>
                            document
                              .getElementById(`my_modal_${index}`)
                              .showModal()
                          }
                        >
                          <FaMapMarkedAlt size={"1.5rem"} />
                        </button>
                        <dialog id={`my_modal_${index}`} className="modal">
                          <div className="modal-box backdrop-blur-sm bg-white/30 p-3">
                            <div className="flex justify-between mb-2 items-center">
                              <h1 className="text-xl font-bold">
                                Class: {data.description}
                              </h1>
                              <button
                                title="Close the modal"
                                className="p-1 hover:bg-eee-300 rounded-full"
                                onClick={() =>
                                  document
                                    .getElementById(`my_modal_${index}`)
                                    .close()
                                }
                              >
                                <IoCloseOutline size={"1.5rem"} />
                              </button>
                            </div>

                            <Map
                              lat={data.latitude}
                              lon={data.longitude}
                              zoom={15}
                            />
                          </div>
                        </dialog>
                      </div>
                    </td>
                    <td
                      key={index}
                      className="px-6 py-4 border whitespace-nowrap"
                    >
                      <button
                        className="py-1 px-2 hover:bg-indigo-800 bg-indigo-500 rounded-md"
                        onClick={() =>
                          document
                            .getElementById(`student_modal_${data._id}`)
                            .showModal()
                        }
                      >
                        <BiSolidShow size={"1.5rem"} className="text-white" />
                      </button>
                      <dialog
                        id={`student_modal_${data._id}`}
                        className="modal"
                      >
                        <div className="modal-box rounded-lg bg-white p-3">
                          <form method="dialog">
                            <button className="btn btn-sm text-eee-700 btn-circle btn-ghost absolute right-2 top-2">
                              ✕
                            </button>
                          </form>
                          <h3 className="font-bold mb-3 text-eee-700 text-lg">
                            Students Attendance
                          </h3>
                          <table className="min-w-full text-center divide-y divide-gray-200">
                            <thead
                              className="border border-1"
                              style={{
                                backgroundColor: "#f3f4f6",
                                color: "#374151",
                                fontWeight: "bold",
                              }}
                            >
                              <tr>
                                <th className="text-left pl-3 text-xs font-medium text-gray-800  tracking-wider">
                                  Student
                                </th>
                                <th className="text-center text-xs font-medium text-gray-800  tracking-wider">
                                  Checked In
                                </th>
                                <th className="text-center text-xs font-medium text-gray-800  tracking-wider">
                                  Checked Out
                                </th>
                                <th className="text-center text-xs font-medium text-gray-800  tracking-wider">
                                  Status
                                </th>
                              </tr>
                            </thead>
                            <tbody className="border border-1">
                              {data.attendances.map((att, index) => (
                                <tr
                                  className="border-b border-gray-200 hover:bg-eee-100"
                                  key={index}
                                >
                                  <td>
                                    <div>
                                      <User
                                        id={att.studentId}
                                        key={att.studentId}
                                      />
                                    </div>
                                  </td>
                                  <td>
                                    {att.checkedIn === true ? (
                                      <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs font-medium">
                                        {formateTime(att.checkedInTime)}
                                      </span>
                                    ) : (
                                      <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs font-medium">
                                        No
                                      </span>
                                    )}
                                  </td>
                                  <td>
                                    {att.checkedOut === true ? (
                                      <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs font-medium">
                                        {formateTime(att.checkedOutTime)}
                                      </span>
                                    ) : (
                                      <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs font-medium">
                                        No
                                      </span>
                                    )}
                                  </td>
                                  <td>
                                    {att.checkedIn === true &&
                                    att.checkedOut === true ? (
                                      <span className="bg-cyan-200 text-cyan-600 py-1 px-3 rounded-full text-xs font-medium">
                                        Present
                                      </span>
                                    ) : (
                                      <span className="bg-eee-200 text-eee-600 py-1 px-3 rounded-full text-xs font-medium">
                                        Absent
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default GetTimeLine;
