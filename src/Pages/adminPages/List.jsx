import React, { useState, useEffect, useRef } from 'react';
import { userList, userBlock } from '../../Api/adminApi';
import NavBar from '../../Component/adminComponet.js/NavBar';
import SideBar from "../../Component/adminComponet.js/SideBar";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";



const ShowList = () => {
  const inputRef = useRef(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 723);
  const [inputVisible, setInputVisible] = useState(false);


 
  const handleResize = () => {
    setIsSmallScreen(window.innerWidth <= 723)
  }
 
  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const [active, setActive] = useState(1);
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [activeModal, setactiveModal] = useState(null);

  const showInput = () => {
    setInputVisible((prev) => !prev);
  };


  useEffect(() => {
    userList()
      .then((res) => {
        setUsers(res?.data?.users);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const recordPerPage = 5;

  const handleSetActive = (index) => {
    setActive(index);
  };

  const next = () => {
    if (active < Math.ceil(users.length / recordPerPage)) {
      setActive(active + 1);
    }
  };

  const prev = () => {
    if (active > 1) {
      setActive(active - 1);
    }
  };

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "gray",
    onClick: () => handleSetActive(index),
  });

  const firstIndex = (active - 1) * recordPerPage;
  const lastIndex = firstIndex + recordPerPage;
  const records = users.slice(firstIndex, lastIndex);
  const number = Array.from({ length: Math.ceil(users.length / recordPerPage) }, (_, index) => index + 1)




  const blockUnblockUser = async (userId, status) => {
    try {
      const res = await userBlock(userId, status);
      if (res?.status === 200) {
        let updatedData = users.map((user) => {
          let userData = { ...user };
          if (userData._id === userId) {
            userData.isBlocked = !status;
          }
          return userData;
        });
        setUsers(updatedData);
        setactiveModal(null)
      }

    } catch (error) {
      console.log(error.message);
    }
  };
  const openModal = (userId) => {
    setactiveModal(userId)
  }
  const closeModal = () => {
    setactiveModal(null)
  }

  const filtered = !searchInput
    ? records
    : users.filter((person) =>
      person && person.name && person.name.toLowerCase().includes(searchInput.toLowerCase())
    );
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setInputVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [inputRef]);



  return (
    <>
      <NavBar />

      <div className="mx-auto flex">

        <SideBar />
        <div className="w-full">
          <div className="h-screen container mx-2 w-full">
            <div className="p-3 border-2 border-gray-200 border-dashed rounded-lg  mediumSm:w-full w-96 lg:w-full  dark:border-gray-700 ">
              <h1 className="text-3xl pt-2">Users List</h1>
              <div className="flex items-center justify-end py-4 ">
                <label htmlFor="table-search" className="sr-only">
                  Search
                </label>
                <button
                  className="text-sm py-1 px-2 bg-gray-400 text-white rounded-lg block lg:hidden"
                  onClick={showInput}
                >
                  Search
                </button>
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    id="table-search-users"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className={`block p-1 pl-4 lg:p-2 lg:pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-50 lg:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${inputVisible ? "block" : "hidden"
                      }`}
                    placeholder="Search for users"
                  />
                </div>

              </div>
             <div className='overflow-x-scroll'>
             <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-lg ">
                <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Mobile</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length > 0 ? (
                    filtered.map((user) => (
                      <tr
                        key={user._id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="px-6 py-4">
                          <div className="text-base font-semibold">{user.name}</div>
                          <div className="font-normal text-gray-500">{user.email}</div>
                        </td>
                        <td className="px-6 py-4">{user.phone}</td>
                        <td className="px-6 py-4">
                          {user.isEmailVerified ? (
                            <div className="flex items-center">
                              <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2" /> Verified
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <div className="h-2.5 w-2.5 rounded-full bg-red-700 mr-2" /> Not Verified
                            </div>
                          )}
                        </td>
                        <td className='px-6 py-4'>
                          {user.isBlocked ? (
                            <button
                              type="button"
                              onClick={() => openModal(user._id)}
                              className=" w-24 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                            >
                              Unblock
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => openModal(user._id)}
                              className="focus:outline-none w-24 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            >
                              Block
                            </button>
                          )
                          }
                          {/* modal start */}
                          <div
                            id={`popup-modal-${user._id}`}
                            tabIndex={-1}
                            className={`fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full ${activeModal === user._id ? "" : "hidden"
                              }`}
                          >
                            <div className="relative w-full max-w-md max-h-full">
                              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <button
                                  type="button"
                                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover-bg-gray-600 dark:hover-text-white"
                                  data-modal-hide={`popup-modal-${user._id}`}
                                  onClick={() => closeModal()}
                                >
                                  <svg
                                    tabIndex={0}
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
                                      strokeWidth={2}
                                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                  </svg>
                                  <span className="sr-only">Close modal</span>
                                </button>
                                <div className="p-6 text-center">
                                  <svg
                                    className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                  </svg>
                                  {user.isBlocked ? (
                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                      Are you sure you want to Unblock this{" "}
                                      {user.name}?
                                    </h3>
                                  ) : (
                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                      Are you sure you want to Block this{" "}
                                      {user.name}?
                                    </h3>
                                  )}
                                  <button
                                    data-modal-hide={`popup-modal-${user._id}`}
                                    type="button"
                                    onClick={() =>
                                      blockUnblockUser(user._id, user.isBlocked)
                                    }
                                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                                  >
                                    Yes, I'm sure
                                  </button>
                                  <button
                                    data-modal-hide={`popup-modal-${user._id}`}
                                    type="button"
                                    onClick={() => closeModal()}
                                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover-text-white dark:hover-bg-gray-600 dark:focus:ring-gray-600"
                                  >
                                    No, cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* modal end */}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-4 text-center text-gray-900 dark:text-white"
                      >
                        No users
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              </div>

            </div>
            {/* pagination start */}

            <div className="container flex justify-center mt-4">

              <div className="flex items-center gap-4">
                <Button
                  variant="text"
                  className="flex items-center gap-2"
                  onClick={prev}
                  disabled={active === 1}
                >
                  <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
                </Button>
                <div className="flex items-center gap-2">
                  {number.map(page => (
                    <IconButton key={page}

                      {...getItemProps(page)}>{page}</IconButton>
                  ))}
                </div>
                <Button
                  variant="text"
                  className="flex items-center gap-2"
                  onClick={next}
                  disabled={active === Math.ceil(users.length / recordPerPage)}
                >
                  Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* pagination end */}
          </div>
        </div>
      </div>
    </>
  );
}
export default ShowList;
