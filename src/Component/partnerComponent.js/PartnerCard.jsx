import React from 'react'

const PartnerCard = ({ imgsrc, children, ...props }) => {
    return (
        <div className='m-3'>
            
            <div
                {...props}
                className='relative max-w-xs overflow-hidden rounded-2xl shadow-lg group h-[300px] flex justify-center '>



                <img src={imgsrc} alt="No image"
                    className='transition-transform group-hover:scale-110 duration-200 object-fill w-full ' />
                    


                <div className='absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent'>
                    <div className='p-4 text-white'>{children}</div>
                    
                </div>
            </div>
        </div>

    )
}

export default PartnerCard
