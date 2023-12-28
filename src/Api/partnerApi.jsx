import { partnerAxiosInstance } from "./axiosInstance";

export async function signup(Signupdata){
    
    const data=await partnerAxiosInstance.post("/signup",Signupdata)
    return data;
}
export async function partnerOtpVerification(otp,otpId,partnerId){
    const data=await partnerAxiosInstance.post('/otpVerification',{otp,otpId,partnerId})
    return data
}
export async function loginVerification(LoginData){
    const data=await partnerAxiosInstance.post('/login',LoginData)
    return data
} 
export async function partnerKycUpload({partnerId,kycImage}){
            
        const data=await partnerAxiosInstance.patch('/partnerKycUpload',{partnerId,kycImage})
        return data;

  
}
export async function addProperty(values){
    console.log({...values})
    
    const data=await partnerAxiosInstance.post("/addProperty",{...values})
  console.log(data,"addPropertyapi")
        return data;
    }

export async function listProperty(partnerId){
      
        const data=await partnerAxiosInstance.get(`/myProperty/${partnerId}`)
        return data;
}
export async function propertylist(propertyId){
    const data=await partnerAxiosInstance.get(`/propertyDetail/${propertyId}`)
    return data;
}

export async function partnerImage(imageData,partnerId){
    const data=await partnerAxiosInstance.patch(`/partnerImage`,{imageData,partnerId})
    console.log(data)
    return data
}
export async function findPartner(){
    
    const data=await partnerAxiosInstance.get('/findPartner')
    return data
}
export async function partnerProfileUpdate(values){
  
    const data=await partnerAxiosInstance.patch('/updateProfile',{...values})
    return data
}
export async function  descriptionUpdate(values){
    const data=await partnerAxiosInstance.patch('/addDescription',{...values})
    return data;
}

export async function findProperty(partnerid){
    const data=await partnerAxiosInstance.get(`/findProperty/${partnerid}`)
    return data
}
export async function updateProperty(values,propertyId){
    console.log({...values},"hello property eedit")

    const data=await partnerAxiosInstance.patch(`/updateProperty/${propertyId}`,{...values})
    return data
}
export async function deleteImage(imgsrc,propertyId){
    const data=await partnerAxiosInstance.patch(`/deletePropertyImage/${propertyId}`,{imgsrc})
    return data
}
export async function getTheBuyerDetails(partnerId){
    const data=await partnerAxiosInstance.get(`/fetchBuyers/${partnerId}`)
    return data
}

export const hideProperty=async(isChecked,propertyId)=>{
    const data=await partnerAxiosInstance.post('/hideProperty',{isChecked,propertyId})
return data
} 
