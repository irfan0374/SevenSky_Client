import {chatAxiosInstance} from './axiosInstance'

export const createChat=async(userId,partnerId)=>{
    
    console.log("data")
    const data=await chatAxiosInstance.post('/createChat',{userId,partnerId})
    console.log(data)
    return data
}

export const userChat=(id)=>chatAxiosInstance.get(`/${id}`)
export const findPartner=(id)=>chatAxiosInstance.get(`/getPartner/${id}`)
export const findUser=(id)=>chatAxiosInstance.get(`/getUser/${id}`)
