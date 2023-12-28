import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ data }) => {
   
    return (
        <>

            <div className='m-6' >
                <div
                    className='relative max-w-xs overflow-hidden rounded-2xl shadow-lg group h-[390px] flex justify-center '>
                    <img
                        src={data.propertyImage[0]}
                        alt="No image"
                        className='transition-transform group-hover:scale-110 duration-200 object-fill'
                    />
                    <div className='absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent'>
                        <div>

                            <div className='px-4  text-white font-bold'>{data.propertyName}</div>
                           <div className='py-3 px-2 text-red-900 font-bold flex'>
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                            <span className='text-white'>{data.city},{data.location}</span>      
                           </div>
                        </div>
                        <div className="absolute bottom-4 right-4">
                            <Link to={`/propertyDetails/${data._id}`} className="text-white font-bold border border-3 p-3 rounded mt-4">
                                More
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Card;
