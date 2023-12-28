import {React,useState,useEffect} from 'react'
import Navbar2 from '../../../Component/userComponent.js/Navbar2'
import Card from '../../../Component/CommonComponent/Card'
import { listProperty } from '../../../Api/userApi'

const propertyPage = () => {
    const [property,setProperty]=useState([])
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        listProperty()
        .then((res)=>{
            setProperty(res?.data?.listProperty)
        }).catch((error)=>{
            console.log(error.message)
            toast.error(res.error.message)
        }).finally(()=>{
            setLoading(false)
        })
        
    },[])

    console.log(property)
  return (
    <>
    <Navbar2/>
    {property.map((data)=>(
    loading?(<p>loading</p>):(   

        <div key={data._id} className='grid grid-cols-2 gap-4'>
   
        <Card data={data}>
            <div>{data.propertyName}</div>
            <div>{data.description}</div>
        </Card>
    </div>
    )
    ))}
    </>
  )
}

export default propertyPage
