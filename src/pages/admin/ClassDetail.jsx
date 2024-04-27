import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CryptoJS from "crypto-js";
import { api_url, decodedToken } from "../../api/config";
import { LuLayoutDashboard } from "react-icons/lu";
import { Link } from "react-router-dom";
import { PiGraduationCap } from "react-icons/pi";
import { IoBookOutline } from "react-icons/io5";
import { format } from "date-fns";
import ScaleLoader from "react-spinners/ScaleLoader";
import UserDetail from "./components/UserDetail";
import GetTimeLine from "./components/GetTimeLine";
import axios from "axios";

const ClassDetail = () => {
  const { classId } = useParams();
  const [classDetail, setClassDetail] = useState([]);
  const [timeLine, setTimeLine] = useState([]);
  const [loading, setLoading] = useState(true);

  const bytes = CryptoJS.AES.decrypt(
    decodeURIComponent(classId),
    "secret-key-123"
  );
  const decryptedClassId = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  useEffect(() => {
    const fetchClassDetail = async () => {
      try {
        const response = await axios.get(
          `${api_url}/admin/get-class/${decryptedClassId}`,
          {
            headers: {
              "auth-token": decodedToken,
            },
          }
        );
        setClassDetail(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchClassDetail();
  }, [decryptedClassId]);

  useEffect(() => {
    const fetchTImeLine = async () => {
      try {
        const res = await fetch(
          `${api_url}/admin/get-timeline/${decryptedClassId}`,
          {
            method: "GET",
            headers: {
              "auth-token": decodedToken,
            },
          }
        );

        const data = await res.json();
        setTimeLine(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchTImeLine();
  }, [decryptedClassId]);

  const ownerID = classDetail && classDetail.owner ? classDetail.owner : "";

  const numberOfStudents =
    classDetail && classDetail.students ? classDetail.students.length : 0;

  // time line count
  const numberOfAttendance =
    timeLine && timeLine.attendance ? timeLine.attendance.length : 0;

  // date format
  function formatDate(dateString) {
    if (!dateString) {
      return "Invalid date";
    }

    const date = new Date(dateString);

    if (isNaN(date)) {
      return "Invalid date";
    }

    return format(date, "dd/MM/yyyy HH:mm:ss");
  }

  if (loading) {
    return (
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
    );
  }

  return (
    <>
      <main className=" bg-white px-3  mb-20">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-2">
            <div className="my-2">
              <div className=" breadcrumbs">
                <ul>
                  <li className="text-lg">
                    <Link to="/" className="text-blue-500">
                      <LuLayoutDashboard className="w-6 h-6 pr-2" />
                      Dashboard
                    </Link>
                  </li>
                  <li className="text-lg">
                    <Link to="/manage-classes" className="text-blue-500">
                      <PiGraduationCap className="w-6 h-6 pr-2" />
                      classes
                    </Link>
                  </li>
                  <li className="text-lg">
                    <IoBookOutline className="w-6 h-6 pr-2" />
                    class detail
                  </li>
                </ul>
              </div>
              <div className="w-full drop-shadow-md rounded-lg">
                <div className="px-5 p-2">
                  <h2>Class</h2>
                  <div className="flex flex-row gap-2">
                    <div>
                      <img
                        className=" md:w-28 md:h-28 rounded-full w-16 h-16"
                        src={classDetail.classProfile}
                        alt="class-profile"
                      />
                    </div>
                    <div className="flex flex-col justify-center ">
                      <h2 className="text-md text-eee-700 fon-medium">
                        Class Name :{" "}
                        <span className="text-blue-500">
                          {classDetail.className}
                        </span>
                      </h2>
                      <h2 className="text-md text-eee-700 fon-medium">
                        Peoples :{" "}
                        <span className="text-blue-500">
                          {numberOfStudents}
                        </span>
                      </h2>
                      <h2 className="text-md text-eee-700 fon-medium">
                        Total attendances :{" "}
                        <span className="text-blue-500">
                          {numberOfAttendance}
                        </span>
                      </h2>
                      <h2 className="text-md text-eee-700 fon-medium">
                        Created at :{" "}
                        <span className="text-blue-500">
                          {formatDate(classDetail.created)}
                        </span>
                      </h2>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="px-5 p-2 flex flex-col gap-2">
                  <h2>Owner</h2>
                  <UserDetail userID={ownerID} />
                </div>
              </div>
              <hr />
              <div className="px-5 p-2 flex flex-col gap-2">
                <h2>Attendances</h2>
                <GetTimeLine classId={decryptedClassId} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ClassDetail;
