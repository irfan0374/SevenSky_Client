import React, { useEffect, useState } from 'react'
import SideBarFilter from '../../Component/userComponent.js/SideBarFilter'
import MainCard from '../../Component/CommonComponent/MainCard'
import Footer from '../../Component/CommonComponent/Footer'
import { useLocation } from 'react-router-dom'
import Loading from '../../Component/Loading/Loading'
import Navbar2 from '../../Component/userComponent.js/Navbar2'
import SearchFilter from '../../Component/userComponent.js/SearchFilter'
import SelectedSearchFilter from '../../Component/userComponent.js/SelectedSearchFilter'

const SearchProperty = () => {
    const [loading,setLoading]=useState(false)
   const location= useLocation()
   const {searchProperty,values,typesofProperty}=location.state


   const [Property,setProperty]=useState(searchProperty)
   
   useEffect(() => {
    // This useEffect will re-run whenever searchProperty changes
    setProperty(searchProperty);
  }, [searchProperty]);

  return (
    <>
    <div className='mb-24'>
      <Navbar2 />
    </div>

    
    {loading ? (
      <Loading />
    ) : (
      <div>
        <SelectedSearchFilter selectedData={values} setLoading={setLoading} typesofProperty={typesofProperty} />
   
      <div className="grid grid-cols-1  mt-3 gap-1  px-2">
     
        <div className="lg:order-2 h-full overflow-y-auto border rounded-lg px-2 py-3 ">
          <div className="overflow-y-auto flex flex-wrap justify-center">
          {Property && Property.length > 0 ? (
            Property.map((property) => (
              <div key={property._id}>
                <MainCard property={property} />
              </div>
            ))
          ) : (
            <div className='flex flex-col justify-center items-center'>
            <img
              className='w-80 h-64 transition-transform transform hover:scale-105'
              src='/public/noProperty.png'
              alt='No Property Available'
            />
            <h1 className='text-2xl font-bold mx-12'>No Property Available</h1>
          </div>
          )}
      
          </div>
          
        </div>
      </div>
      </div>
    )}
    <Footer />
  </>
  )
}

export default SearchProperty
