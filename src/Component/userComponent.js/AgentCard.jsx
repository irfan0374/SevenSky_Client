import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import { createChat } from '../../Api/chatAxios'
import { useSelector } from 'react-redux'
import { findUser } from '../../Api/userApi'




const AgentCard = ({ partnerdata }) => {
    const [userData, setUserData] = useState()
    const { user } = useSelector((state) => state.userReducer)
    const userId = user._id
    const [chatCreate, setCreateChat] = useState(false)


    useEffect(() => {
        findUser(userId).then((res) => {
            setUserData(res?.data?.User)
        }).catch((error) => {
            console.log(error.message)
        })
    }, [])

    const handleCreateChat = async () => {
        document.getElementById('my_modal_2').close();
        try {
            const res = await createChat(user._id, partnerdata?._id)
            if(res?.status===200)setCreateChat(res?.data)

            


        } catch (error) {
            console.log(error.message)
        }
    }
    const handleModal = () => {
        document.getElementById('my_modal_2').close()
    }


    return (
        <>



            <div className=' flex justify-center my-4'>
                <div className='container bg-gray-200 '>
                    <div className='m-7 flex space-x-5'>
                        <div className='w-1/4 h-80 b'>
                            <img
                                className='w-full h-full object-fill'
                                src={partnerdata?.profile ? partnerdata?.profile : '/public/Account.png'} />
                        </div>
                        <div className='w-full h-28 space-y-5'  >
                            <div className=' tracking-normal font-bold text-xl p-6 border-gray-400 border-b-2'>
                                {partnerdata?.name}
                            </div>

                            <div className='flex space-x-2'>

                                <button className="relative rounded-md inline-block px-6 py-2  font-bold text-white transition-all duration-300 ease-in-out border-2 border-gray-400 hover:text-black focus:outline-none active:top-1 bg-gradient-to-r from-transparent to-gray-500 hover:from-transparent hover:to-white" onClick={() => document.getElementById('my_modal_1').showModal()}>
                                    Send Email
                                </button>

                               
                                

                                {userData?.subscription?.planType ? (
                                    chatCreate?.data ? (
                                       <Link to={`/chat/${partnerdata?._id}`}
                                    className="inline-flex items-center px-4 py-2 mt-2 font-semibold tracking-tighter text-black transition duration-500 ease-in-out transform bg-transparent border rounded-lg text-md md:mt-0 hover:text-white hover:bg-black focus:shadow-outline">
                                    <div className="flex text-lg tracking-tighter w-20">
                                        <span className="justify-center text-md tracking-wider mx-3 flex ">Chat <span className='mx-2'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" data-name="Layer 2" viewBox="0 0 32 32" id="chat"><path d="M16 4.5c-7.17 0-13 4.43-13 9.88C3 18 5.58 21.3 9.75 23a6.88 6.88 0 0 1-1.17 3.85.52.52 0 0 0 0 .56.51.51 0 0 0 .42.22h.1c.18 0 4.34-.89 6.67-3.4C23 24.34 29 19.88 29 14.38S23.17 4.5 16 4.5Zm0 18.75h-.42a.49.49 0 0 0-.41.17 11.59 11.59 0 0 1-5.16 3 8 8 0 0 0 .73-3.71.51.51 0 0 0-.32-.45C6.46 20.68 4 17.67 4 14.38 4 9.48 9.38 5.5 16 5.5s12 4 12 8.88-5.38 8.87-12 8.87Z"></path></svg></span></span>
                                    </div>
                                </Link>
                                    ) : (
                                        <div className="inline-flex items-center px-4 py-2 mt-2 font-semibold  text-black transition duration-500 ease-in-out transform bg-transparent border rounded-lg text-md md:mt-0 hover:text-white hover:bg-black focus:shadow-outline">
                                            <div className="flex text-lg tracking-tighter w-20" onClick={() => document.getElementById('my_modal_2').showModal()}>
                                                <span className="justify-center text-md r  flex ">
                                                    Connect
                                                    <span className='mx-2'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" data-name="Layer 2" viewBox="0 0 32 32" id="chat"><path d="M16 4.5c-7.17 0-13 4.43-13 9.88C3 18 5.58 21.3 9.75 23a6.88 6.88 0 0 1-1.17 3.85.52.52 0 0 0 0 .56.51.51 0 0 0 .42.22h.1c.18 0 4.34-.89 6.67-3.4C23 24.34 29 19.88 29 14.38S23.17 4.5 16 4.5Zm0 18.75h-.42a.49.49 0 0 0-.41.17 11.59 11.59 0 0 1-5.16 3 8 8 0 0 0 .73-3.71.51.51 0 0 0-.32-.45C6.46 20.68 4 17.67 4 14.38 4 9.48 9.38 5.5 16 5.5s12 4 12 8.88-5.38 8.87-12 8.87Z"></path></svg></span>

                                                </span>
                                            </div>
                                        </div>
                                    )
                                ) : null}


                            </div>

                        </div>

                    </div>
                </div>
            </div>
            <div className="   flex justify-center">
                <div className='container flex h-72'>

                    <div className=" bg-gray-200 w-4/6  mx-2"  >
                        <div className='p-4'>
                            <h1 className='text-xl'>About<span className='mx-2 font-bold'>{partnerdata?.name}</span></h1>
                            <p className='my-5 tracking-wide italic'>
                                {partnerdata?.aboutMe?.description}
                            </p>
                            <p className='my-8 font-bold flex '>
                                <span><svg xmlns="http://www.w3.org/2000/svg" width={40} height={30} viewBox="0 0 64 64" id="location"><path fill="#e3e2e1" d="M54.01 58.74C54.01 61.65 44.15 64 32 64c-12.15 0-22.01-2.35-22.01-5.26 0-2.6 7.9-4.74 18.26-5.18h7.5c10.37.44 18.26 2.58 18.26 5.18z"></path><path fill="#e82327" d="M32 0C20.7 0 11.54 9.15 11.54 20.45 11.54 31.75 32 58.74 32 58.74s20.45-26.99 20.45-38.29S43.3 0 32 0zm0 33.99c-7.48 0-13.54-6.06-13.54-13.54S24.52 6.91 32 6.91c7.48 0 13.54 6.06 13.54 13.54S39.48 33.99 32 33.99z"></path></svg></span>   {partnerdata?.aboutMe?.state}, {partnerdata?.aboutMe?.location}
                            </p>
                            <div className='flex'>
                                <span><svg xmlns="http://www.w3.org/2000/svg" width={30} height={40} data-name="Layer 2" viewBox="0 0 32 32" id="chat"><path d="M16 4.5c-7.17 0-13 4.43-13 9.88C3 18 5.58 21.3 9.75 23a6.88 6.88 0 0 1-1.17 3.85.52.52 0 0 0 0 .56.51.51 0 0 0 .42.22h.1c.18 0 4.34-.89 6.67-3.4C23 24.34 29 19.88 29 14.38S23.17 4.5 16 4.5Zm0 18.75h-.42a.49.49 0 0 0-.41.17 11.59 11.59 0 0 1-5.16 3 8 8 0 0 0 .73-3.71.51.51 0 0 0-.32-.45C6.46 20.68 4 17.67 4 14.38 4 9.48 9.38 5.5 16 5.5s12 4 12 8.88-5.38 8.87-12 8.87Z"></path></svg></span><span className='font-bold'>Language:</span><p>English,Hindi</p>
                            </div>
                        </div>
                    </div>
                    <div className='bg-gray-200 w-2/6 '>
                        <div className="m-5">

                            <h1 className='text-xl font-serif'>Contact</h1>
                            <div >
                                <div className=' mt-7 pb-3 border-b-2 border-gray-400'>
                                    Name:<span className='px-5'>{partnerdata?.name}</span>
                                </div>
                                <div className='mt-7 pb-3 border-b-2 border-gray-400'>
                                    Email:<span className='px-2'>{partnerdata?.email}</span>
                                </div>
                                <div className='mt-7 pb-3 border-b-2 border-gray-400'>
                                    Mobile:<span className='px-5'>{partnerdata?.phone}</span>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
            </div>

            {/* chat create modal when the modal is open chat is create  */}

            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Connect to agent</h3>
                    <p className="py-4"> You can now connect with our support agents through chat for a personalized and swift assistance experience.</p>
                    <div className="">
                        <div className='space-x-2'>
                            <button className="btn btn-outline btn-sm" onClick={handleCreateChat}>Accept</button>
                            <button className="btn btn-outline btn-warning btn-sm" onClick={handleModal}>Decline</button>
                        </div>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            {/* ------------------------------------------ */}



        </>
    )
}

export default AgentCard;

