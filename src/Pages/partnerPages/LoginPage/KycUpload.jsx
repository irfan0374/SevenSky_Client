import React from 'react'
import { useState } from 'react'
import { partnerKycUpload } from '../../../Api/partnerApi'
import { useNavigate, useLocation } from 'react-router-dom'
const KycUpload = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const partnerId = location.state


    const [kycImage, setKycImage] = useState()
    const handleImage = (e) => {
       
        const file = e.target.files[0]
        kycImageToBase(file)

    }

    const kycImageToBase = async (file) => {
   
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setKycImage(reader.result)

        }
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const res = await partnerKycUpload({ partnerId, kycImage })
            console.log(res)
                if(res?.status===200){      
                    navigate("/partner/registration");
                }
        } catch (error) {
            res.status(400).json({message:"Internal server error"})
            console.log(error.message)
        }
    }
    return (
        <>
            <div className='mx-auto h-screen flex items-center justify-center'>
                <div className='container flex items-center justify-center'>

                    <div className=" w-[400px] h-[700px]  md:w-[800px] md:h-[600px]  border border-gray-900 rounded-lg ">
                        <div>


                            <div className='flex flex-col items-center'>
                                <h1 className='text-3xl font-serif font-bold mt-12'>Verification</h1>
                                <h2 className='p-3'>Thank you for choosing to host with us  </h2>
                                <h2>we kindly request your cooperation in completing the verification process following these steps: </h2>
                            </div>
                            <div className='flex flex-col tracking-tight  px-14 mt-5'>

                                <li>Upload a Clear image of your government-issued ID or passport</li>
                                <li>Ensure that image is high-quality and all details are clearly visibe.</li>
                                <li>Click "Upload" button below to submit your identifiction document.</li>

                            </div>
                            <div className='m-3 font-bold mt-12'>
                                Our Team will review the Uploaded document for verification purposes. This is a standerd procedure to endure the safety and security of our platform.
                            </div>
                            <div>
                                <div className="flex justify-center mt-9 items-center">
                                    <div className="space-y-3">
                                        <h1>Upload an image:</h1>
                                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                                            <div>
                                                <input type="file" className="file-input w-full max-w-xs" onChange={handleImage} />
                                            </div>
                                            {kycImage && (
                                                <div className="mt-4">
                                                    <button
                                                        type="submit"
                                                        className="bn54 relative outline-none text-decoration-none rounded-full flex justify-center items-center cursor-pointer uppercase h-12 w-40 opacity-100 bg-white border border-black border-opacity-60 transition duration-400 ease-in-out transform hover:rotate-6 hover:translate-x-2"
                                                    >
                                                        <span className="bn54span font-sans text-black text-sm font-medium tracking-wide">
                                                            Button
                                                        </span>
                                                    </button>
                                                    <div>😊Waiting to upload...</div>
                                                </div>
                                            )}
                                        </form>
                                    </div>
                                </div>

                                
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default KycUpload
