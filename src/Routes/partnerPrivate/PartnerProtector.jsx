import { Navigate } from "react-router-dom";
// import jwt_decode from "jwt-decode"

const PartnerProtect=(props)=>{
    const token=localStorage.getItem("partnerToken")
    if(token){
    // const decodeToken=jwt_decode(token)
    // const currentTime=Date.now/1000;
    // if(decodeToken.exp>currentTime)
    // {
        return props.children
    }else{
        return <Navigate to= "/partner/login"/>
    }
// }else{
//     return <Navigate to ="/partner/login"/>
// } 

}
export default PartnerProtect