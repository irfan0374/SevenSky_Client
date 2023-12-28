import React from 'react'
import { VscAccount } from "react-icons/vsc";
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { sentMailToAgent } from '../../Api/userApi';

const sentMailCard = ({partnerId}) => {
  const {user}=useSelector((state)=>state.userReducer)

  const {values,error,handleSubmit,getFieldProps}=useFormik({
    initialValues:{
      name:user?.name||"",
      email:user?.email||"",
      phone:user?.phone||"",
      description:"I saw your property on seven Sky and  "
    },
    onSubmit,
    enableReinitialize:true
  })
  async function onSubmit(){
    try{
       sentMailToAgent({...values,partnerId}).then((res)=>{
       }).catch((error)=>{
        console.log(error.message)
       })

    }catch(error){
      console.log(error.message)
    }
  }

  return (
   <>

<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
  <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
    <div className='flex space-x-2 my-4'>
        <img src="/public/profile.png"
        className='w-14 h-12 rounded-lg '
        alt="partnerImg" />
        <div className='my-2 flex space-x-2'>

        <div className='flex'>
        <VscAccount />
        </div>
        <h1 className='m-y-2'>muhammed Irfan</h1>
    </div>
        </div>
   
<div >
    <form onSubmit={handleSubmit} >
        <div className='space-y-4'>

     
<input
                  type="text"
                  name="name"
                  id="name"
                    {...getFieldProps("name")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter your Name"
                  required=""
                />
<input
                  type="text"
                  name="email"
                  id="email"
                  {...getFieldProps("email")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter your Email"
                  required=""
                />
<input
                  type="phone"
                  name="phone"
                  id="phone"
                  {...getFieldProps("phone")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Phone"
                  required=""
                />

<textarea
  name="description"
  id="description"
  rows="4"
 {...getFieldProps("description")}
  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
  placeholder="Enter your phone number including the country code."
  required=""
></textarea>
<div className='my-4'> 
    <button  type="submit"  className='w-full border rounded-md bg-gray-400 h-9' onClick={() => document.getElementById('my_modal_1').close()}>Send </button>
</div>
</div>
</form>
</div>
    
  </div>
</dialog>
   </>
  )
}

export default sentMailCard
