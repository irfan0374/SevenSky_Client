import React,{useState,useEffect,useRef} from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { basicScheme } from '../../../schema/SignupValidation'
import { signup } from '../../../Api/partnerApi'
import { toast } from 'react-toastify'
const PartnerSignup = () => {
    const navigate=useNavigate()
    const {values,errors,touched,getFieldProps,handleSubmit}=useFormik({
        initialValues:{
            name:'',
            email:"",
            phone:'',
            password:"",
            confirmPassword:"",

        },
        validationSchema:basicScheme,
        onSubmit,
    })
    
    async function onSubmit(){
      try{
        const res=await signup(values)
        
        if(res?.status===200){ 
          const {partnerData,otpId}=res.data
          toast(res?.data?.status)
          navigate("/partner/otp", {
            state: {
              partnerEmail: partnerData.email,
              otpId: otpId,
              partnerId: partnerData._id,
            },
          });
            
        }

      }catch(error){
        console.log(error.message)
        toast(error.response?.data?.status);
      }
    }
  return (
    <div className="flex justify-center items-center h-screen">
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 ">
    
      <form className="space-y-5" onSubmit={handleSubmit}>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Partner Signup Page
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            
            {...getFieldProps('name')}  
            placeholder="Enter your name"
           required           
          />
    {errors.name && touched.name &&(<p className="text-red-800">{errors.name}</p>)} 
    
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@example.com"
            required=""
          />
           {errors.email && touched.email &&(<p className="text-red-800">{errors.email}</p>)} 
    
        </div>
        <div>
          <label
            htmlFor='phone'
            className="block  text-sm font-medium text-gray-900 dark:text-white"
          >
            Phone No
          </label>
          <input
            type="number"
            name='phone'
            id='phone'
            {...getFieldProps('phone')}
           
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="1234******"
            required=""
          />
          {errors.phone && touched.phone &&(<p className="text-red-800">{errors.phone}</p>)} 
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
           {...getFieldProps("password")}
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required=""
          />
           {errors.password && touched.password &&(<p className="text-red-800">{errors.password}</p>)} 
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
            {...getFieldProps("confirmPassword")}
            
            placeholder="••••••••"
           
          
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required=""
          />
           {errors.confirmPassword && touched.confirmPassword &&(<p className="text-red-800">{errors.confirmPassword}</p>)} 
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          SignUp your Account
        </button>
    
      </form>
    </div>
    </div>
  )
}

export default PartnerSignup
