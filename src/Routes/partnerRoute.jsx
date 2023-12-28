import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import DetailLogin from '../Pages/partnerPages/LoginPage/detailLogin'
import Registration from '../Pages/partnerPages/LoginPage/registration'
import PartnerSignup from '../Pages/partnerPages/LoginPage/partnerSignup'
import PartnerOtp from '../Pages/partnerPages/LoginPage/partnerOtp'
import PartnerProtect from './partnerPrivate/PartnerProtector'
import PartnerPublic from './partnerPrivate/PartnerPublic'
import PartnerHome from '../Pages/partnerPages/PartnerHome'
import KycUpload from '../Pages/partnerPages/LoginPage/KycUpload'
import DetailPage from '../Pages/partnerPages/DetailPage'
import PartnerProfilePage from '../Pages/partnerPages/PartnerProfile'
import PropertyEdit from '../Component/partnerComponent.js/PropertyEdit'
import Chat from '../Pages/partnerPages/ChatPage/Chat'
import BuyerDetailPage from '../Pages/partnerPages/BuyerDetailPage'
import ForgetPassword from '../Component/CommonComponent/ForgotPassword'
const PartnerRoute = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<PartnerPublic><DetailLogin/></PartnerPublic>}/>
        <Route path='/registration' element ={<PartnerPublic><Registration/></PartnerPublic>}/>
        <Route path='/otp' element ={<PartnerPublic><PartnerOtp/></PartnerPublic>}/>
        <Route path='/home' element={<PartnerHome/>}/>
        <Route path='/kycUpload' element={<KycUpload/>}/>
        <Route path='/partnerHome' element={<PartnerHome/>}/>
        <Route path='/propertyDetail' element={<DetailPage/>}/>
        <Route path='/partnerProfile' element={<PartnerProfilePage/>}/>
        <Route path='/propertyEdit/:propertyId' element={<PropertyEdit/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/buyerDetails' element={<BuyerDetailPage/>}/>
        <Route path='/forgotPassword' element={<ForgetPassword/>}/>
        
    </Routes>
    </>
  )
}

export default PartnerRoute

