import { Navigate } from "react-router-dom";
// import jwt_decode from 'jwt-decode'


const UserProtect=(props)=>{

    try{
        const token =localStorage.getItem("usertoken")
        if(token){
            
                return props.children;
            }else{
                return <Navigate to ='/'/>
            }
    }catch(error){
        console.log(error.message)
    }
}
export default UserProtect