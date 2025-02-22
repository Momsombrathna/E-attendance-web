import React from "react";
import useSWR from "swr";
import { QueryRequest } from "../../api/apiService";
import apiPoints from "../../api/endpoints";
import ScaleLoader from "react-spinners/ScaleLoader";

const fetcher = (url) => QueryRequest(apiPoints.users.userDetail, "GET");

const UserHome = () => {
  const { data, error } = useSWR(apiPoints.users.userDetail, fetcher);

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

  console.log(data);
  return (
    <>
      <main
        className="
        overflow-y-auto bg
        overflow-hidden h-screen px-4 p-2
      "
      >
        {" "}
        <section className="flex mt-10 w-auto justify-center items-center"></section>
      </main>
    </>
  );
};

export default UserHome;
