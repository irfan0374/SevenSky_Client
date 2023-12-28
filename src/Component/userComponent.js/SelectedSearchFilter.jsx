import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import GoogleSearch from './googleSearch';
import { searchProperty } from '../../Api/userApi';


const SelectedSearchFilter = ({ selectedData, setLoading, typesofProperty }) => {
    const navigate = useNavigate()

    //   types of property for searchBox

    const [propertyFor, setforProperty] = useState(
        typesofProperty.propertyFor
    )
    const [propertyType, settypeProperty] = useState(
        typesofProperty.propertyType
    )

    // -------------------------

    //   selected data from props
    const [propertyfor, setPropertyfor] = useState(
        selectedData.propertfor
    );
    const [propertytype, setPropertyType] = useState(
        selectedData.propertytype
        );
        console.log(typesofProperty,"propertyForrr")
    const [selectedLocation, setSelectedLocation] = useState(
        selectedData.location
    )
    // --------------------------------
    const [location, setLocation] = useState(selectedLocation)

    const handleLocationSelect = (selectedLocation) => {
        setLocation(selectedLocation.place_name)
    }


    const onSubmit = async () => {
        try {
            setLoading(true)
            const result = await searchProperty({ ...values, location })
            if (result?.status === 201) {
                setLoading(false)
                navigate('/searchProperty', { state: { searchProperty: result?.data?.Property, values: { ...values, location }, typesofProperty: { propertyType, propertyFor } } });
            }
        } catch (error) {
            setLoading(false)
            toast.error(error?.response?.message)
            console.log(error.message)
        }
    };

    const { values, errors, handleSubmit, getFieldProps } = useFormik({
        initialValues: {
            propertytype: selectedData.propertytype,
            propertfor: selectedData.propertfor
        },
        onSubmit,
    })
    return (
        <>
            <form onSubmit={handleSubmit} className="max-w-screen-lg mx-auto shadow-lg rounded-lg">
                <div className="  bg-opacity-30 p-1 shadow-lg rounded-xl flex flex-col gap-3 border border-slate-100 p-2 ">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="pickUpLocation" className="text-blue-500 block mb-1">
                                Property location
                            </label>
                            <div className=''>
                                <GoogleSearch onLocationSelect={handleLocationSelect} prevLocation={location} />


                            </div>
                        </div>

                        <div>
                            <label htmlFor="propertyStatus" className="text-blue-500 block mb-2">
                                Property For
                            </label>
                            <select
                                name="propertfor"
                                className="select w-full max-w-xs select-bordered select-sm w-full max-w-xs"
                                value={values.propertfor}
                                {...getFieldProps("propertfor")}
                            >
                               
                                {propertyFor && propertyFor.map((data) => (
                                    <option key={data} value={data}>
                                        {data}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="propertyType" className="text-blue-500 block mb-2">
                                Property Type
                            </label>
                            <select
                                name="propertytype"
                                className="select select-bordered select-sm w-full max-w-xs"
                                value={values.propertytype}
                                {...getFieldProps("propertytype")}
                            >
                                
                                {propertyType && propertyType.map((data) => (
                                    <option key={data} value={data}>
                                        {data}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='flex justify-center'>

                        <button type="submit" className=" hover:btn-primary  bg-blue-400 bg-opacity-20  w-52 rounded-lg p-2 transition duration-500 ease-in-out">
                            Find your property
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default SelectedSearchFilter;
