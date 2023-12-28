import React, { useState, useEffect,useRef } from 'react'
import NavBar from '../../Component/adminComponet.js/NavBar'
import { propertylist } from '../../Api/adminApi'
import Loading from '../../Component/Loading/Loading';
import { toast } from 'react-toastify';
import SideBar from '../../Component/adminComponet.js/SideBar';
import { Button, IconButton } from '@material-tailwind/react';
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link } from 'react-router-dom';

const PropertyList = () => {
    const [property, setProperty] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchInput, setSearchInput] = useState('');
    const [activeModal, setactiveModal] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)


    // mobile screen 
    const inputRef = useRef(null);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 723);
    const [inputVisible, setInputVisible] = useState(false);

    const showInput = () => {
        setInputVisible((prev) => !prev);
      };
    const handleResize = () => {
        setIsSmallScreen(window.innerWidth <= 723)
    }
    useEffect(() => {
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])
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


    useEffect(() => {
        propertylist()
            .then((res) => {


                setProperty(res?.data?.property)
                console.log(res?.data?.property)

            }).catch((error) => {
                console.log(error.message)
            }).finally(() => {
                setLoading(false)
            })
    }, [])
    console.log(property)


    // pagination logics

    const recordPerPage = 5
    const firstIndex = (currentPage - 1) * recordPerPage
    const lastIndex = firstIndex + recordPerPage
    const records = property.slice(firstIndex, lastIndex)
    const number = Array.from({ length: Math.ceil(property.length / recordPerPage) }, (_, index) => index + 1)

    const handleSetActive = (index) => {
        setCurrentPage(index)

    }

    const prev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const next = () => {
        if (currentPage < Math.ceil(property.length / recordPerPage)) {
            setCurrentPage(currentPage + 1)
        }
    }

    const getItemProps = (index) => ({
        variant: currentPage === index ? "filled" : "text",
        color: "gray",
        onClick: () => handleSetActive(index),
    });



    const filtered = searchInput
        ? property.filter((data) =>
            data.name.toLowerCase().includes(searchInput.toLowerCase())
        )
        : records;

    return (

        <>
            <NavBar />
            {loading ? (<Loading />) : (
                <div className="mx-auto flex">
                    <SideBar />
                    <div className="w-full ">
                        <div className="h-screen container mx-2 w-full">
                            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg mediumSm:w-full w-96 lg:w-full dark:border-gray-700">
                                <h1 className="text-3xl pt-2">PropertyList</h1>
                                <div className="flex items-center justify-end py-4 bg-white dark:bg-gray-800">
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
                                            <th className="px-6 py-3">OwnerName</th>
                                            <th className="px-6 py-3">PropertyFor</th>
                                            <th className="px-6 py-3">PropertyType</th>
                                            <th className="px-6 py-3">PropertyName</th>
                                            <th className="px-6 py-3">State</th>
                                            <th className="px-6 py-3">Location</th>
                                            <th className="px-6 py-3">VerificationStatus</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filtered.length > 0 ? (
                                            filtered.map((data) => (
                                                <tr
                                                    key={data._id}
                                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                                >
                                                    <td className="px-6 py-4">
                                                        <div className="text-base font-semibold">{data.partnerId.name}</div>
                                                        <div className="font-normal text-gray-500">{data.partnerId.email}</div>
                                                    </td>
                                                    <td className="px-6 py-4">{data.propertyFor}</td>

                                                    {/* {partner.isVerified ? (
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2" /> Verified
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-700 mr-2" /> Not Verified
                </div>
              )} */}


                                                    <td className="px-6 py-4">
                                                        {data.propertyType}
                                                    </td>
                                                    <td className='px-6 py-4'>
                                                        {data.propertyName}
                                                    </td>
                                                    <td className='px-6 py-4'>
                                                        {data.state}
                                                    </td>
                                                    <td className='px-6 py-4'>
                                                        {data.location}
                                                    </td>
                                                    <td className='px-6 py-4'>

                                                        <div className='flex space-x-2'>
                                                            {data.verificationStatus === "approve" ? (
                                                                <div className="flex items-center">
                                                                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2" /> Approved
                                                                </div>
                                                            ) : (
                                                                <div className="flex items-center">
                                                                    <div className="h-2.5 w-2.5 rounded-full bg-red-700 mr-2" /> Not Approved

                                                                </div>

                                                            )}
                                                            {data.verificationStatus === "null" ? (
                                                                < Link to={`/admin/propertyApproval/${data._id}`} >
                                                                    <button className="relative z-10 block bg-gray-800 rounded p-2 hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                                                                        <svg className="h-2 w- text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                                                        </svg>
                                                                    </button>
                                                                </Link>
                                                            ) : (<></>)}


                                                        </div>


                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-4 text-center text-gray-900 dark:text-white">
                                                    No Property available
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
                                            disabled={currentPage === Math.ceil(property.length / recordPerPage)}
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

            )}

        </>
    )
}

export default PropertyList
