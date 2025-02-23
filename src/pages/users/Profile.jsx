import React, { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import { QueryRequest } from "../../api/apiService";
import apiPoints from "../../api/endpoints";
import ScaleLoader from "react-spinners/ScaleLoader";
import { FaPenToSquare } from "react-icons/fa6";
import { api_url, decodedToken } from "../../api/config";
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
      setProfileImage(data.profile);
    }
  }, [data]);

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

    const formData = new FormData();
    formData.append("username", profileName || data.username);

    let updatedBlob = null;
    if (profileImage && profileImage !== data.profile) {
      const response = await fetch(profileImage);
      updatedBlob = await response.blob();
      formData.append("profileImage", updatedBlob, "profileImage.jpg");
    }

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
        mutate(apiPoints.users.userDetail);
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

  const isUpdateDisabled =
    profileName === data.username && profileImage === data.profile;

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
                src={`${data.profile}?timestamp=${new Date().getTime()}`}
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
                className="flex btn text-base-800 items-center gap-2 bg-primary-500  px-5 py-2 rounded-lg hover:bg-primary-600 transition duration-300"
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
                  <h3 className="font-bold text-base-800 text-lg">
                    Update Profile
                  </h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleUpdateProfile();
                    }}
                    className="flex flex-col gap-5"
                  >
                    <div className="flex flex-col items-center gap-5">
                      <div className="flex flex-col items-center gap-5">
                        <img
                          src={profileImage ? profileImage : data.profile}
                          alt="profile"
                          className={` w-48 h-48 rounded-full ${
                            errorMsg ? "border-red-500" : ""
                          }`}
                        />
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="dropzone-file"
                            className="flex flex-col items-center justify-center bg-base-100 w-44 h-10 border-2 border-dashed rounded-lg cursor-pointer"
                          >
                            <div className="flex flex-col items-center justify-center">
                              <svg
                                className="w-8 h-8 text-base-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                              </svg>
                            </div>
                            <input
                              id="dropzone-file"
                              type="file"
                              accept="image/*"
                              onChange={pickImage}
                              className="hidden"
                            />
                          </label>
                        </div>
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
                      className=" text-base-800 px-2 py-1 rounded-lg  transition duration-300"
                      disabled={isUpdateDisabled}
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
    </main>
  );
};

export default Profile;
