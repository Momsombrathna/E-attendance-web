import React, { useState, useEffect } from "react";
import AdminCard from "../../components/AdminCard";
import ChartCard from "../../components/ChartCard";
import { api_url, decodedToken } from "../../api/config";
import ScaleLoader from "react-spinners/ScaleLoader";
import { BsGraphUp } from "react-icons/bs";
import { GrOverview } from "react-icons/gr";

const Dashboard = () => {
  const [user, setUser] = useState([]);
  const [classes, setClasses] = useState([]);
  const [cards, setCards] = useState([]);
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

  useEffect(() => {
    fetch(`${api_url}/admin/all-cards`, {
      method: "GET",
      headers: {
        "auth-token": decodedToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const userCounts = user.length;
  const classesCount = classes.length;
  const cardsCount = cards.length;

  const classOwner = classes.map((cls) => cls.owner);

  // count the number of classes owned by the userID if duplicated set to 1
  const uniqueClassOwner = classOwner.filter(
    (item, index) => classOwner.indexOf(item) === index
  );
  const uniqueClassOwnerCount = uniqueClassOwner.length;

  const studentCount = userCounts - uniqueClassOwnerCount;

  const verifiedUser = user.filter((usr) => usr.verified === true);
  const verifiedUserCount = verifiedUser.length;

  const unverifiedUser = user.filter((usr) => usr.verified === false);
  const unverifiedUserCount = unverifiedUser.length;

  // admin count
  const adminCount = user.filter((usr) => usr.role === "admin").length;

  // user count
  const userCount = user.filter((usr) => usr.role === "user").length;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ScaleLoader color="#c4c4c4" loading={loading} height={35} width={4} />
      </div>
    );
  }

  return (
    <>
      <main className=" bg-gradient-to-r from-gray-900 to-gray-800 mb-10">
        <h1 className="text-2xl text-gray-500 font-medium p-3 pl-7 md:pl-16">
          <br />
          DASHBOARD
        </h1>

        <section className="flex mt-5 w-auto flex-col justify-center items-center">
          <div className="px-5 flex justify-center mb-5 items-center gap-2 flex-row rounded-lg backdrop-blur-md bg-white/10">
            <GrOverview className="text-2xl text-gray-300 font-medium" />
            <p className="text-2xl text-gray-300 font-medium">Overviews</p>
          </div>
          <AdminCard
            total_students={studentCount}
            total_teachers={uniqueClassOwnerCount}
            total_classes={classesCount}
            total_all_users={userCounts}
            total_users_card={cardsCount}
            total_verified={verifiedUserCount}
            total_unverified={unverifiedUserCount}
            total_admin={adminCount}
            total_users={userCount}
          />
        </section>

        <section className="flex mt-20 w-auto flex-col justify-center items-center">
          <div className="px-5 flex justify-center items-center mb-5 gap-2 flex-row rounded-lg backdrop-blur-md bg-white/10">
            <BsGraphUp className="text-2xl text-gray-300 font-medium" />
            <p className="text-2xl text-gray-300 font-medium">Statistic</p>
          </div>
          <ChartCard
            total_students={studentCount}
            total_teachers={uniqueClassOwnerCount}
            total_classes={classesCount}
            total_users_card={cardsCount}
            total_verified={verifiedUserCount}
            total_unverified={unverifiedUserCount}
            total_users={userCount}
            total_admin={adminCount}
          />
        </section>
        <br />
      </main>
    </>
  );
};

export default Dashboard;
