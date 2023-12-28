import React from 'react'
import ProfilePage from '../../../Component/userComponent.js/profilePage'
import {
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
} from "@material-tailwind/react";
import ChangePassword from '../../../Component/userComponent.js/changePassword';
import {UserCircleIcon,} from "@heroicons/react/24/solid";
import Navbar2 from '../../../Component/userComponent.js/Navbar2';


;
const UserProfile = () => {
  const data = [
    {
      label: "Profile",
      value: "Profile",
      icon: UserCircleIcon,
      desc:
       <ProfilePage/>
      ,


    },
    // SIGNUP FROM
    {
      label: "Change Password",
      value: "SignUp",
      icon: UserCircleIcon,
      desc:
       
         <>
         <ChangePassword/>
         </>
      
    },

  ];
  return (
    <>
     <div className='mb-24'>
<Navbar2 />
</div>
<div className='my-4'>


<Tabs value="Profile">
      <TabsHeader className="w-96 mx-auto flex justify-center">
        {data.map(({ label, value, icon }) => (
          <Tab
            key={value}
            value={value}
            className="w-auto"
          >
            <div className="flex items-center gap-4">
              {React.createElement(icon, { className: "w-5 h-5" })}
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
    </div>
    </>
  )
}

export default UserProfile
