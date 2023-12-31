import React, { useState, useEffect, useRef } from 'react'
import InputEmoji from "react-input-emoji";
import { findUser } from '../../../Api/chatAxios';
import { addMessage, getMessage } from '../../../Api/messageAxios';
import Conversation from '../../partnerComponent.js/chatComponet/Conversations'
const Chatbox = ({ chat, currentPartner, setMessages, messages, socket }) => {
    const [userData, setUserData] = useState(null)
    const [newMessage, setNewMessage] = useState("")
    const scroll = useRef();
    useEffect(() => {
        const userId = chat?.members?.find((id) => id !== currentPartner)

        const getUserData = async () => {
            try {
                const { data } = await findUser(userId)
                setUserData(data)
            } catch (error) {
                console.log(error.message)
            }
        }
        if (chat !== null) getUserData()
    }, [chat, currentPartner])
    // 👇️ scroll to bottom every time messages change
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const { data } = await getMessage(chat._id)
                setMessages(data)

            } catch (error) {
                console.log(error.message)
            }
        }
        if (chat !== null) fetchMessage()

    }, [chat])

    const handleChange = async (newMessage) => {
        setNewMessage(newMessage)
    }
    const handleSent = async (e) => {
        let newOne;
        e.preventDefault()

        const message = {
            senderId: currentPartner,
            text: newMessage,
            chatId: chat._id,
        };
        try {
            const { data } = await addMessage(message)
            newOne = data
            setMessages([...messages, data])
            setNewMessage("")

        } catch (error) {
            console.log(error.message)
        }
        //send message to socket server
        socket.emit("send_message", newOne);
    };

    return (
        <>
            {chat ? (

                <div className="flex-1 sm:p-6 justify-between flex flex-col h-screen ">
                    <div className="flex sm:items-center justify-between border-b-2 border-gray-200">
                        <div className=" flex items-center space-x-4">
                            <div className="">
                                <span className=" text-green-500 right-0 bottom-">
                                    <svg width={20} height={20}>
                                        <circle cx={8} cy={8} r={8} fill="currentColor" />
                                    </svg>
                                </span>
                                <img
                                    src={userData?.profile ? userData?.profile : '/public/Account.png'}
                                    alt="userProfile"
                                    className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
                                />
                            </div>

                            <div className=" md:text-xl sm:text-sm flex items-center">
                                <span className=" text-gray-700 mr-3">{userData?.name}</span>
                            </div>

                        </div>
                        <div className="flex items-center space-x-2">

                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                            </button>
                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {messages.map((message) => (
                        <div ref={scroll} key={message._id}>
                            <Conversation
                                message={message}
                                currentPartner={currentPartner}
                            />
                        </div>
                    ))}

                    <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                        <div className="relative flex">
                            <span className="absolute inset-y-0 flex items-center">
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="h-6 w-6 text-gray-600"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                                        ></path>
                                    </svg>
                                </button>
                            </span>
                            <InputEmoji value={newMessage} onChange={handleChange} />

                            <button
                                type="button"
                                onClick={handleSent}
                                className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                            >
                                <span className="font-bold">Send</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-6 w-6 ml-2 transform rotate-90"
                                >
                                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>


            ) : (<div
                className="flex-1 p:2 sm:p-6 justify-center flex items-center text-gray-300 h-screen"
                style={{ maxHeight: "90vh", fontSize: "50px" }}
            >
                Open a chat to start a conversation
            </div>
            )}
        </>
    )
}

export default Chatbox
