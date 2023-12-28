import React, { useState, useEffect } from 'react'
import Loading from '../Loading/Loading'
import MainCard from '../CommonComponent/MainCard'
import { BhkDataSales, salesBudeget, salesData } from '../../Api/userApi'

const CardSaleDetails = ({datas,values}) => {

  const [salesProperty, setSalesProperty] = useState([])
  
    useEffect(() => {
      console.log("ehlho useEffect")
      if(values==="property"){
      salesDetails()
      }else if(values==="budget"){
        salesBaseBudget()
      }else{
        propertyByBhk()
      }
  
    }, [values])

  const [loading, setLoading] = useState(false)

  const salesDetails = async () => {
    try {
      setLoading(true)
      const res = await salesData(datas)
      if (res?.status === 200) {
        setLoading(false)
        setSalesProperty(res?.data?.Result)
      }
    } catch (error) {
      setLoading(false)
      console.log(error.message)
    }
  }
  const salesBaseBudget = async () => {
    try {
      setLoading(true)
      const res = await salesBudeget(datas)
      if (res?.status === 200) {
        setLoading(false)
        setSalesProperty(res?.data?.Result)
      }
    } catch (error) {
      setLoading(false)
      console.log(error.message)
    }
  }
  const propertyByBhk = async () => {
    try {
      setLoading(true)
      const res = await BhkDataSales(datas)
      if (res?.status === 200) {
        setLoading(false)
        setSalesProperty(res?.data?.Result)
      }
    } catch (error) {
      setLoading(false)
      console.log(error.message)
    }
  }
  return (
    <>

<>
      {loading ? (<Loading />) : (<div>

        <div className=" grid md:flex justify-center grid-cols-1  lg:grid-cols-4 gap-2">
        {salesProperty.map((data) => (
          <div key={data._id}>
            <MainCard property={data} />
              </div>
        ))}

        </div>
      </div>)}
    </>
      
    </>
  )
}

export default CardSaleDetails;



