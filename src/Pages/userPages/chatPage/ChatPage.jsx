import React, { useEffect, useState } from 'react'
import MainPage from '../../../Component/userComponent.js/chatComponet/MainPage'
import { useParams } from 'react-router-dom'

import Loading from '../../../Component/Loading/Loading'
import { useSelector } from 'react-redux'
import Navbar from '../../../Component/userComponent.js/Navbar2'


const ChatPage = () => {
    const { partnerId } = useParams()
    const {user}=useSelector((state)=>state.userReducer)
   const userId=user._id
   const [loading, setLoading] = useState(false)



    return (
        <>
            {loading ? (<Loading />) : (<> <Navbar/> <MainPage /></>)}
        </>
    )
}

export default ChatPage
