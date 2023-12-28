import React, { useEffect, useState } from 'react'
import PropertyDetail from '../../Component/CommonComponent/PropertyDetail'
import { useLocation, useParams } from 'react-router-dom'
import { propertylist } from '../../Api/partnerApi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Navbar from '../../Component/partnerComponent.js/Navbar'
import DetailePage from '../../Component/userComponent.js/DetailePage'
import Loading from '../../Component/Loading/Loading'

const DetailPage = () => {
    const navigate=useNavigate()
    const [propertyDetail,setPropertyDetail]=useState()

   const location=useLocation()
   const {data}=location.state

    const [loading,setLoading]=useState(true)

    
   useEffect(()=>{
    propertylist(data)
    .then((res)=>{
        setPropertyDetail(res?.data?.detailProperty)

    }).catch((error)=>{
        console.log(error.message)
        if(error.response?.status){
            navigate('/partner/partnerHome')
            toast.error(error.response?.data?.message)
        }

    }).finally(()=>{
        setLoading(false)
    })
    
   },[data])


  return (
   <>
<Navbar/>
   {
loading?(<Loading/>):( <DetailePage property={propertyDetail}/>
)
   }
   </>
  )
}

export default DetailPage
