import React,{useState,useEffect} from 'react'
import Navbar2 from '../../../Component/userComponent.js/Navbar2'
import DetailePage from '../../../Component/userComponent.js/DetailePage'
import { DetailsProperty } from '../../../Api/userApi'
import { useLocation, useParams } from 'react-router-dom'
import Loading from '../../../Component/Loading/Loading'


const propertyDetail = () => {
    const [loading,setLoading]=useState(true)
    const [detailProperty,setPropertyDetail]=useState()
    const {id}=useParams()
    const location=useLocation()
    const {propertyId}=location.state
    

    useEffect(()=>{
        DetailsProperty(propertyId)
        .then((res)=>{
            setPropertyDetail(res?.data?.Property)
        }).catch((error)=>{
            console.log(error.message)
        }).finally(()=>{
            setLoading(false)
        })
    },[id])
  return (
  <>
   <div className='mb-28'>
<Navbar2 />
</div>
  {loading ?(<Loading/>):(<DetailePage property={detailProperty}/>)
  }
  </>
  )
}

export default propertyDetail
