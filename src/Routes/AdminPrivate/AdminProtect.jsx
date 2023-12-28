import { Navigate } from "react-router-dom";
// import jwt_decode from "jwt-decode"

const AdminProtect=(props)=>{
    const token=localStorage.getItem("adminToken")
    if(token){
        
        // const decodeToken =jwt_decode(token)
        // const currentTime=Date.now()
        // if(decodeToken.exp>currentTime){
            return props.children;
        }else{
            return <Navigate to="/admin"/>
        }
//     }else{
//         return <Navigate to ="/admin"/>
//     }
 }
export default AdminProtect