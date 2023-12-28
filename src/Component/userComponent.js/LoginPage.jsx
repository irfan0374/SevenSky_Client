import React, { useState, useRef, useEffect } from 'react'
import { useFormik } from 'formik'
import { useNavigate, Link, Form } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginSchema } from '../../schema/loginValidation'
import { userlogin } from '../../Api/userApi'
import { useDispatch } from "react-redux";
import { userLogin } from '../../Redux/Slice/userSlice'
import GoogleButtonUser from "../../assets/googleLogin/UserGoogleLogin";


const LoginPage = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()

 
  
  const { values, errors, touched, getFieldProps, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: loginSchema,
    onSubmit

  })
  async function onSubmit() {
    try {
      const res = await userlogin(values)
      if(res?.status==200){
        const {token,User}=res.data
        localStorage.setItem("usertoken",token);
        dispatch(
          userLogin({
            token: token,
            user: User,
          })
        );

        toast.success(res?.data?.message)
        navigate("/")
      }

    } catch (error) {
      console.log(error.message,"response in error")
      toast.error(error.response?.data?.message);
    }

  }
  


  return (
    <>
      <div>
        <div className="container mx-auto ">
          <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
            <div
              className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
              style={{
                backgroundImage: "url(/public/loginImage/image1.jpg)",
              }}
            >
              {/* <h1 className="text-gray-400 text-3xl mb-3">
                Welcome to nestWay
              </h1>
              <div>
                <p className="text-black">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean

                </p>
              </div> */}
            </div>
            <div className="w-full lg-w-1/2 py-16 px-12">
              <div className="pb-2">
                <a href="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 inline-block mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <span className="text-blue-600 font-sans font-light">Return Home</span>
                </a>
              </div>
              <h2 className="text-3xl mb-4 text-black font-serif font-semibold ">User Login</h2>
              <form onSubmit={handleSubmit}>
                <div className=''>

                
                <div className="mt-5">
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="border border-gray-400 rounded-lg shadow py-2 px-4 w-full"
                    {...getFieldProps("email")}
                  />
                  {errors.email && touched.email && <p className='text-red-800'>{errors.email}</p>}
                </div>
                <div className="mt-5">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="border border-gray-400 rounded-lg shadow-md py-2 px-4 w-full"
                    {...getFieldProps("password")}
                  />
                  {errors.password && touched.password && <p className='text-red-800'>{errors.password}</p>}
                </div>

                <div className="mt-5">
                  <button type='submit' className="w-full bg-blue-500 py-3 text-center text-white rounded-lg shadow-md">
                    Login
                  </button>
                </div>
                </div>
                </form>
                <div className="flex items-center justify-center mt-2 dark:bg-gray-800">
                <GoogleButtonUser/>
                </div>

                <div className="mt-3">
                  <p>
                    <Link to={"/forgotPassword"} className="text-purple-500">
                      Forgot Password?
                    </Link>
                  </p>
                </div>
                
              
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
