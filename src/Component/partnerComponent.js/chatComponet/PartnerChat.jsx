import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ChatList from './ChatList'
import Chatbox from './Chatbox'
import Loading from '../../Loading/Loading'
import { userChat } from '../../../Api/chatAxios'
import { io } from "socket.io-client";
import Navbar from '../Navbar'

const END_POINT = "http://localhost:3001";
let socket;



const MainPage = ({ data }) => {
    const[loading,setLoading]=useState(false)
    const [currentChat,setCurrentChat]=useState(null)
    const [conversation,setConversations]=useState([])
    const [messages,setMessages]=useState([])
    const [onlineUsers, setOnlineUsers] = useState([]);
    const {partner} = useSelector((state) => state.partnerReducer)


    useEffect(()=>{
        setLoading(true)
        userChat(partner._id).then((res)=>{
            setLoading(false)
            setConversations(res?.data)
        });

    },[partner._id])
    
  useEffect(() => {
    socket = io(END_POINT);
  }, []);

  useEffect(() => {
    socket?.emit("setup", partner._id);
    socket?.on("get-users", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.disconnect();
    };
  }, [partner._id]);

  useEffect(() => {
    socket?.on("recieve_message", (data) => {
      if (data?.chatId === currentChat?._id) {
        const message = [...messages, data];
        setMessages(message);
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
      <div>
        <Navbar/>
      </div>
   
           <div>
           <div className="pt-5 w-full">
             <div>
               <div className="md:flex no-wrap md:-mx-2 ">
                 <div className="w-full md:w-3/12 md:mx-2 bg-gray-200">
                   <div
                     className="bg-gray-200 flex flex-col overflow-y-scroll"
                     style={{ maxHeight: "85vh" }}
                   >
                     
                     {/* <!-- end search compt -->
                      <!-- user list --> */}
                     <div className="pt-20">
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
                               currentUserId={partner._id}
                            //    online={checkOnlineStatus(chat)}
                               
                             />
                           </div>
                         ))}
                       </div>
                     </div>
                   </div>
                 </div>
              
                         <Chatbox
                           chat={currentChat}
                           currentPartner={partner._id}
                           setMessages={setMessages}
                           messages={messages}
                           socket={socket}
                         />
                   
               </div>
             </div>
           </div>
         </div>
         </>
    )
}

export default MainPage
