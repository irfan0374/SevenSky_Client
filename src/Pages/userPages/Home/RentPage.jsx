import React, { useEffect, useState } from 'react';
import MainCard from '../../../Component/CommonComponent/MainCard';
import Navbar2 from '../../../Component/userComponent.js/Navbar2';
import { rentProperty } from '../../../Api/userApi';
import Loading from '../../../Component/Loading/Loading';
import Footer from '../../../Component/CommonComponent/Footer';
import SideBarFilter from '../../../Component/userComponent.js/SideBarFilter';
import { Button, IconButton } from '@material-tailwind/react';
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const RentPage = () => {
  const [originalProperty, setOriginalProperty] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filterOption, setFilterOption] = useState({
    propertyType: { Flat: false, Appartment: false, House: false, Office: false },
  });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    rentProperty()
      .then((res) => {
        setOriginalProperty(res?.data?.rentProperty);
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const updatedFilteredProperty = originalProperty.filter((property) => {
      const { propertyType } = filterOption;
      const selectedPropertyType = Object.keys(propertyType).filter(
        (type) => propertyType[type]
      );
      const selectedTypeMatches =
        selectedPropertyType.length === 0 ||
        selectedTypeMatches.includes(property.propertyType);

      return selectedTypeMatches;
    });

    setFilteredProperties(updatedFilteredProperty);
  }, [filterOption, originalProperty]);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    let sortedProperties = [...filteredProperties];
    if (selectedValue === 'ascend') {
      sortedProperties.sort((a, b) => a.Price - b.Price);
    } else {
      sortedProperties.sort((a, b) => b.Price - a.Price);
    }

    console.log(sortedProperties, 'sortedProperties');
    setFilteredProperties(sortedProperties);
  };


  // Pagination logic
  const recordsPerPage = 3;
  const totalRecords = filteredProperties.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredProperties.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  return (
    <>
      <div className='mb-28'>
        <Navbar2 />
      </div>

      <div className='container flex items-baseline justify-between pl-4 mb-4'>
        <h4 className='text-3xl mt-5 font-bold text-gray-900'>
          Available Rent Property
        </h4>

        <select
          className='select select-bordered w-110px'
          onChange={handleSelectChange}
        >
          <option disabled defaultValue>
            Price
          </option>
          <option value='ascend'>Low - High</option>
          <option value='descend'>High - Low</option>
        </select>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className='grid grid-cols-1 lg:grid-cols-[25%,75%] mt-3 gap-1 px-2'>
          <SideBarFilter
            setProperty={setFilteredProperties}
            filterproperty={originalProperty}
          />

          <div className='lg:order-2 h-full overflow-y-auto border rounded-lg px-2 py-3 '>
            <div className='overflow-y-auto flex flex-wrap justify-center'>
              {currentRecords.length > 0 ? (
                currentRecords.map((data) => (
                  <MainCard key={data?._id} property={data} />
                ))
              ) : (
                <div className='flex justify-center'>
                  {currentRecords.length < 1 ? (
                    <div>
                      <img
                        src='/public/noProperty.png'
                        alt='No Property'
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              )}
            </div>
            <div className="container flex justify-center mt-4">
              <div className='flex gap-2'>
                <Button
                  variant='text'
                  className='flex gap-2'
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <ArrowLeftIcon strokeWidth={2} className='h-4 w-4' />Previous
                </Button>

                <div className="flex gap-2">
                  {pageNumbers.map((page) => (
                    <Button
                      key={page}
                      variant='text'
                      className={`flex gap-2 ${currentPage === page ? 'font-bold' : ''}`}
                      onClick={() => handlePageChange(page)}
                      disabled={currentPage === page}
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant='text'
                  className='flex item-center gap-2'
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next <ArrowRightIcon strokeWidth={2} className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default RentPage;
