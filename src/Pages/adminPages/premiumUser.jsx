import React from 'react'
import SideBar from '../../Component/adminComponet.js/SideBar'
import NavBar from '../../Component/adminComponet.js/NavBar'
import PremiumUser from '../../Component/adminComponet.js/premiumUser'
const premiumUserPage = () => {
  return (
    <>
       <NavBar/>
        <div className="mx-auto flex">
            <SideBar/>
            <PremiumUser/>
        </div>
    </>
  )
}

export default premiumUserPage
