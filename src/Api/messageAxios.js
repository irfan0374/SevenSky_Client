import {messageAxiosInstance}from './axiosInstance'

export const getMessage = (id) => messageAxiosInstance.get(`/${id}`)
export const addMessage = (data) => messageAxiosInstance.post('/',data)