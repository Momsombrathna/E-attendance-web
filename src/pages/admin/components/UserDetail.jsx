import React, { useState, useEffect } from "react";
import { api_url, decodedToken } from "../../../api/config";
import ScaleLoader from "react-spinners/ScaleLoader";
import axios from "axios";

const UserDetail = ({ userID }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const response = await axios.get(
          `${api_url}/admin/get-user/${userID}`,
          {
            headers: {
              "auth-token": decodedToken,
            },
          }
        );
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchUserDetail();
  }, [userID]);

  return (
    <div className="w-full">
      {loading ? (
        <div className="container mx-auto px-4 sm:px-8">
          <div className="flex justify-center items-center h-16">
            <ScaleLoader color="#c4c4c4" loading={loading} size={15} />
          </div>
        </div>
      ) : (
        <div className="flex flex-row gap-2">
          <div>
            <img
              className=" md:w-28 md:h-28 rounded-full w-16 h-16"
              src={user.profile}
              alt="class-profile"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-md text-eee-700 fon-medium">
              Username : <span className="text-blue-500">{user.username}</span>
            </h2>
            <h2 className="text-md text-eee-700 fon-medium">
              Role : <span className="text-blue-500">{user.role}</span>
            </h2>
            <h2 className="text-md text-eee-700 fon-medium">
              Verified :{" "}
              {user.verified === true ? (
                <span className="text-green-500">Yes</span>
              ) : (
                <span className="text-red-500">No</span>
              )}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
