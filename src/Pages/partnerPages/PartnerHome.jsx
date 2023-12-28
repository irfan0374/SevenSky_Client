import React, { useEffect, useState } from 'react';
import Navbar from '../../Component/partnerComponent.js/Navbar';
import PartnerCard from '../../Component/partnerComponent.js/PartnerCard';
import { listProperty } from '../../Api/partnerApi';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../Component/Loading/Loading';

import { Button, IconButton } from '@material-tailwind/react';
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const PartnerHome = () => {
  const { _id } = useSelector((state) => state.partnerReducer.partner);
  const [loading, setLoading] = useState(false)
  const partnerId = _id;
  const [myProperty, setProperty] = useState([]);
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1)
  const propertystate = useSelector((state) => state.partnerReducer.propertystate)


  useEffect(() => {
    setLoading(true)
    listProperty(partnerId)
      .then((res) => {
        setProperty(res?.data?.Property);
        setLoading(false)

      })
      .catch((error) => {
        console.lo(error.message);
        if (error.response?.status) {
          navigate('/partner/login');
          toast.error(error.response?.data?.message);
        }
      });
  }, [partnerId]);

  useEffect(() => {
    setLoading(true)
    listProperty(partnerId)
      .then((res) => {
        setProperty(res?.data?.Property);
        setLoading(false)

      })
      .catch((error) => {
        console.error(error.message);
        if (error.response?.status) {
          navigate('/partner/login');
          toast.error(error.response?.data?.message);
        }
      });

  }, [propertystate])

  const recordPerPage = 2
  const firstIndex = (currentPage - 1) * recordPerPage
  const lastIndex = firstIndex + recordPerPage
  const records = myProperty.slice(firstIndex, lastIndex)

  const number = Array.from({ length: Math.ceil(myProperty.length / recordPerPage) }, (_, index) => index + 1)

  const handleSetActive = (index) => {
    setCurrentPage(index)
  }

  const prev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const next = () => {
    if (currentPage < Math.ceil(myProperty.length / recordPerPage)) {
      setCurrentPage(currentPage + 1)
    }
  }
  const getItemProps = (index) => ({
    variant: currentPage === index ? "filled" : "text",
    color: "gray",
    onClick: () => handleSetActive(index),
  });

  const filtered = searchInput
    ? myProperty.filter((property) =>
      property.name.toLowerCase().includes(searchInput.toLowerCase())
    )
    : records;

  return (
    <>
      <Navbar />
      <div className='font-bold text-2xl m-4 '>My property</div>
      <div>


        {loading ? (
          <Loading />
        ) : (
          <div className=' flex flex-row'>
            {filtered.length > 0 ? (
              filtered.map((data) => (
                <div className='' key={data._id} onClick={() => navigate('/partner/propertyDetail', { state: { data: data._id, role: "partner" } })}>
                  <PartnerCard imgsrc={data.propertyImage[0]}>
                    <h1>{data.propertyName}</h1>
                    <p>{data.propertyFor}</p>
                  </PartnerCard>
                </div>
              ))
            ) : (
              <div className=' mx-20 mediumSm:mx-64' >

                <img src="/public/noProperty.png" className='w-52 h-32 lg:w-72 lg:h-56 lg:mx-48 ' alt="No Property" />
                
              </div> 
            )}
          </div>
        )}

        {/* pagination start */}

        <div className="container flex justify-center mt-4">
          <div className='flex gap-2'>
            <Button
              variant='text'
              className='flex gap-2'
              disabled={currentPage === 1}
              onClick={prev}

            >
              <ArrowLeftIcon strokeWidth={2} className='h-4 w-4' />Previous
            </Button>

            <div className="flex gap-2">
              {number.map(page => (
                <IconButton key={page}

                  {...getItemProps(page)}>{page}</IconButton>
              ))}
            </div>
            <Button
              variant='text'
              className='flex item-center gap-2'
              onClick={next}
              disabled={currentPage === Math.ceil(myProperty.length / recordPerPage)}
            >
              Next <ArrowRightIcon strokeWidth={2} className='h-4 w-4' />
            </Button>


          </div>
        </div>
        {/* pagination end */}

      </div>
    </>
  );
};

export default PartnerHome;
