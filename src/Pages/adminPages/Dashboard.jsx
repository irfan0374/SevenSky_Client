import React, { useEffect,useState } from 'react'
import LineChart from '../../Component/adminComponet.js/Chart/LineChart'
import { dashboardData } from '../../Api/adminApi'
import Loading from '../../Component/Loading/Loading'
import Navbar from '../../Component/adminComponet.js/NavBar'

const Dashboard = () => {
    const [loading,setLoading]=useState(false)
    const [chartDatas,setChartData]=useState()
  
    useEffect(()=>{
     async function getChartDatas(){
        try {
            setLoading(true)
            const res=await dashboardData()
            setLoading(false)
            console.log(res?.data,"dtaaaaaaaaaaaaaa")
            setChartData(res?.data)
            
        } catch (error) {
            console.log(error.message)
        }
     }
     getChartDatas()
     
     
       
    },[])
      

  return (
    <>
    <Navbar/>
    {loading?(<Loading/>):( <>
     
    <LineChart chart={chartDatas} /></>)}
      
    </>
  )
}

export default Dashboard
