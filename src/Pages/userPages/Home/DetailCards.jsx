import React,{useEffect,useState,lazy, Suspense} from 'react'
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useSelector } from 'react-redux/es/hooks/useSelector';
import {
    Tabs,
    TabsHeader,
    Tab,
    TabsBody,
    TabPanel,
  } from "@material-tailwind/react";
import CardRentDetails from '../../../Component/userComponent.js/CardRentDetails'
import CardSaleDetails from '../../../Component/userComponent.js/CardSaleDetails'
import Navbar2 from '../../../Component/userComponent.js/Navbar2';
import { useLocation } from 'react-router-dom';
const DetailCards = () => {
    const location =useLocation()
    const {state}=location
    const datas=state.data
    const values=state.value

    const data = [
        {
          label: "Rent",
          value: "Rent",
          icon: UserCircleIcon,
          desc:
            <CardRentDetails datas={datas} values={values} />
     
    
    
        },
        {
            label: "Sales",
          value: "Sales",
          icon: UserCircleIcon,
          desc:
           <CardSaleDetails datas={datas} values={values} />
        },
    ]
  return (
    <>
    <Navbar2/>
    <div className='my-24'>

     <Tabs value="Rent">
      <TabsHeader className="w-96 mx-auto flex justify-center">
        {data.map(({ label, value, icon }) => (
          <Tab
            key={value}
            value={value}
            className="w-40"
          >
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
        </div>
      
    </>
  )
}

export default DetailCards
