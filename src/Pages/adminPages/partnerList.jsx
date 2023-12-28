import React, { useState, useEffect, useRef } from 'react';
import { partnerList, partnerBlock } from '../../Api/adminApi';
import { toast } from 'react-toastify';
import NavBar from '../../Component/adminComponet.js/NavBar';
import SideBar from '../../Component/adminComponet.js/SideBar';
import { Button, IconButton } from '@material-tailwind/react';
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link } from 'react-router-dom';
const PartnerLists = () => {
  const [partners, setPartner] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [activeModal, setactiveModal] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

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
  const showInput = () => {
    setInputVisible((prev) => !prev);
  };


  useEffect(() => {
    partnerList()
      .then((res) => {
        setPartner(res?.data?.partners);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  
  const openModal = (partnerId) => {
    setactiveModal(partnerId)
  }
  const closeModal = () => {
    setactiveModal(null)
  }

  const blockUnblockPartner = async (partnerId, status) => {
    try {
      const res = await partnerBlock(partnerId, status);
      if (res.status === 200) {
        const updatedData = partners.map((partner) => {
          let partnerData = { ...partner };
          if (partnerData._id === partnerId) {
            partnerData.isBlocked = !status;
          }
          return partnerData;
        });
        setPartner(updatedData);
        setactiveModal(null)
      }
    } catch (error) {
      console.log(error.message);
    }
  };
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


  // pagination logics

  const recordPerPage = 5
  const firstIndex = (currentPage - 1) * recordPerPage
  const lastIndex = firstIndex + recordPerPage
  const records = partners.slice(firstIndex, lastIndex)

  const number = Array.from({ length: Math.ceil(partners.length / recordPerPage) }, (_, index) => index + 1)

  const handleSetActive = (index) => {
    setCurrentPage(index)
  }

  const prev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const next = () => {
    if (currentPage < Math.ceil(partners.length / recordPerPage)) {
      setCurrentPage(currentPage + 1)
    }
  }
  const getItemProps = (index) => ({
    variant: currentPage === index ? "filled" : "text",
    color: "gray",
    onClick: () => handleSetActive(index),
  });

  const filtered = searchInput
    ? partners.filter((partner) =>
      partner.name.toLowerCase().includes(searchInput.toLowerCase())
    )
    : records;

  return (
    <>
      <NavBar />
      <div className="mx-auto flex">
        <SideBar />
        <div className="w-full">
          <div className="h-screen container mx-2 w-full ">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg mediumSm:w-full w-96 lg:w-full  dark:border-gray-700">
              <h1 className="text-3xl pt-2">Partner List</h1>
              <div className="flex items-center justify-end py-4 ">
                <label htmlFor="table-search" className="sr-only">
                  Search
                </label>
                <button
                  className={`text-sm py-1 px-2 bg-gray-400 text-white rounded-lg ${isSmallScreen ? (inputVisible ? 'hidden' : 'block') : 'hidden'} lg:hidden`}
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
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden">
                <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Mobile</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Admin Approved</th>
                    <th className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length > 0 ? (
                    filtered.map((partner) => (
                      <tr
                        key={partner._id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="px-6 py-4">
                          <div className="text-base font-semibold">{partner.name}</div>
                          <div className="font-normal text-gray-500">{partner.email}</div>
                        </td>
                        <td className="px-6 py-4">{partner.phone}</td>
                        <td className="px-6 py-4">
                          {partner.isVerified ? (
                            <div className="flex items-center">
                              <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2" /> Verified
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <div className="h-2.5 w-2.5 rounded-full bg-red-700 mr-2" /> Not Verified
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className='flex space-x-2'>
                            {partner.adminApproved === "approve" ? (
                              <div className="flex items-center">
                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 mx-3" /> Approved
                              </div>
                            ) : (
                              <div className="flex items-center">
                                <div className="h-2.5 w-2.5 rounded-full bg-red-700 " /> Not Approved

                              </div>

                            )}

                            < Link to={`/admin/kycApproval/${partner._id}`} >
                              <button className="relative z-10 block bg-gray-800 rounded p-2 hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                                <svg className="h-2 w- text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                </svg>
                              </button>
                            </Link>



                          </div>

                        </td>
                        <td className='px-6 py-4'>
                          {partner.isBlocked ? (
                            <button
                              type='button'
                              onClick={() => openModal(partner._id)}
                              className=" w-24 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                            >
                              Unblock
                            </button>
                          ) : (
                            <button
                              type='button'
                              onClick={() => openModal(partner._id)}
                              className="focus:outline-none w-24 text-white bg-red-700 hover-bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            >
                              Block
                            </button>
                          )
                          }
                          {/* MODAL START */}
                          <div
                            id={`popup-modal-${partner._id}`}
                            tabIndex={-1}
                            className={`fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full ${activeModal === partner._id ? "" : "hidden"
                              }`}
                          >
                            <div className="relative w-full max-w-md max-h-full">
                              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <button
                                  type="button"
                                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover-bg-gray-600 dark:hover-text-white"
                                  data-modal-hide={`popup-modal-${partner._id}`}
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
                                  {partner.isBlocked ? (
                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                      Are you sure you want to Unblock this{" "}
                                      {partner.name}?
                                    </h3>
                                  ) : (
                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                      Are you sure you want to Block this{" "}
                                      {partner.name}?
                                    </h3>
                                  )}
                                  <button
                                    data-modal-hide={`popup-modal-${partner._id}`}
                                    type="button"
                                    onClick={() =>
                                      blockUnblockPartner(partner._id, partner.isBlocked)
                                    }
                                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                                  >
                                    Yes, I'm sure
                                  </button>
                                  <button
                                    data-modal-hide={`popup-modal-${partner._id}`}
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
                          {/* MODAL END */}

                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-gray-900 dark:text-white">
                        No Partners available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              </div>


              {/* pagination start */}

              <div className="container flex justify-center mt-4">
                <div className='flex gap-2'>
                  <Button
                    variant='text'
                    className='flex gap-2'
                    disabled={currentPage === 1}
                    onClick={prev}

                  >
                    <ArrowLeftIcon strokeWidth={2} className='h-4 w-4' />Previous
                  </Button>

                  <div className="flex gap-2">
                    {number.map(page => (
                      <IconButton key={page}

                        {...getItemProps(page)}>{page}</IconButton>
                    ))}
                  </div>
                  <Button
                    variant='text'
                    className='flex item-center gap-2'
                    onClick={next}
                    disabled={currentPage === Math.ceil(partners.length / recordPerPage)}
                  >
                    Next <ArrowRightIcon strokeWidth={2} className='h-4 w-4' />
                  </Button>


                </div>
              </div>
              {/* pagination end */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PartnerLists;
