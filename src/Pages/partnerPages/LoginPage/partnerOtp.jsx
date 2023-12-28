import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { otpSchema } from "../../../schema/otpValidation";
import { toast } from 'react-toastify';
import {partnerOtpVerification} from '../../../Api/partnerApi'


const PartnerOtp = () => {
    const [countDown, setCountDown] = useState(30);
    const [showResendButton, setShowResendButton] = useState(false);
    const location = useLocation()
    const navigation = useNavigate()
    const {partnerEmail,otpId,partnerId}=location.state
  


    const decrementTimer = () => {
        if (countDown > 0) {
            setCountDown(countDown - 1)
        }
        else {
            setShowResendButton(true)
        }
    }


useEffect(() => {
    const timer = setInterval(decrementTimer, 1000);
    return () => clearInterval(timer);
}, [countDown]);

const onSubmit=async()=>{
    try {
        const combinedOTP = Object.values(values).join("");
        console.log(combinedOTP)

        const res=await partnerOtpVerification(combinedOTP,otpId,partnerId)
        console.log(res)
        if(res?.data?.message){
            toast.info(res?.data?.message)
            navigation("/partner/kycUpload",{state:partnerId})   
        }
    } catch (err) {
        toast.error(err.response.data.message)
        console.log(err.message);
    }
}


const {values,errors,touched,handleChange,handleSubmit}=useFormik({
    initialValues:{
        otp1:"",
        otp2:"",
        otp3:"",
        otp4:""
    },
    validationSchema:otpSchema,
    onSubmit,
})
const input1Ref=useRef()
const input2Ref=useRef()
const input3Ref=useRef()
const input4Ref=useRef()

const handleKeyUp=(e)=>{
    switch (e.target.name) {
        case "otp1":
          input2Ref.current.focus();
          if (!e.target.value) {
            input1Ref.current.focus();   
          } else {
            input2Ref.current.focus();
          }
          break;
        case "otp2":
          if (!e.target.value) {
            input1Ref.current.focus();
          } else {
            input3Ref.current.focus();
          }
          break;
        case "otp3":
          if (!e.target.value) {
            input2Ref.current.focus();
          } else {
            input4Ref.current.focus();
          }
          break;
        case "otp4":
          if (!e.target.value) {
            input3Ref.current.focus();
          } else {
            input4Ref.current.focus();
          }
          break;
        default:
          break;
      }
    }
return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-md shadow-md p-8 w-full max-w-md">
            <h2 className="text-2xl font-semibold text-center">Verify Your Email</h2>
            <p className="text-gray-500 text-center">We've sent a code to your email.</p>
            <form onSubmit={handleSubmit}>
                  <div className="flex flex-col space-y-16">
                    <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                      <div className="w-16 h-16 ">
                        <input
                          className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          name="otp1"
                          maxLength={1}
                          ref={input1Ref}
                          value={values.otp1}
                          onChange={handleChange}
                          onKeyUp={handleKeyUp}
                          id=""
                        />
                        {errors.otp1 && touched.otp1 && (
                          <p className="text-red-600">{errors.otp1}</p>
                        )}
                      </div>
                      <div className="w-16 h-16 ">
                        <input
                          className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          name="otp2"
                          maxLength={1}
                          ref={input2Ref}
                          value={values.otp2}
                          onChange={handleChange}
                          onKeyUp={handleKeyUp}
                          id=""
                        />
                        {errors.otp2 && touched.otp2 && (
                          <p className="text-red-600">{errors.otp2}</p>
                        )}
                      </div>
                      <div className="w-16 h-16 ">
                        <input
                          className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          name="otp3"
                          maxLength={1}
                          ref={input3Ref}
                          value={values.otp3}
                          onChange={handleChange}
                          onKeyUp={handleKeyUp}
                          id=""
                        />
                        {errors.otp3 && touched.otp3 && (
                          <p className="text-red-600">{errors.otp1}</p>
                        )}
                      </div>
                      <div className="w-16 h-16 ">
                        <input
                          className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          name="otp4"
                          maxLength={1}
                          ref={input4Ref}
                          value={values.otp4}
                          onChange={handleChange}
                          onKeyUp={handleKeyUp}
                          id=""
                        />
                        {errors.otp4 && touched.otp4 && (
                          <p className="text-red-600">{errors.otp4}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col space-y-5">
                      <div>
                        <button
                          className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                          type="submit"
                        >
                          Verify Account
                        </button>
                      </div>

                      <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                        {countDown > 0 ? (
                          <p>Resend otp in {countDown} seconds</p>
                        ) : (
                          showResendButton && (
                            <p
                              className="font-medium text-orange-500 hover:underline cursor-pointer"
                              onClick={resendOTP}
                            >
                              Resend OTP
                            </p>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </form>
            <div className="text-center mt-4">
                {countDown > 0 ? (
                    <p>Resend OTP in {countDown} seconds</p>
                ) : showResendButton ? (
                    <button
                        onClick={resendOTP}
                        className="text-blue-500 hover:underline cursor-pointer"
                    >
                        Resend OTP
                    </button>
                ) : null}
            </div>
        </div>
    </div>
);
                }


export default PartnerOtp;
