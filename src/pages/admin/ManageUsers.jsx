import React, { useState, useEffect } from "react";
import { api_url, decodedToken, decodedUserID } from "../../api/config";
import ReactPaginate from "react-paginate";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoPeopleOutline } from "react-icons/io5";
import ScaleLoader from "react-spinners/ScaleLoader";

const ManageUsers = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

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

  const currentUsers = user.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleDelete = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${api_url}/admin/delete-user/${userId}`, {
          method: "DELETE",
          headers: {
            "auth-token": decodedToken,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            Swal.fire("Deleted!", data.message, "success");
            setUser(user.filter((user) => user._id !== userId));
          })
          .catch((err) => {
            console.log(err);
            Swal.fire("Error!", "An error occurred", "error");
          });
      }
    });
  };

  function formatDate(date) {
    return format(new Date(date), "dd/MM/yyyy");
  }

  return (
    <>
      <main className=" bg-white px-3 mb-20 ">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-2">
            <div className="my-2">
              <div className=" breadcrumbs">
                <ul>
                  <li className="text-lg">
                    <Link to="/dashboard" className="text-blue-500">
                      <LuLayoutDashboard className="w-6 h-6 pr-2" />
                      Dashboard
                    </Link>
                  </li>
                  <li className="text-lg">
                    <IoPeopleOutline className="w-6 h-6 pr-2" />
                    Users
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-lg border border-1 shadow-md p-2 md:p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-medium text-eee-700">
                    Users Management
                  </h3>
                  <form class="flex items-center max-w-sm mx-auto">
                    <label for="simple-search" class="sr-only">
                      Search
                    </label>
                    <div class="relative w-full">
                      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                          class="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 20"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="simple-search"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search..."
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <svg
                        class="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                      <span class="sr-only">Search</span>
                    </button>
                  </form>
                  <ReactPaginate
                    itemsPerPage={itemsPerPage}
                    totalItems={user.length}
                    currentPage={currentPage}
                    previousLabel={<GrFormPrevious />}
                    nextLabel={<GrFormNext />}
                    breakLabel={".."}
                    breakClassName={"break-me"}
                    pageCount={Math.ceil(user.length / itemsPerPage)}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={3}
                    onPageChange={({ selected }) => setCurrentPage(selected)}
                    containerClassName={
                      "pagination flex justify-center mt-4 mb-4"
                    }
                    pageClassName={"mx-1"}
                    pageLinkClassName={
                      "px-2 py-1 rounded bg-white text-black hover:bg-eee-300 hover:text-white transition-colors duration-200"
                    }
                    activeLinkClassName={"bg-blue-500 text-white"}
                    previousLinkClassName={
                      "px-1  flex justify-center py-1 rounded text-black hover:bg-eee-300 hover:text-white transition-colors duration-200"
                    }
                    nextLinkClassName={
                      "px-1 py-1  flex justify-center rounded  text-black hover:bg-eee-300 hover:text-white transition-colors duration-200"
                    }
                    disabledClassName={"opacity-50 cursor-not-allowed"}
                    activeClassName={"activePage"}
                  />
                </div>

                <div className="mt-2">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-3 text-left">User Profile</th>
                        <th className="py-3 px-3 text-left">User Name</th>
                        <th className="py-3 px-3 text-left">Email</th>
                        <th className="py-3 px-3 text-center">Role</th>
                        <th className="py-3 px-3 text-center">Status</th>
                        <th className="py-3 px-3 text-center">Created at</th>
                        <th className="py-3 px-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                      {loading ? (
                        <tr>
                          <td colspan="7" className="text-center py-4">
                            <div className="container mx-auto px-4 sm:px-8">
                              <div className="flex justify-center items-center h-96">
                                <ScaleLoader
                                  color="#c4c4c4"
                                  loading={loading}
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                      ) : user.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="text-center py-4">
                            No users found
                          </td>
                        </tr>
                      ) : (
                        currentUsers.map((user, index) => (
                          <tr
                            key={index}
                            className="border-b border-gray-200 hover:bg-gray-100"
                          >
                            <td className="py-1 px-3 text-left whitespace-nowrap">
                              <div className="flex items-center">
                                <img
                                  alt="user"
                                  className="h-14 w-14 rounded-full"
                                  src={user.profile}
                                />
                              </div>
                            </td>
                            <td className="py-1 px-3 text-left whitespace-nowrap">
                              <div className="flex items-center">
                                <span className="font-medium">
                                  {user.username}
                                </span>
                              </div>
                            </td>
                            <td className="py-1 px-3 text-left">
                              <div className="flex items-center font-medium">
                                <span>{user.email}</span>
                              </div>
                            </td>
                            <td className="py-1 px-3 text-center">
                              <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs font-medium">
                                {user.role}
                              </span>
                            </td>
                            <td className="py-1 px-3 text-center">
                              {user.verified === true ? (
                                <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs font-medium">
                                  Verified
                                </span>
                              ) : (
                                <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs font-medium">
                                  Not Verified
                                </span>
                              )}
                            </td>
                            <td className="py-1 px-3 text-center">
                              <span className=" py-1 px-3 rounded-full text-xs font-medium">
                                {formatDate(user.created)}
                              </span>
                            </td>
                            <td className="py-1 px-3 text-center">
                              <button
                                onClick={() => handleDelete(user._id)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                      <br />
                    </tbody>
                  </table>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ManageUsers;
