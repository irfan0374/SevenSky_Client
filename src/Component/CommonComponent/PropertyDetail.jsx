import { React } from 'react'



const PropertyDetail = ({ myProperty }) => {

    return ( 
        <>
            <div className="container mt-4 mx-auto p-4 rounded-md bg-gray-300 " key={myProperty._id} >
                <div>
                    <>
                        <h2 className="text-4xl font-extrabold dark:text-white">
                            {myProperty.propertyName}
                        </h2>
                        <p className="my-4 text-lg text-gray-500">
                            {myProperty.description}
                        </p>
                    </>

                </div>

                <div className='flex flex-col md:flex-row mt-2'>
                    <div className='md:w-2/6 w-full mr-4'>
                        <div>

                        </div>
                        <img className=' object-cover w-full h-96 rounded-md' src={myProperty.propertyImage[0]? myProperty.propertyImage[1] :"/public/noBuliding.png"} alt="mainImage not found" />


                    </div>
                    <div className='md:w-1/2 w-full rounded-md'>

                        <div className="grid grid-cols-2 gap-2 ">

                            <img className='object-cover w-full rounded-md' src={myProperty.propertyImage[1]? myProperty.propertyImage[1] :"/public/noBuliding.png"} alt=" Image not found" />

                            <img className='object-cover w-full rounded-md' src={myProperty.propertyImage[2]? myProperty.propertyImage[2]:"/public/noBuliding.png"} alt=" 2 Image not found" />

                            <img className='object-cover w-full rounded-md' src={myProperty.propertyImage[3]? myProperty.propertyImage[3]:"/public/noBuliding.png"} alt="3 Image not found" />

                            <img className='object-cover w-full rounded-md' src={myProperty.propertyImage[4]? myProperty.propertyImage[4]:"/public/noBuliding.png"} alt=" 4 Image not found" />



                        </div>
                    </div>

                </div>
                <p className="mb-4 text-lg font-normal text-black dark:text-gray-400">
                           location: <span className='text-gray-700'>{myProperty.location}</span>
                        </p>

            </div>
        </>
    )
}

export default PropertyDetail
