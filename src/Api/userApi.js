import { userAxiosInstance } from "./axiosInstance";
export const userSignup=async(signupdata)=>{
    const data= await userAxiosInstance.post('/signup',signupdata)
return data;
}
export const resentOtp=async(userId)=>{
    const data=await userAxiosInstance.post('/resentOtp',{userId})
    return data
} 
export const otpVerification= async (otp,otpId,userId)=>{
    const data=await userAxiosInstance.post('/otpVerify',{otp,userId});
    return data;
}
export const userlogin=async(loginData)=>{
    
        const data=await userAxiosInstance.post('/userLogin',loginData)
        return data;
};
export const userLoginWithGoogle=async(userEmail)=>{
    const data=await userAxiosInstance.post('/googleUserLogin',{userEmail})
   
    return data;
}
export const listProperty=async()=>{
    const data=await userAxiosInstance.get('/propertyList')
    return data;
}
export const detailProperty=async(propertyId)=>{
    const data=await userAxiosInstance.get(`/propertyDetails/${propertyId}`)
    return data;
}
export const findUser=async(id)=>{
    const data=await userAxiosInstance.get(`/findUser/${id}`)
   
    return data;
}
export const updateProfile=async(values)=>{
  
    const data=await userAxiosInstance.patch('/updateProfile',{...values})
    return data;
}

export const updataImage=async(image,id)=>{
  
    const data =await userAxiosInstance.patch('/updataImage',{image,id})
  
    return data
}

export const rentProperty=async()=>{

    const data=await userAxiosInstance.get('/rentProperty')
    
    return data;
}
export const saleProperty=async()=>{
    const data=await userAxiosInstance.get('/saleProperty')
    return data;
}
export const DetailsProperty=async(propertyId)=>{

    const data=await userAxiosInstance.get(`/propertyDetails/${propertyId}`)
    return data;
}
export const createSubscription=async(prices,User)=>{
   
    const data=await userAxiosInstance.patch('/create-subscription',{prices,User})
    return data
}
export const premiumUpdate=async(typeOfSub,user)=>{
  
    const data=await userAxiosInstance.patch(`/premiumUpdate/${user._id}`,{typeOfSub})
    return data
}
export const findPartner=async(partnerId)=>{
    const data=await userAxiosInstance.get(`/findPartner/${partnerId}`)
    return data
}
export const sentMailToAgent=async(values)=>{
    
    const data=await userAxiosInstance.post('/sentMailtoAgent',{...values})
    return data
}
export const RentData=async(type)=>{

    const data=await userAxiosInstance.get(`/rentData/${type}`)
    return data
}
export const salesData=async(type)=>{
    const data=await userAxiosInstance.get(`/salesData/${type}`)
    return data
}
export const RentBudget=async(type)=>{
    const data=await userAxiosInstance.get(`/budgetRent/${type}`)
    return data
}
export const salesBudeget=async(type)=>{
    const data=await userAxiosInstance.get(`/budgetSales/${type}`)
    return data
}
export const BhkDataRent=async(type)=>{
    const data=await userAxiosInstance.get(`/propertyByBhkRent/${type}`)
    return data
}
export const BhkDataSales=async(type)=>{
    const data=await userAxiosInstance.get(`/propertyByBhkSales/${type}`)
    return data
}
export const userForgetPassword=async(email)=>{
    const data=await userAxiosInstance.get(`/forgotPassword/${email}`)
    return data;
}
export const userResetPassword=async(id,token,password)=>{
    console.log(id,token,password,"hello userResetPassword")
    const data=await userAxiosInstance.patch(`/resetPassword/${id}/${token}`,{password})
    return data;
}
export const passwordChange=async(values)=>{
    const data=await userAxiosInstance.patch('/passwordChange',{...values})
    return data
}
export const getThePropertyType=async()=>{
        const data=await userAxiosInstance.get('/getThePropertyType')
    return data
}
export const searchProperty=async(values)=>{
        const data=await userAxiosInstance.post('/Search',{...values})
    return data
}
