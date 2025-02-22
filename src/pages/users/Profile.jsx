import React, { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import { QueryRequest } from "../../api/apiService";
import apiPoints from "../../api/endpoints";
import ScaleLoader from "react-spinners/ScaleLoader";
import { FaPenToSquare } from "react-icons/fa6";
import { api_url, decodedToken, decodedUserID } from "../../api/config";
import axios from "axios";

const fetcher = (url) => QueryRequest(apiPoints.users.userDetail, "GET");

const Profile = () => {
  const { data, error } = useSWR(apiPoints.users.userDetail, fetcher);
  const [profileName, setProfileName] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setProfileName(data.username);
    }
  }, [data]);

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

  const pickImage = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    if (!file) {
      setLoading(false);
      return setErrorMsg("No file selected");
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Resize image to a maximum width of 400px
        const maxWidth = 400;
        const scaleFactor = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * scaleFactor;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            const resizedImageUrl = URL.createObjectURL(blob);
            setProfileImage(resizedImageUrl);
            setLoading(false);
          },
          "image/jpeg",
          0.5
        );
      };
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    setErrorMsg(null);

    if (!profileImage) {
      setLoading(false);
      return setErrorMsg("Please upload a profile image");
    }

    const formData = new FormData();
    formData.append("username", profileName);

    // Convert the image URL to a Blob
    const response = await fetch(profileImage);
    const blob = await response.blob();
    formData.append("profileImage", blob, "profileImage.jpg");

    try {
      const response = await axios.patch(
        `${api_url}${apiPoints.users.updateUser}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "auth-token": decodedToken,
          },
        }
      );

      if (response.status === 200) {
        setLoading(false);
        document.getElementById("my_modal_3").close();
        // Update the profile data without reloading the page
        mutate(
          apiPoints.users.userDetail,
          {
            ...data,
            username: profileName,
            profile: profileImage,
          },
          false
        );
      } else {
        setLoading(false);
        setErrorMsg(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setErrorMsg(error.response.data.message);
      } else if (error.request) {
        setErrorMsg("No response received from server.");
      } else {
        setErrorMsg("Error in setting up the request.");
      }
    }
  };

  return (
    <main className="overflow-y-auto bg overflow-hidden h-screen px-4 p-2">
      <section className="flex mt-6 w-full">
        <div className="w-full h-14 bg-base-300 flex items-center rounded-lg p-5">
          <div className="breadcrumbs text-sm">
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
        </div>
      </section>
      <div className="w-full h-full flex flex-col md:flex-row mt-5 gap-5">
        <div className="md:w-1/3 w-full">
          <div className="w-full h-96 bg-base-300 rounded-lg p-5 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <img
                src={data.profile}
                className="w-60 h-60 rounded-full"
                alt="user-profile"
              />
              <p className="text-2xl font-medium mt-5">{data.username}</p>
              <p className="text-lg text-gray-500">
                {data.verified ? (
                  <span className="text-green-500">Verified</span>
                ) : (
                  <span className="text-red-500">Not Verified</span>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="md:w-2/3 w-full">
          <div className="w-full h-96 bg-base-300 rounded-lg p-5 flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-medium">User details</h2>
              <button
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
                className="flex btn items-center gap-2 bg-primary-500 text-white px-5 py-2 rounded-lg hover:bg-primary-600 transition duration-300"
              >
                <FaPenToSquare />
                <span>Edit Profile</span>
              </button>
              <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <h3 className="font-bold text-lg">Update Profile</h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleUpdateProfile();
                    }}
                    className="flex flex-col gap-5"
                  >
                    <div className="flex flex-col items-center gap-5">
                      <label
                        htmlFor="profileImage"
                        className="text-lg font-medium"
                      >
                        Profile Image
                      </label>
                      <div className="flex flex-col items-center gap-5">
                        <img
                          src={profileImage ? profileImage : data.profile}
                          alt="profile"
                          className={`w-40 h-40 rounded-full ${
                            errorMsg ? "border-red-500" : ""
                          }`}
                        />

                        {/* <input
                          type="text"
                          id="username"
                          value={profileName ? profileName : data.username}
                          onChange={(e) => setProfileName(e.target.value)}
                          className={`bg-base-300 text-base-500 rounded-lg ${
                            errorMsg ? "border-red-500" : ""
                          }`}
                        /> */}
                        <input
                          type="file"
                          id="profileImage"
                          accept="image/*"
                          onChange={pickImage}
                          className="bg-base-300
                           text-base-500 rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col items-center relative">
                      {errorMsg && (
                        <p className="text-red-500 text-sm absolute">
                          {errorMsg}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="bg-primary-500 text-white px-5 py-2 rounded-lg hover:bg-primary-600 transition duration-300"
                    >
                      {loading ? "Loading..." : "Update Profile"}
                    </button>
                  </form>
                </div>
              </dialog>
            </div>
            <hr />
            <div className="flex flex-col gap-5 mt-2">
              <div className="flex flex-row gap-5">
                <div className="flex flex-col">
                  <p className="text-lg font-medium">Username :</p>
                  <p className="text-lg font-medium">Email :</p>
                  <p className="text-lg font-medium">Phone:</p>
                  <p className="text-lg font-medium">Role :</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-lg font-medium">{data.username}</p>
                  <p className="text-lg font-medium">{data.email}</p>
                  <p className="text-lg font-medium">
                    {data.phone ? data.phone : "N/A"}
                  </p>
                  <p className="text-lg font-medium">{data.role}</p>
                </div>
              </div>
              <div className="flex flex-row gap-5">
                <div className="flex flex-col">
                  <p className="text-sm font-medium">Address :</p>
                  <p className="text-sm font-medium">Country :</p>
                  <p className="text-sm font-medium">State :</p>
                  <p className="text-sm font-medium">City :</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-medium">
                    {data.address ? data.address : "N/A"}
                  </p>
                  <p className="text-sm font-medium">
                    {data.country ? data.country : "N/A"}
                  </p>
                  <p className="text-sm font-medium">
                    {data.state ? data.state : "N/A"}
                  </p>
                  <p className="text-sm font-medium">
                    {data.city ? data.city : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* model popup */}
      <div
        id="authentication-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Sign in to our platform
              </h3>
              <button
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-4 md:p-5">
              <form className="space-y-4" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                        required
                      />
                    </div>
                    <label
                      htmlFor="remember"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                  <a
                    href="#"
                    className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                  >
                    Lost Password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Login to your account
                </button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Not registered?{" "}
                  <a
                    href="#"
                    className="text-blue-700 hover:underline dark:text-blue-500"
                  >
                    Create account
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
