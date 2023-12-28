import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { kycApprove } from "../../Api/adminApi";
import { toast } from "react-toastify";

const ApprovalCard = ({props}) => {
    const navigate=useNavigate()
    const handleApprove=async(id,status)=>{
        try{
            const res=await kycApprove(id,status)
            if(res.status===200){
                toast.info(res?.data?.message)
                navigate('/admin/partnerList')
            }
        }catch(error){
            console.log(error.message)
        }
    }
    return (
        <>
            <div className="bg-gray-400 h-screen">
                <div className="pt-8 pl-6">
                    <Link to='/admin/partnerList'>
                        <button type="button" className="flex items-center justify-center w-1/2  px-5 py-3 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
                            <svg className="w-5 h-3 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                            </svg>
                            <span>Go back</span>
                        </button>
                    </Link>
                </div>


                <div className="flex justify-center mt-2 ">

                    <div className="max-w-sm border  h-60 mt-20 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                        <img className="rounded-t-lg object-cover w-full h-full" src={props.kycimage} alt="" />

                        <div className="p-5 border rounded-b-lg bg-white">

                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                              {props.email}
                            </p>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                              {props.phone}
                            </p>
         {props.adminApproved==="approve" || props.adminApproved==="reject" ||!props.adminApproved&& (<div className="space-x-32 mt-6">

<button onClick={()=>handleApprove(props._id,"approve")} className="bg-black border-2 border-gray-700 rounded-lg text-white cursor-pointer font-semibold text-base md:text-sm py-2 px-6 transition duration-300 ease-in-out hover:shadow-md hover:-translate-y-2 focus:outline-none disabled:pointer-events-none disabled:bg-opacity-50" role="button">
    Accept
</button>

<Link>
<button onClick={()=>handleApprove(props._id,"reject")} className="bg-white border border-gray-200 rounded-md text-gray-900 font-semibold text-sm md:text-base py-2 px-5 box-border shadow-sm cursor-pointer select-none transition duration-200 ease-in-out hover:bg-red-800 focus:outline-none focus-visible:outline-none" role="button">
    Reject
</button>
</Link>

</div>)}
                            

                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
export default ApprovalCard