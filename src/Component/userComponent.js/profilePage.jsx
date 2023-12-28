import React, { useEffect, useState } from 'react'
import { findUser } from '../../Api/userApi'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { updateProfile } from '../../Api/userApi'
import { editProfile } from '../../schema/editProfile'
import Loading from '../Loading/Loading'
import { updataImage } from '../../Api/userApi'

const ProfilePage = () => {
  const [profile, setProfile] = useState()
  const [loading, setLoading] = useState(false)
  const [loading1, setLoading1] = useState(false)
  const [loading2, setLoading2] = useState(false)

  const [err, setErr] = useState(false)
  const [image, setImage] = useState()
  const user = useSelector((state) => state.userReducer.user)
  const userId = user._id;
  useEffect(() => {
    setLoading(true)
    findUser(userId).then((res) => {
      setLoading(false)
      setProfile(res?.data?.User)
    }).catch((error) => {
      setLoading(false)
      console.log(error.message)
    })
  }, [])

  const { values, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      name: profile?.name,
      phone: profile?.phone,
    },
    validationSchema: editProfile,
    onSubmit,
    enableReinitialize: true
  });



  async function onSubmit() {
    try {
      setLoading1(true)
      const res = await updateProfile({ ...values, userId })
      if (res?.status === 200) {

        setProfile(res?.data?.User)
      }
      setLoading1(false)

    } catch (error) {
      console.log(error.message)
      setLoading1(false)
    }
  };
  const handleImage = (e) => {
    const file = e.target.files[0]
    profileIMageToBase(file, userId)
  }
  const profileIMageToBase = async (file, userId) => {
    const reader = new FileReader();

    reader.onloadend = async () => {
      const imageData = reader.result; // Get the base64-encoded image data
      setImage(imageData);

      try {
        setLoading2(true)
        const res = await updataImage(imageData, userId);
        if (res.status === 200) {

          setProfile(res?.data?.User)
          setLoading2(false)
        }

      } catch (error) {
        console.log(error.message);
      }
    };

    reader.readAsDataURL(file);
  };


  return (
    <>
      {loading ? (<Loading />) : (
        <div className=' flex flex-col  md:mx-28 container items-center '>
          <div className=' w-3/4 lg:w-2/5 h-screen'>
            <div className= " w-52 py-3 mx-9 lg:mx-32 flex items-center rounded-md">
              <label htmlFor="fileInput" className="cursor-pointer w-4/5">
                {loading2 ? (

                  <div className="rounded-full object-cover w-36 h-36">

                    <div className="w-12 h-12 rounded-full border-8 border-solid border-blue-700 border-t-transparent animate-spin"></div>

                  </div>

                ) : ( <div className='flex'>
                 
                  <img
                  src=
                  {profile?.profile ? profile?.profile : "/public/Account.png"}

                  className={"rounded-full object-cover w-56 h-40 lg:w-36 lg:h-36"}
                  alt=""
                />
                 </div>)}

              </label>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImage}
              />
            </div>
            <div >
              <form onSubmit={handleSubmit} >
                <div className=" z-0 w-full mb-3 group">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >Username:
                  </label>
                  <input
                    type="name"
                    name="name"
                    value={values?.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=""
                    required=""
                  />


                </div>
                <div className="relative z-0 w-full mb-3 group">
                  <label
                    htmlFor="name"
                    className="block flex items-center text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email:
                    <div className="tooltip" data-tip="Can't Change Email">
                      <button style={{ marginLeft: '8px' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" id="information">
                          <path fill="none" d="M0 0h24v24H0z"></path>
                          <path d="M11 18h2v-6h-2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-10h2V6h-2z"></path>
                        </svg>
                      </button>
                    </div>
                  </label>


                  <input
                    type="email"
                    name="floating_email"
                    id="floating_email"
                    defaultValue={profile?.email}
                    className="block py-2.5 px-0 w-full text-sm text-gray-400 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=""
                    required=""
                  />

                </div>
                <div className="relative z-0 w-full mb-3 group">
                  <label
                    htmlFor="name"
                    className="block  text-sm font-medium text-gray-900 dark:text-white"
                  >Phone No:
                  </label>
                  <input
                    type="number"
                    name="phone"

                    value={values?.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=""
                    required=""
                  />


                </div>

                <div className='flex justify-center'>
                  {loading1 ? (<div className="flex">
                    <span className="loading loading-spinner text-info"></span>
                    <span className="loading loading-spinner text-info"></span>
                    <span className="loading loading-spinner text-info"></span>
                  </div>) : (<button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
                  >
                    Edit Details
                  </button>)}
                </div>
              </form>

            </div>
          </div>
        </div>)

      }
    </>
  )
}

export default ProfilePage
