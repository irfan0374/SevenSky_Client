import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { addProperty } from '../../Api/partnerApi'
import { propertyValidationSchema } from '../../schema/Partnervalidation/PropertyValidation'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { FaTimes } from 'react-icons/fa';
import { addPropertyState } from '../../Redux/Slice/partnerSlice'
import { partnerLogout } from '../../Redux/Slice/partnerSlice'
import Loading from '../Loading/Loading'
import GoogleSearch from '../userComponent.js/googleSearch'

const AddPropertyModal = () => {

  const { _id } = useSelector(state => state.partnerReducer.partner)
  const partnerId = _id
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [propertyImage, setPropertyImage] = useState([])
  const [featureField, setFeatureField] = useState([[]])
  const [location,setLocation]=useState('')
  const handleAddLocation=(selectLocation)=>{
    setLocation(selectLocation.place_name)
  }

  const [propertyFor, setPropertyFor] = useState('')
  const [bhk, setBhk] = useState('')
  const onSubmit = async () => {
    try {
      setLoading(true)
      const res = await addProperty({ ...values, propertyImage, bhk, propertyFor, partnerId, featureField,location })
      if (res?.status === 200) {

        setLoading(false)
        const { _id } = res?.data.Property
        const parterId = _id
        dispatch(addPropertyState({
          propertystate: parterId
        })
        );
        document.getElementById('my_modal_4').close();
        navigate('/partner/partnerHome')
        toast.success(res.data.message)
      }else{
        setLoading(false)
      }


    } catch (error) {
      setLoading(false)
      console.log(error.message, "error in response")
    }
  }
  const { values, errors, touched, checked, getFieldProps, handleSubmit } = useFormik({
    initialValues: {
      type: "",
      propertyname: "",
      state: "",
      city: "",
      price: "",
      floor: "",
      bathroom: "",
      description: "",
      numberOfPeople: "",
    },

    onSubmit,
  })

  const handleRadioButton1 = e => {

    setPropertyFor(e.target.value)
  }
  const handleRadioButton2 = e => {

    setBhk(e.target.value)
  }




  const handleImage = (e) => {
    const maxlimit=5
    const file = Array.from(e.target.files)
    const sliceFiles=Array.from(file).slice(0,maxlimit)
    setImageToBase(sliceFiles)
  }

  const setImageToBase = (file) => {

    for (let i = 0; i < file.length; i++) {
      const reader = new FileReader()
      reader.readAsDataURL(file[i])
      reader.onloadend = () => {
        setPropertyImage((prev) => [...prev, reader.result])
      }
    }
  };

  const handleField = (e) => {
    e.preventDefault();
    setFeatureField([...featureField, ""]);
  };
  return (

    <>
      <dialog id="my_modal_4" className="modal">

        {loading ? (<Loading />) : (<div className="modal-box w-11/12 max-w-5xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2 ">
                <h1 className='font-bold flex justify-center py-4'>Tell us little about your property</h1>
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
                    className="form-radio text-blue-500 border-2 border-blue-500 focus:ring-blue-300"
                  />
                  <label for="propertyType1" className="block text-sm font-medium text-gray-900 dark:text-white">Rent/Lease</label>

                  <input
                    type="radio"
                    id="sale"
                    name="propertyFor"
                    value="sale"
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
                    required
                  >
                    <option value="" disabled selected>Select category</option>
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
               <GoogleSearch onLocationSelect={handleAddLocation}/>
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


              <div className="my-3  flex-col">
                <label
                  htmlFor="bhk"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  No. of Bedrooms
                </label>


                <div  >
                  <div className='space-x-3 ' >


                    <input
                      type="radio"
                      id="1rk"
                      name="bhk"
                      value="1rk"
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

                </div>
              </div>


              <div className='p-2 h-60'>
                <div className='overflow-hidden overflow-y-auto h-full'>
                  <label
                    htmlFor="bhk"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Features:
                  </label>
                  {featureField.map((value, index) => (
                    <div key={index} className='py-2 flex items-center'>
                      <input
                        type="text"
                        className="flex-grow bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder={`${index + 1}.Enter the feature of the property`}
                        name={`fetureField ${index + 1}`}
                        onChange={(e) => {
                          const existingField = [...featureField];
                          existingField[index] = e.target.value;
                          setFeatureField(existingField);
                        }}
                      />
                      <button
                        onClick={() => {
                          const existingField = [...featureField];
                          existingField.splice(index, 1);
                          setFeatureField(existingField);
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

                  className="block p-2.5 w-full h-16 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Add additional information"
                  defaultValue={""}
                />
              </div>



              <div className='flex flex-none items-center'>
                <div className="space-y-3">
                  <h1>Upload an image:
                    <span className="tooltip" data-tip="Select only 5 property images">
                      <button style={{ marginLeft: '8px' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" id="information">
                          <path fill="none" d="M0 0h24v24H0z"></path>
                          <path d="M11 18h2v-6h-2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-10h2V6h-2z"></path>
                        </svg>
                      </button>
                    </span>
                  </h1>


                  <input aria-describedby="file_input_help"
                    id="file_input"
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    multiple
                    required
                  />


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
        </div>)}
      </dialog>
    </>
  )
}

export default AddPropertyModal
