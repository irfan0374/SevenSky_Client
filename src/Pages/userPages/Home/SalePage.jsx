import React,{useState,useEffect} from 'react'
import Navbar2 from '../../../Component/userComponent.js/Navbar2'
import MainCard from '../../../Component/CommonComponent/MainCard'
import { saleProperty } from '../../../Api/userApi'
import Loading from '../../../Component/Loading/Loading'
import Footer from '../../../Component/CommonComponent/Footer'
import { Button, IconButton } from '@material-tailwind/react';
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

import SideBarFilter from '../../../Component/userComponent.js/SideBarFilter'
const SalePage = () => {
    const [loading,setLoading]=useState(true)
    const [originalProperty,setOriginalProperty]=useState([])
    const[filteredProperty,setFilteredProperty]=useState([])
    const [filterOption,setFilterOption]=useState({
      propertyType:{
        Flat:false,Appartment:false,House:false,Ofice:false
      }
    });
    useEffect(()=>{
        saleProperty().then((res)=>{
          setOriginalProperty(res?.data?.saleProperty)

        }).catch((error)=>{
            console.log(error.message)
        }).finally(()=>{
            setLoading(false)
        })
    },[])


    // filter price low to hight and high to low
  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    let sortedProperties=[...filteredProperty]
if(selectedValue==="ascend"){
   sortedProperties.sort((a,b)=>a.Price-b.Price)
}else{
  sortedProperties.sort((a,b)=>b.Price-a.Price)
}

console.log(sortedProperties,"sortedProperties")
setFilteredProperty(sortedProperties)
  };

// --------------------------------------------------


// pagination logic

const [currentPage,setCurrentPage]=useState(1)
const recordPerPage=3
const totalRecords=filteredProperty.length
const totalPages=Math.ceil(totalRecords/recordPerPage)
const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
};
const indexOfLastRecord = currentPage * recordPerPage;
const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
const currentRecords = filteredProperty.slice(
  indexOfFirstRecord,
  indexOfLastRecord
);



// -----------------


    useEffect(()=>{

      const updatedFilterProperty=originalProperty.filter((property)=>{
        const {propertyType}=filterOption;
        const selectedPropertyType=Object.keys(propertyType).filter((type)=>propertyType[type]);
        const selectedTypeMatches=
        selectedPropertyType.length===0||selectedPropertyType.includes(property.propertyType)
        return selectedTypeMatches
      })
    },[filterOption,originalProperty])
  return (
    <>
        <div className='mb-28'>
        <Navbar2 />
      </div>

      <div className="container flex items-baseline justify-between pl-4 mb-4">
        <h4 className="text-3xl mt-5 font-bold text-gray-900">
        </h4>

        <select
          className="select select-bordered w-110px]  "
          onChange={handleSelectChange}
        >
          <option disabled defaultValue>
            Price
          </option>
          <option value="ascend">Low - High</option>
          <option value="descend">High - Low</option>
        </select>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className='grid grid-cols-1 lg:grid-cols-[25%,75%] mt-3 gap-1 px-2'>
          <SideBarFilter setProperty={setFilteredProperty} filterproperty={originalProperty} />

          <div className='lg:order-2 h-full overflow-y-auto border rounded-lg px-2 py-3 '>
            <div className='overflow-y-auto flex flex-wrap justify-center'>
              {filteredProperty.map((data) => (
                <MainCard key={data?._id} property={data} />
              ))}
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

   
  )
}

export default SalePage
