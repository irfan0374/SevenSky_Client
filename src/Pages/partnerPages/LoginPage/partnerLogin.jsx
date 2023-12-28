import React, { useState, useRef, useEffect } from 'react'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginSchema } from '../../../schema/loginValidation'
import { loginVerification } from '../../../Api/partnerApi'
import { partnerLogin } from '../../../Redux/Slice/partnerSlice'
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

const PartnerLoginComponent = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { errors, values, touched, getFieldProps, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: loginSchema,
    onSubmit
  })
  async function onSubmit() {
    try {
      const res = await loginVerification(values)
      if (res?.status == 200) {

        const { Partner, token } = res.data;
        localStorage.setItem("partnerToken", token)

        dispatch(
          partnerLogin({
            token: token,
            partner: Partner
          })
        );
        toast.success(res?.data?.message);
        navigate("/partner/partnerHome");
      }

    } catch (error) {
      res.status(400).json({ message: "internal server Error" })
      console.log(error.message)
    }
  }

  return (
    <>
      <div>
        <div className="container mx-auto ">
          <div className="flex flex-col lg:flex-row w-12/12 lg:w-7/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
            <div
              className="w-full  lg:w-1/2 flex flex-col items-center justify-center p-20 bg-no-repeat bg-cover bg-center"
              style={{
                backgroundImage: "url(/public/loginImage/partnerLogin.jpg)",
              }}>
              <div>
                <p className="text-black">

                </p>
              </div>
            </div>
            <div className="w-full lg-w-1/2 py-16 px-12">

              <h2 className="text-3xl mb-4 text-center ">Partner Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mt-5">
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="border border-gray-400 rounded-lg shadow py-2 px-4 w-full h-full"
                    style={{ appearance: 'none' }}
                    {...getFieldProps("email")}
                  />

                  {errors.email && touched.email && (<p className='text-red-800'>{errors.email}</p>)}

                </div>
                <div className="mt-5">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="border border-gray-400 rounded-lg shadow-md py-2 px-4 w-full"
                    {...getFieldProps("password")}
                  />
                  {errors.password && touched.password && (<p className='text-red-800'>{errors.password}</p>)}
                </div>
                <div className="mt-3 flex justify-center">
                  <a href="/" className="relative inline-block">
                    <button type="submit" className=" bn632-hover bn26 w-40 h-14 px-6 py-2 text-white font-semibold rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-md focus:outline-none transform hover:scale-105 transition-transform">
                      Login
                    </button>
                  </a>
                </div>


                <div className="mt-3">
                  <p>
                    <Link to={'/partner/forgotPassword'} className="text-purple-500">
                      Forgot Password?
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PartnerLoginComponent
