import React,{useState,useEffect} from "react";
import { findUser } from "../../../Api/chatAxios";


const ChatList = ({ data, currentPartnerId }) => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const userId = data?.members?.find((id) => id !== currentPartnerId);
    const getUserData = async () => {
      try {
        const { data } = await findUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUserData();
  }, [data, currentPartnerId]);
  return (
    <div className="flex flex-row px-5 py-3 justify-center items-center border-b-2 bg-gray-200 hover:bg-gray-50 " >
      <div className="w-1/4">
        <img
          src={userData?.profile || "/public/Account.png"}
          className="object-cover h-12 w-12 rounded-full"
          alt=""
        />
      </div>
      <div className="w-full">
        <div className="text-lg font-semibold">{userData?.name}</div>
  
        {/* <span className="text-gray-500">{online ? "Online" : "Offline"}</span> */}
      </div>
    </div>
  );
};

export default ChatList;