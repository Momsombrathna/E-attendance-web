import React, { useState, useEffect } from "react";
import AdminCard from "../../components/AdminCard";
import { api_url, decodedToken } from "../../api/config";

const Dashboard = () => {
  const [user, setUser] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${api_url}/admin/all-users`, {
      method: "GET",
      headers: {
        "auth-token": decodedToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch(`${api_url}/admin/all-classes`, {
      method: "GET",
      headers: {
        "auth-token": decodedToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setClasses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // console.log("user: ", user);
  // console.log("classes: ", classes);

  const userCount = user.length;
  const classesCount = classes.length;

  const classOwner = classes.map((cls) => cls.owner);

  // count the number of classes owned by the userID if duplicated set to 1
  const uniqueClassOwner = classOwner.filter(
    (item, index) => classOwner.indexOf(item) === index
  );
  const uniqueClassOwnerCount = uniqueClassOwner.length;

  const studentCount = userCount - uniqueClassOwnerCount;

  const verifiedUser = user.filter((usr) => usr.verified === true);
  const verifiedUserCount = verifiedUser.length;

  const unverifiedUser = user.filter((usr) => usr.verified === false);
  const unverifiedUserCount = unverifiedUser.length;

  return (
    <>
      <main className=" bg-purple-100 overflow-y-auto h-screen mb-10">
        <h1 className="text-2xl text-eee-700 font-medium p-5">DASHBOARD</h1>
        <hr />
        <section className="flex w-auto justify-center items-center">
          <AdminCard
            total_students={studentCount}
            total_teachers={uniqueClassOwnerCount}
            total_classes={classesCount}
            total_users={userCount}
            total_users_card={200}
            total_verified={verifiedUserCount}
            total_unverified={unverifiedUserCount}
          />
        </section>
      </main>
    </>
  );
};

export default Dashboard;
