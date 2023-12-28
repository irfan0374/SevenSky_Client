import React, { useEffect,useState } from 'react'
import { findPartner } from '../../../Api/chatAxios'


const ChatList = ({data,currentUserId}) => {

    const [partnerData,setpartnerData]=useState(null)

   
    useEffect(()=>{
        const partnerId=data?.members?.find((id)=>id !==currentUserId)
               
        const getPartner=async()=>{
            try{
                console.log(partnerId,"partnerId")
                const {data}=await findPartner(partnerId)
                setpartnerData(data)
    
            }catch(error){
                console.log(error.message)
            }
        }
        getPartner()
    },[data,currentUserId])
  return (
    <>
        <div className="flex  px-5 py-1 justify-center items-center border-2 border-gray-300 rounded-xl bg-gray-200 hover:bg-gray-50">
  <div className="w-1/4">
    <img
      src={partnerData?.profile || "/images/person-304893_1280.png"}
      className="object-cover h-12 w-12 rounded-full"
      alt={`Profile of ${partnerData?.name}`}
    />
  </div>
  <div className="w-full ml-4"> {/* Added margin to separate the image and text */}
    <div className="text-lg font-semibold text-black">{partnerData?.name}</div>
  </div>
</div>
<hr className="mt-3" style={{ width: "85%", border: "0.5px solid #ececec" }} />
    </>
 
  )
}

export default ChatList
