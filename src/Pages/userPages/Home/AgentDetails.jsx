import React, { useEffect,useState } from 'react'
import AgentCard from '../../../Component/userComponent.js/AgentCard'
import Navbar2 from '../../../Component/userComponent.js/Navbar2'
import SentMailCard from '../../../Component/userComponent.js/sentMailCard'
import { findPartner, findUser } from '../../../Api/userApi'
import { useParams } from 'react-router-dom'
import Loading from '../../../Component/Loading/Loading'



const AgentDetails = () => {
  const { partnerId } = useParams()
  const [partnerdata, setPartnerData] = useState()
  const [loading, setLoading] = useState(false)



  useEffect(() => {
    setLoading(true)
    findPartner(partnerId).then((res) => {
      setLoading(false)
      setPartnerData(res?.data?.Partner)
    }).catch((error) => {
      setLoading(false)
      console.log(error.message)
    })
  }, [partnerId])
  return (
    <>
    <div className='mb-28'>
      <Navbar2 />
      </div>
      {loading ? (<Loading />) : (
        <div>
          <AgentCard partnerdata={partnerdata} />
          <SentMailCard partnerId={partnerId}/>
        </div>
      )}


    </>
  )
}

export default AgentDetails
