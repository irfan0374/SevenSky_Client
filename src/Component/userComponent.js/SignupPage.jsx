import React, { useEffect, useRef, useState } from "react";
import { useFormik } from 'formik'
import { useNavigate, Link, Form } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'
import { userSignup } from "../../Api/userApi";
import { basicScheme } from "../../schema/SignupValidation"
import "react-toastify/dist/ReactToastify.css";

const SignupPage = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // SIGNUP FUNCTION START

  const onSubmit = async () => {
    try {
     
      setLoading(true)
      const res = await userSignup(values)
      if (res?.status === 201) {
      
        const { userData, otpId } = res.data;
        toast(res?.data?.status)
        navigate("/otp", {
          state: { otpId: otpId, userId: userData._id },
        });
        setLoading(false)
      }
    } catch (error) {
      console.log("helo error")
      console.log(error.response)
      setLoading(false);
      toast.error(error.response?.data?.status)
      console.log(err.message)
    }
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      name: "",
      email: '',
      phone: '',
      password: "",
      confirmPassword: ''
    },
    validationSchema: basicScheme,
    onSubmit,
  });
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">

          <form className="space-y-6" onSubmit={handleSubmit}>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              SignUp
            </h5>
            <div>
              <label
                htmlFor="name"
                className="block  text-sm font-medium text-gray-900 dark:text-white"
              >Username:
              </label>
              <input
                type="text"
                name='name'
                id='name'
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"

                // value={values.password}
                // onChange={handleChange}
                // onBlur={handleBlur}

                //======= short of these three=====


                {...getFieldProps('name')}
                placeholder="Enter your name"
                required
              />
              {errors.name && touched.name && (<p className="text-red-800">{errors.name}</p>)}

            </div>
            <div >
              <label
                htmlFor="email"
                className="block  text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                {...getFieldProps('email')}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@example.com"
                required=""
              />
              {errors.email && touched.email && (<p className="text-red-800">{errors.email}</p>)}
            </div>
            <div>
              <label
                htmlFor='phone'
                className="block  text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone No
              </label>
              <input
                type="phone"
                name='phone'
                id='phone'
                {...getFieldProps('phone')}

                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="1234******"
                required=""
              />
              {errors.phone && touched.phone && (<p className="text-red-800">{errors.phone}</p>)}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required=""
              />
              {errors.password && touched.password && (<p className="text-red-800">{errors.password}</p>)}
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confrim password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="••••••••"


                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required=""
              />
              {errors.confirmPassword && touched.confirmPassword && (<p className="text-red-800">{errors.confirmPassword}</p>)}
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              SignUp your Account
            </button>

          </form>
        </div>
      </div>

    </>
  )
}

export default SignupPage
