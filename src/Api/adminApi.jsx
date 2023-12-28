import { adminAxiosInstance } from "./axiosInstance";

export async function adminLoginVerification(loginData){
    console.log("api is success")
    const data=await adminAxiosInstance.post('/adminLogin',loginData)
    return data
}

export async function userList(){
    const data=await adminAxiosInstance.get('/listUser')
    return data
}
export async function partnerList(){
    const data=await adminAxiosInstance.get('/listPartner')
    return data
}
export async function userBlock(userId,status){
    console.log("blockk")
    const data=await adminAxiosInstance.patch('/userBlock',{userId,status})
    return data
}
export async function partnerBlock(partnerId,status){
    const data=await adminAxiosInstance.patch('/partnerBlock',{partnerId,status})
    return data
}
export async function findPartner(partnerid){
    const data=await adminAxiosInstance.get(`/getPartner/${partnerid}`)
    return data
}
export async function kycApprove(partnerId,status){
    const data=await adminAxiosInstance.patch('/kycApproval',{partnerId,status})
    return data;
}
export async function propertylist(){
    const data=await adminAxiosInstance.get("/getProperty")
    return data;
}
export async function findProperty(propertyId){
        console.log(propertyId,"properoty id")
    const data=await adminAxiosInstance.get(`/findProperty/${propertyId}`)
    return data;
}
export async function propertyApproval(propertyId,status){
    const data=await adminAxiosInstance.patch('/propertyApproval',{propertyId,status})
    console.log(data,"data")
    return data;
}
export async function premiumUser(){
    const data=await adminAxiosInstance.get('/premiumUser')
    return data
}
export async function fetchPremiumUser(){
    const data=await adminAxiosInstance.get('/fetchPremiumUser')
    return data;
}
export async function dashboardData(){
    const data=await adminAxiosInstance.get('/Dashboard')
    console.log(data)
    return data;
}
