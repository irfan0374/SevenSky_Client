import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ChatList from './ChatList'
import Chatbox from './Chatbox'
import { userChat } from '../../../Api/chatAxios'
import Loading from '../../Loading/Loading'
import { io } from "socket.io-client";

const END_POINT = "http://localhost:3001";
let socket;


const MainPage = () => {
    const user = useSelector((state) => state.userReducer.user)
    const [loading,setLoading]=useState(false)
    const [currentChat,setCurrentChat]=useState(null)
    const [conversation, setConversations] = useState([])
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [messages,setMessage]=useState([])

    useEffect(() => {
        setLoading(true)
        userChat(user._id).then((res) => {
            setLoading(false)
            setConversations(res?.data);
        });
    }, [user._id]);
    useEffect(() => {
      socket = io(END_POINT);
    }, []);
  
    useEffect(() => {
      socket?.emit("setup", user._id);
      socket?.on("get-users", (users) => {
        setOnlineUsers(users);
      });
  
      return () => {
        socket.disconnect();
      };
    }, [user._id]);
  
    useEffect(() => {
      socket?.on("recieve_message", (data) => {
        if (data?.chatId === currentChat?._id) {
          const message = [...messages, data];
          setMessage(message);
        }
  
        const updatedConversations = conversation.map((chat) => {
          if (chat._id === data.chatId) {
            return { ...chat, lastMessage: Date.parse(data.createdAt) };
          }
          return chat;
        });
  
        const sortedConversations = [...updatedConversations].sort((a, b) => {
          const aTimestamp = a.lastMessage || 0; 
          const bTimestamp = b.lastMessage || 0;
          return bTimestamp - aTimestamp;
        });
  
        setConversations(sortedConversations);
      });
    }, [messages, currentChat, conversation]);

    return (
        <>
      {loading?(<Loading/>):(    
      <div>
      <div className="mt-12">
        <div>
          <div className="md:flex no-wrap md:-mx-2 ">
            <div className="w-full  md:w-3/12 md:mx-2 bg-gray-200">
              <div
                className="bg-gray-200 flex flex-col overflow-y-scroll"
                style={{ maxHeight: "85vh" }}
              >
              
                {/* <!-- end search compt -->
                 <!-- user list --> */}
                <div className="pt-20 ">
                  <div className="cursor-pointer">
                    {conversation?.map((chat) => (
                      <div
                        key={chat._id}
                        onClick={() => {
                          setCurrentChat(chat);
                          socket?.emit("join room", chat._id);
                        }}
                      >
                        <ChatList
                          data={chat}
                          currentUserId={user._id}
                        //   online={checkOnlineStatus(chat)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-9/12 mx-2 h-full">
              <div className="bg-gray-100 shadow-sm rounded-sm md:p-1">
                <div className="flex flex-wrap justify-end font-semibold text-gray-900">
                  <div
                    className="flex-1 p:2 sm:p-6 justify-center flex flex-col"
                    style={{ minHeight: "85vh" }}
                  >
                    <Chatbox
                    chat={currentChat}
                      currentUser={user._id}
                      setMessage={setMessage}
                      messages={messages}
                      socket={socket}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )}
        
        </>
    )
}

export default MainPage
