import React from 'react'
import { Routes,Route } from 'react-router-dom'
import AdminLogin from '../Pages/adminPages/adminLogin/adminLogin'
import ShowList from '../Pages/adminPages/List'
import PartnerLists from '../Pages/adminPages/partnerList'
import AdminProtect from './AdminPrivate/AdminProtect'
import AdminPublic from './AdminPrivate/AdminPublic'
import KycUpload from '../Pages/adminPages/kycUpload'
import PropertyList from '../Pages/adminPages/PropertyList'
import PropertyApproval from '../Pages/adminPages/PropertyApproval'
import PremiumUserPage from '../Pages/adminPages/premiumUser'
import Dashboard from '../Pages/adminPages/Dashboard'
const   AdminRoute = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<AdminLogin/>}/>
        <Route path='/userList' element={<AdminProtect><ShowList/></AdminProtect>} />
        <Route path='/partnerList' element={<AdminProtect><PartnerLists/></AdminProtect>} />
        <Route path='/kycApproval/:partnerId' element={<AdminProtect><KycUpload/></AdminProtect>}/>
        <Route path='/propertylist' element={<AdminProtect><PropertyList/></AdminProtect>}/>
        <Route path='/propertyApproval/:propertyId' element={<AdminProtect><PropertyApproval/></AdminProtect>}/>
        <Route path='/premiumUser' element={<AdminProtect><PremiumUserPage/></AdminProtect>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
    </>
  )
}
export default AdminRoute