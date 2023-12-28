import React, { useEffect, useState, useRef } from 'react';
import GoogleSearch from './googleSearch';
import { getThePropertyType, searchProperty } from '../../Api/userApi';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SearchFilter = () => {
  const navigate = useNavigate();
  const [propertyFor, setPropertyfor] = useState([]);
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState([]);
  const [showInput, setShowInput] = useState(false); // State to track whether to show the regular input
  const containerRef = useRef(null); // Ref to the container element

  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation.place_name);
  };

  const showInputField = () => {
    setShowInput(true);
  };

  const closeInputField = (e) => {
    // Check if the click is outside the container
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setShowInput(false);
    }
  };

  const onSubmit = async () => {
    try {
      const result = await searchProperty({ ...values, location });
      if (result?.status === 201) {
        navigate('/searchProperty', {
          state: { searchProperty: result?.data?.Property, values: { ...values, location }, typesofProperty: { propertyType, propertyFor } },
        });
      }
    } catch (error) {
      toast.error(error?.response?.message);
      console.log(error.message);
    }
  };

  const { values, errors, handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      propertytype: '',
      propertfor: '',
    },
    onSubmit,
  });

  const TypesofProperty = async () => {
    try {
      const res = await getThePropertyType();
      if (res?.status === 200) {
        setPropertyfor(res?.data?.propertyFor);
        setPropertyType(res?.data?.propertyType);
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error.message);
    }
  };

  useEffect(() => {
    TypesofProperty();

    // Add event listener for clicks outside the container
    document.addEventListener('click', closeInputField);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('click', closeInputField);
    };
  }, []);

  return (
    <>
      <form ref={containerRef} onSubmit={handleSubmit} className="max-w-screen-xl mx-auto shadow-lg">
        <div className="bg-white/30 p-8 shadow-lg rounded-xl flex flex-col gap-8 border border-slate-100 backdrop:blur-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <label htmlFor="pickUpLocation" className="text-blue-500 block mb-2">
                Property location
              </label>
              <div className={`transition-opacity duration-500 ease-in-out ${showInput ? '' : 'hidden'}`}>
                <GoogleSearch onLocationSelect={handleLocationSelect} />
              </div>
              <div className={`transition-opacity duration-500 ease-in-out ${showInput ? 'hidden' : ''}`}>
                <input
                  type="text"
                  name="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter location"
                  className="input md:w-60 md:h-5  sm:h-20 mediumSm:h-12 mediumSm:w-60"
                  onClick={showInputField}

                />
              </div>
            </div>

            <div>
              <label htmlFor="propertyStatus" className="text-blue-500 block mb-2">
                Property For
              </label>
              <select
                name="propertfor"
                className="select w-full max-w-xs"
                {...getFieldProps('propertfor')}
                required=""
              >
                <option value="">Pick the purpose</option> {/* Remove 'selected' from here */}
                {propertyFor.map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </select>
              {/* <select
                name="propertfor"
                className="select w-full max-w-xs"
                {...getFieldProps('propertfor')}
                required=""
              >
                <option selected>Pick the purpose</option>
                {propertyFor.map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </select> */}
              {errors.propertfor && <p className="text-red-500 text-sm mt-1">{errors.propertfor}</p>}
            </div>

            <div>
              <label htmlFor="propertyType" className="text-blue-500 block ">
                Property Type
              </label>
              <select
                name="propertytype"
                className="select w-full max-w-xs "
                {...getFieldProps('propertytype')}
               
                required=""
              >
                <option value="">Pick the property Type</option> 
                {propertyType.map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </select>
              {errors.propertytype && <p className="text-red-500 text-sm mt-1">{errors.propertytype}</p>}
            </div>
          </div>

          <button type="submit" className="btn-primary rounded-lg p-2">
            Find your property
          </button>
        </div>
      </form>
    </>
  );
};

export default SearchFilter;
