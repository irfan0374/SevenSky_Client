import React from 'react'
import Navbar from '../../Component/userComponent.js/Navbar2'
import About from '../../Component/userComponent.js/about'
import Footer from '../../Component/CommonComponent/Footer'

const AboutPage = () => {
    return (
        <>
            <div >
                <Navbar />

                <div className='lg:mx-8 mx-1 flex flex-col lg:flex-row mt-20 lg:mt-28 h-96 mb-96 lg:mb-16  ' >

                    <div className='lg:w-1/2 w-full justify-around mx-9'>
                        <h1 className='lg:text-2xl text-lg font-serif font-semibold mb:2 lg:mb-3'>About us</h1>
                        <div className='mb-9'>
                            <p className='font-sans my-1 lg:my-3 text-sm lg:text-base'>At SevenSky, we take pride in being your trusted partner on the journey to finding your dream property. As a leading real estate platform in India, we are dedicated to transforming the way you experience real estate transactions Explore a rich tapestry of real estate options tailored to meet the diverse needs and aspirations of our users. From urban dwellings to suburban retreats and commercial spaces strategically positioned for success, SevenSky curates a comprehensive collection of properties that showcase the vibrant landscape of India.</p>
                        </div>
                        <div >


                        <h1 className='lg:text-xl text-lg font-serif font-semibold mb-3'>Our Vision: Elevating Your Real Estate Experience</h1>
                        <p className='tracking-wide sm:text-sm lg:text-base '>

                            SevenSky envisions a future where your real estate endeavors are seamless, transparent, and rewarding. Whether you are searching for a cozy apartment, a spacious house, or a strategic commercial space, we are committed to providing a platform that simplifies the entire process.
                        </p>
                        </div>



                    </div>
                    <div className=' lg:w-1/2  '>
                        <img src="/public/other/future.jpeg " className='rounded-md w-full h-56 lg:h-96 ' alt="" />
                    </div>
                </div>

                <div className=''  >
                    <h1 className='font-serif font-bold text-xl mx-12 mb-7'>Meet Our Expert Partners:</h1>
                    <p className='mx-12 my-7'>
                        In the world of real estate, having the right partner can make all the difference. At SevenSky, we're proud to introduce a network of experienced agents ready to guide you through every step of your property journey.
                    </p>
                    <About />
                    <div>
                        <h1 className='text-xl font-serif font-bold mx-12 mb-2'>
                            Why Choose Our Partners:
                        </h1>
                        <p className='mx-12 mb-12'>
                            Our partners are not just agents; they're seasoned professionals with a deep understanding of the real estate market. With years of expertise, they bring invaluable insights, local knowledge, and personalized service to ensure your real estate experience is smooth and tailored to your unique needs.
                        </p>
                    </div>
                </div>
            </div>
            <Footer/>

        </>
    )
}

export default AboutPage
