import React, { useEffect, useState } from 'react';
import NavBar from '../../Component/adminComponet.js/NavBar';
import ApprovalCard from '../../Component/adminComponet.js/ApprovalCard';
import { useParams } from 'react-router-dom';
import { findProperty } from '../../Api/adminApi';
import PropertyApprovalCard from '../../Component/adminComponet.js/PropertyApproval';
import Loading from '../../Component/Loading/Loading';

const PropertyApproval = () => {
    const [propertyData, setPropertyApproval] = useState(null);
    const { propertyId } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        findProperty(propertyId)
            .then((res) => {
                if (res.status === 200) {
                    setPropertyApproval(res?.data?.property);
                    setLoading(false);
                } else {
                    setError("Failed to fetch property data");
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.log(error.message);
                setError("An error occurred while fetching property data");
                setLoading(false);
            });
    }, [propertyId]);

    return (
        <>
            <NavBar />
            {loading ? (<Loading />) : error ?
                (<p>Error:{error}</p>) : propertyData ?
                    (<PropertyApprovalCard props={propertyData} />) :
                    (<p>No propertyData found</p>)}
        </>
    );
};

export default PropertyApproval;
