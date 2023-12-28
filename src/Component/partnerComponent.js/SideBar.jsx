import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


const SideBar = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className='flex m-5 items-center'>
                <div className='flex flex-col border border-4 w-full min-h-[500px] space-y-5  mt-3 rounded-l'>

                    <button onClick={() => navigate("/partner/addProperty")} className="bg-gray-100 border border-gray-100 rounded px-12 h-16 text-gray-700 font-normal text-md leading-7 min-w-14 focus:border-blue-500 focus:outline-none hover:border-gray-400 hover:shadow-md hover:text-gray-800" role="button">Dashboard</button>

                    <button className="bg-gray-100 border border-gray-100 rounded px-12 h-16 text-gray-700 font-normal textmd leading-7 min-w-14 focus:border-blue-500 focus:outline-none hover:border-gray-400 hover:shadow-md hover:text-gray-800" role="button">Add property</button>

                    <button className="bg-gray-100 border border-gray-100 rounded px-12 h-16 text-gray-700 font-normal text-md leading-7 min-w-14 focus:border-blue-500 focus:outline-none hover:border-gray-400 hover:shadow-md hover:text-gray-800" role="button"> My Property</button>
                    <button className="bg-gray-100 border border-gray-100 rounded px-12 h-16 text-gray-700 font-normal text-md leading-7 min-w-14 focus:border-blue-500 focus:outline-none hover:border-gray-400 hover:shadow-md hover:text-gray-800" role="button">Button 16</button>
                    <button className="bg-gray-100 border border-gray-100 rounded px-12 h-16 text-gray-700 font-normal text-md leading-7 min-w-14 focus:border-blue-500 focus:outline-none hover:border-gray-400 hover:shadow-md hover:text-gray-800" role="button">Button 16</button>
                    <div className='mt-5 flex justify-center'>
                        <button
                            type="submit"
                            className="bn54 relative outline-none text-decoration-none rounded-full flex justify-center items-center cursor-pointer uppercase h-12 w-40 opacity-100 bg-white border border-black border-opacity-60 transition duration-400 ease-in-out transform hover:rotate-6 hover:translate-x-2"
                        >
                            <span className="bn54span font-sans text-blue-400 text-sm font-medium tracking-wide">
                                Logout
                            </span>
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default SideBar
