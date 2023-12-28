import React, { useState, useEffect } from 'react'
import Navbar from "../../Component/adminComponet.js/NavBar"
import ApprovalCard from '../../Component/adminComponet.js/ApprovalCard'
import { useParams } from 'react-router-dom'
import { findPartner } from '../../Api/adminApi'
import Loading from '../../Component/Loading/Loading'

const kycUpload = () => {
    const [partnerdata, setPartnerData] = useState()
    const { partnerId } = useParams()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        findPartner(partnerId)
            .then((res) => {
                setPartnerData(res?.data?.partnerGet)

            }).catch((error) => {
                console.log(error.message)

            }).finally(() => {
                setLoading(false)
            })
    }, [partnerId])

    return (
        <>
            <Navbar />
            {loading ? (<Loading/>) : (<ApprovalCard props={partnerdata} />)}
        </>
    )
}

export default kycUpload
