import React, { useState, useEffect, useCallback } from "react";
import { api_url, decodedToken } from "../../../api/config";
import ScaleLoader from "react-spinners/ScaleLoader";
import axios from "axios";
import { apiGetService } from "../../../api/apiService";
import apiPoints from "../../../api/endpoints";

import { IoCloseOutline } from "react-icons/io5";
import { BiSolidShow } from "react-icons/bi";
import { formateDate, formateTime } from "../../../components/DateFormat";

const GetTimeLine = ({ userId, token }) => {
  const [User, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimeLine = async () => {
      try {
        const response = await apiGetService(
          apiPoints.users.getUser(userId),
          "GET",
          token
        );
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchTimeLine();
  }, [userId, token]);

  console.log(User);

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
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">User TimeLine</h2>
            <button className="text-red-600">
              <IoCloseOutline />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">User Details</h2>
              <button className="text-blue-600">
                <BiSolidShow />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <p className="font-semibold">Full Name:</p>
                <p className="font-semibold">
                  {User.firstName} {User.lastName}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-semibold">Email:</p>
                <p className="font-semibold">{User.email}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-semibold">Phone:</p>
                <p className="font-semibold">{User.phone}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-semibold">Role:</p>
                <p className="font-semibold">{User.role}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GetTimeLine;
