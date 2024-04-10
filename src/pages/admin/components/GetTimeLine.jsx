import React, { useState, useEffect } from "react";
import { api_url, decodedToken } from "../../../api/config";
import ScaleLoader from "react-spinners/ScaleLoader";
import axios from "axios";

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
            {!attendances.attendance ? (
              <>
                <h2 className="text-md text-eee-700 fon-medium">
                  No attendance recorded
                </h2>
              </>
            ) : (
              attendances.attendance.map((data, index) => (
                <div key={index} className="flex flex-row gap-2">
                  <div>
                    <h2 className="text-md text-eee-700 fon-medium">
                      Date :{" "}
                      <span className="text-blue-500">{data.description}</span>
                    </h2>
                    <h2 className="text-md text-eee-700 fon-medium">
                      Time : <span className="text-blue-500">{data.time}</span>
                    </h2>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default GetTimeLine;
