import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { VscAccount } from "react-icons/vsc";
import { CiLocationOn } from "react-icons/ci";
import { BiRupee } from "react-icons/bi";


const MainCard = ({ property }) => {

  
const navigate=useNavigate()
  return (
    <>
      <div className='my-6'>


        <div className="max-w-sm bg-white border rounded-b-lg border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 my-4 mx-4 relative overflow-hidden w-60 h-96">

          <img className='w-full h-52 object-cover' src={property.propertyImage[1]} alt="" />
          <div className='h-32'>

            <div className="p-2 ">
              <div className='flex justify-between'>
              <h5 className=" text-lg font-bold tracking-tight text-gray-900 dark:text-white font-serif">{property.propertyName}</h5>
              <h5 className=" flex line-clamp-2  text-gray-700 dark:text-gray-400 font-extrabold"><span><BiRupee /></span>{property.Price}</h5>
              </div>
              <p className="line-clamp-2 mb-2 font-normal text-gray-700 dark:text-gray-400">{property.propertyType}</p>
              <h5 className=" flex line-clamp-2  truncate ... font-normal text-gray-700 dark:text-gray-400"><span><CiLocationOn /></span>{property.location}</h5>

            </div>
            <div className='flex justify-end'>

                <button type="button" className="py-1 px-3 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"onClick={()=>navigate('/propertyDetails',{state:{propertyId:property._id,role:"user"}})}>More</button>
            </div>

              <Link to={`/AgentDetails/${property.partnerId._id}`}>
            <div className='flex items-center border-t-2 mx-2'>
              <VscAccount />
                <div className='mx-4'>
                  {property.partnerId.name}
                </div>
            </div>
              </Link>
          </div>


        </div>
      </div>
    </>
  );
};

export default MainCard;
