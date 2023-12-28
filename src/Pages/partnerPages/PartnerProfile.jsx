import React, { useEffect, useRef, useState } from "react";
import { useFormik } from 'formik'
import { useNavigate, Link, Form } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import PartnerDescription from "../../Component/partnerComponent.js/PartnerDescription";
import ProfilePage from "../../Component/partnerComponent.js/ProfilePage";
import Navbar from "../../Component/partnerComponent.js/Navbar"

import {
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
} from "@material-tailwind/react";
import {

  UserCircleIcon,

} from "@heroicons/react/24/solid";
import axios from "axios";

;

const PartnerProfilePage=()=> {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // SIGNUP FUNCTION START



 

  const data = [
    {
      label: "Profile",
      value: "Profile",
      icon: UserCircleIcon,
      desc:
    
<ProfilePage/>
      
      


    },
    // SIGNUP FROM
    {
      label: "About Me",
      value: "About Me",
      icon: UserCircleIcon,
      desc:
      
<PartnerDescription/>
  
      ,
    },

  ];
  return (
    
    <>
    <Navbar/>
    <Tabs value="Profile">
    <TabsHeader className="w-96 mx-auto mt-5 flex justify-center">
      {data.map(({ label, value, icon }) => (
        <Tab key={value} value={value} className="w-40">
          <div className="flex items-center gap-2">
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

 </>
);
};
export default PartnerProfilePage;