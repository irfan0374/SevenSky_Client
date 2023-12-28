import React from 'react';
import { useNavigate } from 'react-router-dom';

const BudgetCard = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className='container mx-auto flex justify-center'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2'>
          <div className="da relative">
            <div className="absolute inset-0 bg-center dark:bg-black" />
            <div className="group relative m-0 lg:h-48 lg:w-48 md:h-80 md:w-80 sm:h-96 sm:w-96 w-72 rounded-xl shadow-xl ring-gray-900/5 sm:mx-5 sm:w-sm" onClick={() => navigate('/CardDetails', { state: { data: 100000, value: "budget" } })}>
              <div className="z-10 lg:h-48 lg:w-48 md:h-80 md:w-80 sm:h-96 sm:w-96 overflow-hidden rounded-xl border border-gray-200 opacity-80 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70">
                <img
                  src='/public/buildings/room5.jpg'
                  className="animate-fade-in block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110"
                  alt=""
                />
              </div>
              <div className="absolute bottom-0 z-20 m-0 pb-4 ps-2 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
                <h1 className="font-serif text-2xl font-bold text-white shadow-xl">
                Within 1 lakhs
                </h1>
              </div>
            </div>
          </div>
          <div className="da relative">
            <div className="absolute inset-0 bg-center dark:bg-black" />
            <div className="group relative m-0 lg:h-48 lg:w-48 md:h-80 md:w-80 sm:h-96 sm:w-96 w-72 rounded-xl shadow-xl ring-gray-900/5 sm:mx-5 sm:w-sm" onClick={() => navigate('/CardDetails', { state: { data: 300000, value: "budget" } })}>
              <div className="z-10 lg:h-48 lg:w-48 md:h-80 md:w-80 sm:h-96 sm:w-96 overflow-hidden rounded-xl border border-gray-200 opacity-80 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70">
                <img
                  src='/public/buildings/bedroom2.jpg'
                  className="animate-fade-in block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110"
                  alt=""
                />
              </div>
              <div className="absolute bottom-0 z-20 m-0 pb-4 ps-2 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
                <h1 className="font-serif text-2xl font-bold text-white shadow-xl">
                Within 3 lakhs
                </h1>
              </div>
            </div>
          </div>
          <div className="da relative">
            <div className="absolute inset-0 bg-center dark:bg-black" />
            <div className="group relative m-0 lg:h-48 lg:w-48 md:h-80 md:w-80 sm:h-96 sm:w-96 w-72 rounded-xl shadow-xl ring-gray-900/5 sm:mx-5 sm:w-sm" onClick={() => navigate('/CardDetails', { state: { data: 1500000, value: "budget" } })}>
              <div className="z-10 lg:h-48 lg:w-48 md:h-80 md:w-80 sm:h-96 sm:w-96 overflow-hidden rounded-xl border border-gray-200 opacity-80 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70">
                <img
                  src='/public/buildings/room3.jpg'
                  className="animate-fade-in block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110"
                  alt=""
                />
              </div>
              <div className="absolute bottom-0 z-20 m-0 pb-4 ps-2 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
                <h1 className="font-serif text-2xl font-bold text-white shadow-xl">
                Within 15lakhs
                </h1>
              </div>
            </div>
          </div>
          <div className="da relative">
            <div className="absolute inset-0 bg-center dark:bg-black" />
            <div className="group relative m-0 lg:h-48 lg:w-48 md:h-80 md:w-80 sm:h-96 sm:w-96 w-72 rounded-xl shadow-xl ring-gray-900/5 sm:mx-5 sm:w-sm" onClick={() => navigate('/CardDetails', { state: { data: 5000000, value: "budget" } })}>
              <div className="z-10 lg:h-48 lg:w-48 md:h-80 md:w-80 sm:h-96 sm:w-96 overflow-hidden rounded-xl border border-gray-200 opacity-80 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70">
                <img
                  src='/public/buildings/room2.jpg'
                  className="animate-fade-in block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110"
                  alt=""
                />
              </div>
              <div className="absolute bottom-0 z-20 m-0 pb-4 ps-2 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
                <h1 className="font-serif text-2xl font-bold text-white shadow-xl">
               above 50 lakhs
                </h1>
              </div>
            </div>
          </div>

         

        </div>
      </div>
    </>
  );
};

export default BudgetCard;
