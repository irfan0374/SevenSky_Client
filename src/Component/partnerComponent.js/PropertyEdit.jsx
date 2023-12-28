import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaTimes } from 'react-icons/fa';
import Loading from '../Loading/Loading'
import { findProperty, updateProperty, deleteImage } from '../../Api/partnerApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const PropertyEdit = () => {

    // const [featureField, setFeatureField] = useState([[]])
    const navigate = useNavigate()


    const { propertyId } = useParams()

    const [loading, setLoading] = useState(false)
    const [ImageLoading, setImageLoading] = useState(false)
    const [propertyImage, setPropertyImage] = useState([])
    const [data, setData] = useState()
    const [featureData, setFeatureData] = useState([])
    const [selectedImages, setSelectedImage] = useState([])
    const [squareFeet, setsquareFeet] = useState()
    const [oldImage, setOldImage] = useState()

    // error state 
    const [propertyImageError, setPropertyImageError] = useState()

    const handleField = (e) => {
        e.preventDefault()
        setFeatureData([...featureData, ""])
    }

    const handleRadioButton1 = e => {

        setPropertyFor(e.target.value)
    }
    const handleRadioButton2 = e => {

        setBhk(e.target.value)
    }
    const handleImageUpdate = () => {
        const files = Array.from(event.target.files)
       
        const isValid = files.every((file) =>
            file.type.startsWith("image/jpeg") || file.type.startsWith("image/png")
        )
        if (isValid) {
          
            setPropertyToBase(files)
            setPropertyImageError(null)
        } else {
            setPropertyImageError("Invalid file type please select correct file")
            event.target.value = null;
        }
        const newImage = files.map((file) => URL.createObjectURL(file))
      
        const allImage = [...newImage, ...data.propertyImage]
        const maxlimit=5
        const file = Array.from(allImage)
        const sliceFiles=Array.from(file).slice(0,maxlimit)

        setSelectedImage(sliceFiles)

    }
    const setPropertyToBase = async (files) => {
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader()
            reader.readAsDataURL(files[i])
            reader.onloadend = () => {
                setPropertyImage((prev => [...prev, reader.result]))
               
            }
        };
    };

    const handleDeleteImage = async (imgSrc) => {

        try {
            setImageLoading(true)
            console.log(imgSrc,"image")
            const res = await deleteImage(imgSrc, data._id)
            if (res.status === 200) {
                setData(res?.data?.updateData)
            }
            setImageLoading(false)

        } catch (error) {
            console.log(error.message);
            setImageLoading(false)
        }
    }




    const [bhk, setBhk] = useState()
    const [propertyFor, setPropertyFor] = useState()



    useEffect(() => {
        setLoading(true)

        findProperty(propertyId)
            .then((res) => {
                setData(res?.data?.Property)
                setFeatureData(res?.data?.Property?.features)
                setPropertyFor(res?.data?.Property.propertyFor)
                setBhk(res?.data?.Property.propertyBHK)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error.message)
                setLoading(false)
            })

    }, [propertyId])



    const { values, errors, touched, handleSubmit, getFieldProps } = useFormik({
        initialValues: {
            type: data?.propertyType,
            propertyname: data?.propertyName,
            state: data?.state,
            city: data?.city,
            price: data?.Price,
            floor: data?.floor,
            bathroom: data?.bathroom,
            description: data?.description,
            location: data?.location,
            numberOfPeople: data?.personCanStay,
            squareFeet: data?.square_feet,
        },
        onSubmit,
        enableReinitialize: true,
    })


    async function onSubmit() {

        try {
            setLoading(true)
            console.log(propertyImage, "hello")
            const res = await updateProperty({ ...values, featureData, propertyImage, bhk, propertyFor }, propertyId)
            if (res?.status === 200) {
                console.log(res?.data?.Property,"eheh")
                setData(res?.data?.Property)
                setLoading(false)
                navigate('/partner/propertyDetail',{state:{data:propertyId ,role:"partner"}})



            }
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <>
            {loading ? (<Loading />) : (
                <div className="min-h-screen bg-gray-100 p-0 sm:p-12">
                    <div className="mx-auto max-lg px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl">
                        <h1 className="text-2xl font-bold mb-8">Edit your property</h1>

                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="grid gap-3 sm:grid-cols-2 sm:gap-6">
                                <div className="sm:col-span-2 ">

                                    <div className="flex items-center space-x-8 mb-4">
                                        <div>
                                            Property for*
                                        </div>
                                        <input
                                            type="radio"
                                            id="rent"
                                            name="propertyFor"
                                            value="rent"
                                            required
                                            onChange={e => handleRadioButton1(e)}
                                            defaultChecked={propertyFor === "rent"}
                                            className="form-radio text-blue-500 border-2 border-blue-500 focus:ring-blue-300"
                                        />
                                        <label for="propertyType1" className="block text-sm font-medium text-gray-900 dark:text-white">Rent/Lease</label>

                                        <input
                                            type="radio"
                                            id="sale"
                                            name="propertyFor"
                                            value="sale"
                                            defaultChecked={propertyFor === "sale"}
                                            onChange={e => handleRadioButton1(e)}
                                            className="form-radio text-blue-500 border-2 border-blue-500 focus:ring-blue-300"
                                        />
                                        <label for="propertyType2" className="block text-sm font-medium text-gray-900 dark:text-white">Sell</label>
                                    </div>
                                    <div className='my-3'>
                                        <label
                                            htmlFor="type"
                                            className="block text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Property type
                                        </label>
                                        <select
                                            id="type"
                                            name="type"
                                            {...getFieldProps("type")}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        >
                                            <option selected="">Select category</option>
                                            <option value="Flat">Flat</option>
                                            <option value="Appartment">Appartment</option>
                                            <option value="House">Independent/House</option>
                                            <option value="Office">Office Space</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Property Name
                                    </label>
                                    <input
                                        type="text"
                                        name="propertyname"
                                        id="name"
                                        {...getFieldProps("propertyname")}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Property name"
                                        required=""
                                    />
                                </div>
                                {/* ============= */}


                                <div className="w-full">
                                    <label
                                        htmlFor="state"
                                        className="block text-sm font-medium text-gray-900 dark:text-white"
                                    >

                                        State
                                    </label>
                                    <input
                                        type="text"
                                        name="state"
                                        id="state"
                                        {...getFieldProps("state")}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Enter the state"
                                        required=""
                                    />
                                </div>

                                <div className="w-full">
                                    <label
                                        htmlFor="city"
                                        className="block text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        id="city"
                                        {...getFieldProps("city")}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Enter the city"
                                        required=""
                                    />
                                </div>
                                <div className="w-full">
                                    <label
                                        htmlFor="city"
                                        className="block text-sm font-medium text-gray-900 dark:text-white"
                                    >

                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        id="location"
                                        {...getFieldProps("location")}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Enter the exact location"
                                        required=""
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="Property-floor"
                                        className="block text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Property of floor
                                    </label>
                                    <input
                                        type="number"
                                        name="floor"
                                        id="floor"
                                        {...getFieldProps("floor")}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder={1}
                                        required=""
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="Property-floor"
                                        className="block text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        no.of Bathroom
                                    </label>
                                    <input
                                        type="number"
                                        name="bathroom"
                                        id="bathroom "
                                        {...getFieldProps("bathroom")}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder={1}
                                        required=""
                                    />
                                </div>
                                <div className="w-full">
                                    <label
                                        htmlFor="price"
                                        className="block  text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Expected Price
                                    </label>
                                    <input
                                        type="price"
                                        name="price"
                                        id="price"
                                        {...getFieldProps("price")}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="₹2999"
                                        required=""
                                    />
                                </div>


                                <div className="my-3 flex flex-col">
                                    <label
                                        htmlFor="bhk"
                                        className="block text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        No. of Bedrooms
                                    </label>


                                    <div >
                                        <div className='space-x-4'>


                                            <input
                                                type="radio"
                                                id="1rk"
                                                name="bhk"
                                                value="1rk"
                                                checked={bhk === "1rk"}
                                                onChange={e => handleRadioButton2(e)}

                                                className="form-radio text-blue-500 border-2 border-blue-500 focus:ring-blue-300"
                                            />
                                            <label htmlFor="1rk" className="text-gray-700">
                                                1RK
                                            </label>
                                            <input
                                                type="radio"
                                                id="1bhk"
                                                name="bhk"
                                                value="1bhk"
                                                checked={bhk === "1bhk"}
                                                onChange={e => handleRadioButton2(e)}
                                                className="form-radio text-blue-500 border-2 border-blue-500 focus:ring-blue-300"
                                            />
                                            <label htmlFor="1bhk" className="text-gray-700">
                                                1BHK
                                            </label>
                                            <input
                                                type="radio"
                                                id="2bhk"
                                                name="bhk"
                                                value="2bhk"
                                                checked={bhk === "2bhk"}
                                                onChange={e => handleRadioButton2(e)}
                                                className="form-radio text-blue-500 border-2 border-blue-500 focus:ring-blue-300"
                                            />
                                            <label htmlFor="2bhk" className="text-gray-700">
                                                2BHK
                                            </label>
                                            <input
                                                type="radio"
                                                id="3bhk"
                                                name="bhk"
                                                value="3bhk"
                                                checked={bhk === "3bhk"}
                                                onChange={e => handleRadioButton2(e)}
                                                className="form-radio text-blue-500 border-2 border-blue-500 focus:ring-blue-300"
                                            />
                                            <label htmlFor="3bhk" className="text-gray-700">
                                                3BHK
                                            </label>
                                            <input
                                                type="radio"
                                                id="4bhk"
                                                name="bhk"
                                                value="4bhk"
                                                checked={bhk === "4bhk"}
                                                onChange={e => handleRadioButton2(e)}
                                                className="form-radio text-blue-500 border-2 border-blue-500 focus:ring-blue-300"
                                            />
                                            <label htmlFor="4bhk" className="text-gray-700">
                                                4BHK
                                            </label>

                                        </div>
                                        <div>
                                            <div className='my-8' >
                                                <label
                                                    htmlFor="numberOfPeople"
                                                    className="block text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Number of People
                                                </label>
                                                <input
                                                    type="number"
                                                    name="numberOfPeople"
                                                    id="numberOfPeople"
                                                    {...getFieldProps("numberOfPeople")}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    placeholder="No.of people can allowed to stay"
                                                    required=""
                                                />
                                            </div>

                                        </div>
                                        <div>
                                            <div className='my-8' >
                                                <label
                                                    htmlFor="square feet"
                                                    className="block text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    square feet
                                                </label>
                                                <input
                                                    type="number"
                                                    name="square feet"
                                                    id="square feet"
                                                    {...getFieldProps("numberOfPeople")}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    placeholder="No.of people can allowed to stay"
                                                    required=""
                                                />
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className='p-2 h-60'>
                                    <div className='overflow-hidden overflow-y-auto h-full'>
                                        <label
                                            htmlFor="feature"
                                            className="block text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Features:
                                        </label>
                                        {featureData.map((value, index) => (
                                            <div key={index} className='py-2 flex items-center'>
                                                <input
                                                    type="text"
                                                    className="flex-grow bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    placeholder={`${index + 1}.Enter the feature of the property`}
                                                    name={`fetureField ${index + 1}`}
                                                    value={value}
                                                    onChange={(e) => {
                                                        const existingField = [...featureData];
                                                        existingField[index] = e.target.value;
                                                        setFeatureData(existingField);
                                                    }}
                                                />
                                                <button
                                                    onClick={() => {
                                                        const existingField = [...featureData];
                                                        existingField.splice(index, 1);
                                                        setFeatureData(existingField);
                                                    }}
                                                    className=" pr-4 py-2 text-black rounded-lg flex items-center"
                                                >
                                                    <FaTimes />
                                                </button>
                                            </div>
                                        ))}
                                        <button onClick={(e) => handleField(e)} className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg">
                                            Add
                                        </button>
                                    </div>
                                </div>


                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="description"
                                        className="block text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={8}
                                        {...getFieldProps("description")}

                                        className="block p-2.5 w-full h-24 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Add additional information"
                                        defaultValue={""}
                                    />
                                </div>



                                <div className='flex flex-none items-center'>
                                    <div className="space-y-3">
                                        <div>

                                            <div className='my-2'>


                                                <h1>Upload an image:<span className="tooltip" data-tip="Select only 5 property images">
                                                    <button style={{ marginLeft: '8px' }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" id="information">
                                                            <path fill="none" d="M0 0h24v24H0z"></path>
                                                            <path d="M11 18h2v-6h-2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-10h2V6h-2z"></path>
                                                        </svg>
                                                    </button>
                                                </span></h1>
                                            </div>


                                            <input aria-describedby="file_input_help"
                                                className='mb-5'
                                                id="file_input"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpdate}
                                                multiple
                                            />
                                            {ImageLoading ? (<div className="flex w-24 h-24 mx-36">
                                                <span className="loading loading-spinner text-info"></span>
                                                <span className="loading loading-spinner text-info"></span>
                                                <span className="loading loading-spinner text-info"></span>
                                            </div>) : (
                                                <div className="flex space-x-2">
                                                    {selectedImages.length > 0
                                                        ? selectedImages.map((imageURL, index) => (

                                                            <div key={index} className="relative">
                                                                <img
                                                                    src={imageURL}
                                                                    alt={`property Image ${index + 1}`}
                                                                    className="w-24 h-24 object-cover rounded"
                                                                />
                                                                
                                                            </div>
                                                        ))
                                                        : data?.propertyImage &&
                                                        data?.propertyImage.map((imageURL, index) => (
                                                            <div key={index} className="relative">
                                                                <img
                                                                    src={imageURL}
                                                                    alt={`Property Image ${index + 1}`}
                                                                    className="w-24 h-24 object-cover rounded"
                                                                />
                                                                <button
                                                                    onClick={() => {
                                                                        handleDeleteImage(imageURL);
                                                                    }}
                                                                    className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full cursor-pointer"
                                                                >
                                                                    <FontAwesomeIcon icon={faTrash} />
                                                                </button>
                                                            </div>
                                                        ))}
                                                </div>)}


                                        </div>
                                        <button
                                            type="submit"
                                            className="bn54 relative outline-none text-decoration-none rounded-full flex justify-center items-center cursor-pointer uppercase h-12 w-40 opacity-100 bg-white border border-black border-opacity-60 transition duration-400 ease-in-out transform hover:rotate-6 hover:translate-x-2"
                                        >
                                            <span className="bn54span font-sans text-black text-sm font-medium tracking-wide">
                                                Submit
                                            </span>
                                        </button>



                                    </div>
                                </div>
                            </div>

                        </form>


                    </div >
                </div >

            )}
        </>


    )
}
export default PropertyEdit
