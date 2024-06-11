import React, { useEffect, useState } from "react";
import { api_url, decodedToken, decodedUserID } from "../../api/config";
import ReactPaginate from "react-paginate";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
import { format, set } from "date-fns";
import Swal from "sweetalert2";
import axios from "axios";
import { LuLayoutDashboard } from "react-icons/lu";
import { Link } from "react-router-dom";
import { PiGraduationCap } from "react-icons/pi";
import CryptoJs from "crypto-js";
import ScaleLoader from "react-spinners/ScaleLoader";
import { HiDotsHorizontal } from "react-icons/hi";

const ManageClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [query, setQuery] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${api_url}/admin/all-classes`, {
        method: "GET",
        headers: {
          "auth-token": decodedToken,
        },
      });
      setClasses(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      fetchClasses();
      return;
    }
    setLoading(true);
    fetch(`${api_url}/admin/search-class/${query}`, {
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
        console.error(err);
        setLoading(false);
      });
  };

  const currentClasses = classes.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  function formatDate(dateString) {
    if (!dateString) {
      return "Invalid date";
    }

    const date = new Date(dateString);

    if (isNaN(date)) {
      return "Invalid date";
    }

    return format(date, "MMMM dd, yyyy");
  }

  const handleDeleteClass = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${api_url}/admin/delete-class/${id}`, {
            method: "DELETE",
            headers: {
              "auth-token": decodedToken,
            },
          });
          Swal.fire("Deleted!", "Class has been deleted.", "success");
          setClasses(classes.filter((cls) => cls._id !== id));
        } catch (err) {
          console.error(err);
        }
      }
    });
  };

  return (
    <>
      <main className=" px-3  mb-20">
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
                    <PiGraduationCap className="w-6 h-6 pr-2" />
                    classes
                  </li>
                </ul>
              </div>
              <div className="backdrop-blur-lg bg-white/10 rounded-lg p-2 md:p-4">
                <div className="flex md:flex-row flex-col items-center">
                  <h3 className="text-xl md:mb-0 mb-4 font-medium text-gray-400 ">
                    Classes Management
                  </h3>

                  <form
                    onSubmit={handleSearch}
                    class="flex items-center max-w-sm mx-auto"
                  >
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
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
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
                    previousLabel={<GrFormPrevious />}
                    nextLabel={<GrFormNext />}
                    breakLabel={".."}
                    breakClassName={"break-me"}
                    pageCount={Math.ceil(classes.length / itemsPerPage)}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={3}
                    onPageChange={({ selected }) => setCurrentPage(selected)}
                    containerClassName={
                      "pagination flex justify-center mt-4 mb-4"
                    }
                    pageClassName={"mx-1"}
                    pageLinkClassName={
                      "px-2 py-1 rounded bg-white text-black hover:bg-blue-500 hover:text-white transition-colors duration-200"
                    }
                    activeLinkClassName={"bg-blue-500 text-white"}
                    previousLinkClassName={
                      "px-2  flex justify-center py-1 rounded text-black hover:bg-blue-500 hover:text-white transition-colors duration-200"
                    }
                    nextLinkClassName={
                      "px-2 py-1  flex justify-center rounded  text-black hover:bg-blue-500 hover:text-white transition-colors duration-200"
                    }
                    disabledClassName={"opacity-50 cursor-not-allowed"}
                    activeClassName={"activePage"}
                  />
                </div>

                <div className="mt-2">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-3 text-left">Class Profile</th>
                        <th className="py-3 px-3 text-left">Class Name</th>
                        <th className="py-3 px-3 text-left">Owner</th>
                        <th className="py-3 px-3 text-center desktop-only">
                          Peoples
                        </th>
                        <th className="py-3 px-3 text-center desktop-only">
                          Create at
                        </th>
                        <th className="py-3 px-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-200 text-sm font-light">
                      {loading ? (
                        <tr>
                          <td colSpan="5" className="text-center py-4">
                            <div className="container mx-auto px-4 sm:px-8">
                              <div
                                style={{
                                  height: "615px",
                                }}
                                className="flex justify-center items-center"
                              >
                                <ScaleLoader
                                  color="#c4c4c4"
                                  loading={loading}
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                      ) : classes.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="text-center py-4">
                            No users found
                          </td>
                        </tr>
                      ) : (
                        currentClasses.map((data, index) => (
                          <tr
                            key={index}
                            className="border-b border-gray-500 hover:bg-gray-600"
                          >
                            <td className="py-1 px-3 text-left whitespace-nowrap">
                              <div className="flex items-center">
                                <img
                                  alt="user"
                                  className="h-14 w-14 rounded-full"
                                  src={data.classProfile}
                                />
                              </div>
                            </td>
                            <td className="py-1 px-3 text-left whitespace-nowrap">
                              <div className="flex items-center">
                                <span className="font-medium">
                                  {data.className}
                                </span>
                              </div>
                            </td>
                            <td className="py-1 px-3 text-left">
                              <div className="flex items-center font-medium">
                                <span>{data.ownerName}</span>
                              </div>
                            </td>
                            <td className="py-1 px-3 text-center desktop-only">
                              <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs font-medium">
                                {data.students.length}
                              </span>
                            </td>

                            <td className="py-1 px-3 text-center desktop-only">
                              <span className="text-xs font-medium">
                                {formatDate(data.created)}
                              </span>
                            </td>

                            <td className="py-1 px-3 text-center">
                              <div className="dropdown dropdown-end">
                                <div
                                  tabIndex={0}
                                  role="button"
                                  className=" bg-gray-600 rounded-full p-2"
                                >
                                  <HiDotsHorizontal size={"1rem"} />
                                </div>

                                <ul
                                  tabIndex={0}
                                  className="dropdown-content flex justify-center mt-2
                                   items-center z-[1] shadow border border-1 backdrop-blur-sm bg-white/30  rounded-box w-24 h-20"
                                >
                                  <div className="flex flex-col w-20 gap-2">
                                    <div>
                                      <button
                                        onClick={() =>
                                          handleDeleteClass(data._id)
                                        }
                                        className="bg-red-500 w-20 text-white py-1 px-3 rounded-md text-xs font-medium"
                                      >
                                        Delete
                                      </button>
                                    </div>
                                    <div>
                                      <Link
                                        to={`/class-detail/${encodeURIComponent(
                                          CryptoJs.AES.encrypt(
                                            JSON.stringify(data._id),
                                            "secret-key-123"
                                          ).toString()
                                        )}`}
                                      >
                                        <button className="bg-blue-500 w-20 text-white py-1 px-3 rounded-md text-xs font-medium">
                                          View
                                        </button>
                                      </Link>
                                    </div>
                                  </div>
                                </ul>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                      <br />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ManageClasses;
