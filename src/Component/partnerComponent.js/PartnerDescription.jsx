import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { descriptionUpdate } from '../../Api/partnerApi'
import { descriptionValidation } from '../../schema/Partnervalidation/descriptionValidation'
import Loading from '../Loading/Loading'
import { findPartner } from '../../Api/partnerApi'
import { toast } from 'react-toastify'

const PartnerDescription = () => {


    const [profile, setData] = useState()
    const [loading, setLoading] = useState(false)
    const partner = useSelector((state) => state.partnerReducer.partner)
    console.log(partner, "partneriddddd")
    const partnerId = partner._id

    useEffect(() => {
        setLoading(true)
        findPartner(partnerId)
            .then((res) => {
            
                setData(res?.data?.Partner)
                setLoading(false)

            }).catch((error)=>{
                console.log(error.message)
            })

    },[partnerId])
    
   
    const { values, errors, getFieldProps, handleSubmit,touched } = useFormik({
        initialValues: {
          state:  profile?.aboutMe?.state||'', 
          location: profile?.aboutMe?.location || '', 
          description: profile?.aboutMe?.description || '', 
        },
        validationSchema: descriptionValidation,
        onSubmit,
        enableReinitialize: true
      });
      

    async function onSubmit() {
        try {

            const res = await descriptionUpdate({ ...values, partnerId })
            if (res?.status === 200) {
                toast.info(res?.data?.message)
            }
            else {
                toast.info("something went wrong please relogin")
            }
        } catch (error) {
            console.log(error.message)
        }

    }


    return (
        <>
            {loading ? (<Loading/>) : (
                <div className=" container flex w-96 flex-col gap-6 min-h-screen mx-auto ">
                    <form onSubmit={handleSubmit}>

                        <div className="relative h-full w-full min-w-[200px] my-7">
                            <input
                                name='state'
                                {...getFieldProps("state")}

                                
                                className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            />
                            {errors.state&&touched.state&&(<p className='text-red-500 text-sm'>{errors.state}</p>)}
                            <label className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none text-sm font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-black after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-black peer-focus:after:scale-x-100 peer-focus:after:border-black peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                State
                            </label>
                        </div>
                        <div className="relative h-11 w-full min-w-[200px] my-7">
                            <input
                                name="location"

                                className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"

                                {...getFieldProps("location")}

                            />
                            {errors.location&&touched.location&&(<p className='text-red-500 text-sm'>{errors.location}</p>)}
                            <label className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none text-sm font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-black after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-black peer-focus:after:scale-x-100 peer-focus:after:border-black peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                Location
                            </label>
                        </div>
                        <div className="relative w-full min-w-[200px] my-7">
                            <textarea
                                name="description"
                                {...getFieldProps("description")}
                                className=" peer h-40 w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 overflow-y-auto resize-none"
                                placeholder=" "
                            />
                                                        {errors.description&&touched.description&&(<p className='text-sm text-red-500'>{errors.description}</p>)}

                                                        <label className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none text-sm font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-black after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-black peer-focus:after:scale-x-100 peer-focus:after:border-black peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                Description
                            </label>
                        </div>
                        <div className='flex justify-center'>
                            <button className="btn btn-outline">Submit</button>

                        </div>
                    </form>



                </div>
            )}

        </>
    )
}

export default PartnerDescription
