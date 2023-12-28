import React from 'react'

const DetailLogin = () => {
  return (
    <>
      <div className="hero h-screen w-full bg-blue-900">
      <div className='flex flex-wrap ultraSm:justify-center'>
          <div className=" md:py-44 md:pl-30 ultraSm:py-14 ">
            <h1 className="mb-5 ultraSm::text-2xl md:text-5xl   font-bold decoration-double text-white">Hello there...</h1>
            <p className="md:text-5xl ultraSm::text-lg decoration-4 text-white">List your property on SevenSky.online</p>
          </div>

          {/* card  */}

          <div className='flex justify-end mx-4' >
          <div className="text-gray-700 bg-white shadow-md lg:w-96 w-72 mediumSm:w-96  rounded-xl bg-clip-border ">
              <div className="md:p-14 sm:p-5 ultraSm:p-8">
                <h5 className=" mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  Let's partner to unlock a world of opportunities and growth
                </h5>
                <br></br>

                <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                  ✓ Full control over the Property and finance
                </p>
                <br></br>
                <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                  ✓ Registration is free
                </p>
                <br></br>
                <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                  ✓ Anytime cancel the property
                </p>
              </div>
              <div className="flex justify-center ultraSm:mb-4">
                <a href="/partner/registration">
                  <button className="w-40 h-14 md:px-6 md:py-2 ultraSm:px-2 ultraSm:py-1   text-white font-semibold rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-md focus:outline-none transform hover:scale-105 transition-transform">Get Started </button>
                </a>

              </div>
            </div>
          </div>
          {/* card end */}
        </div>
      </div>

    </>
  )
}

export default DetailLogin