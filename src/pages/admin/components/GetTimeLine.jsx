import React, { useState, useEffect } from "react";
import { api_url, decodedToken } from "../../../api/config";
import ScaleLoader from "react-spinners/ScaleLoader";
import axios from "axios";
import { format } from "date-fns";
import Map from "./MapPicker";
import { FaMapMarkedAlt } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";

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
    return format(new Date(data), "dd/MM/yyyy HH:mm");
  };

  return (
    <>
      {loading ? (
        <div className="container mx-auto px-4 sm:px-8">
          <div className="flex justify-center items-center h-16">
            <ScaleLoader color="#c4c4c4" loading={loading} size={15} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <table className="min-w-full text-center divide-y divide-gray-200">
              <thead className="bg-eee-200">
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
                </tr>
              </thead>
              <tbody className="bg-white rounded-xl divide-y divide-gray-200">
                {attendances.attendance.map((data, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {data.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formateDate(data.from)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formateDate(data.to)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
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
                    <td className="px-6 py-4 whitespace-nowrap">
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-eee-100">
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <button
                          title="Click to open the map"
                          className="py-1 px-2 hover:bg-sky-800 bg-sky-500 rounded-md"
                          onClick={() =>
                            document.getElementById("my_modal_1").showModal()
                          }
                        >
                          <FaMapMarkedAlt size={"1.5rem"} />
                        </button>
                        <dialog id="my_modal_1" className="modal">
                          <div className="modal-box backdrop-blur-sm bg-white/30 p-3">
                            <div className="flex justify-between mb-2 items-center">
                              <h1 className="text-xl font-bold">
                                Class: {data.description}
                              </h1>
                              <button
                                title="Close the modal"
                                className="p-1 hover:bg-eee-300 rounded-full"
                                onClick={() =>
                                  document.getElementById("my_modal_1").close()
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
