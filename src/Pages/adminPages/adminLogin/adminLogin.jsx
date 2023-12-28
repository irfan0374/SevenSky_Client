import { useFormik } from 'formik';
import React from 'react'
import { Link,useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import { loginSchema } from '../../../schema/loginValidation';
import { adminLoginVerification } from '../../../Api/adminApi';
import { adminLogin } from '../../../Redux/Slice/adminSlice';
const AdminLogin = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  
  const onSubmit=async()=>{
    try{
      const res=await adminLoginVerification(values)
      if(res?.status===200){
        const {token,userName}=res.data
        localStorage.setItem("adminToken",token);
        dispatch(
          adminLogin({
            token:token,
            admin:userName
          })
        )
        toast.success(res?.data?.message);
        navigate('/admin/userList')
      }
    }catch(error){
      toast.error(error.response?.data?.message)
      console.log(error.message)
    }
  }

  const {errors,values,touched,getFieldProps,handleSubmit}=useFormik({
    initialValues:{
      email:"",
      password:""
    },
    validationSchema:loginSchema,
    onSubmit
  })
  return (
    <div>
          <div className="container mx-auto py-20 h-screen">
            <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
              <div
                className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
                style={{
                  backgroundImage: "url(/public/loginImage/adminLogin.jpg)",
                }}
              >
                
              </div>
              <div className="w-full lg-w-1/2 py-16 px-12">
                <div className="pb-2">
                
                </div>
                <h2 className="text-3xl mb-4 font-serif font-semibold">Admin Login</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mt-5">
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      {...getFieldProps("email")}
                      className="border border-gray-400 rounded-lg shadow py-2 px-4 w-full"
                    />
                    {errors.email&&touched.email&&<p className='text-red-800'>{errors.email}</p>}
                  </div>
                  <div className="mt-5">
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      {...getFieldProps("password")}
                      className="border border-gray-400 rounded-lg shadow-md py-2 px-4 w-full"
                    />
                      {errors.email&&touched.email&&<p className='text-red-800'>{errors.email}</p>}
                  </div>
                  <div className="mt-5">
                    <button 
                    type='submit'
                    className="w-full bg-blue-500 py-3 text-center text-white rounded-lg shadow-md">
                      SignIn
                    </button>
                  </div>
                  

                  <div className="mt-3">
                    <p>
                      <a href="/forgetPassword" className="text-purple-500">
                        Forgot Password?
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
  )
}

export default AdminLogin;