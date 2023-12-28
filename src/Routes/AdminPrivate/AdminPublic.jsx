import { Navigate } from "react-router-dom";
// import jwt_decode from "jwt-decode"

const AdminPublic =(props)=>{
    try{
        const token =localStorage.getItem("admintoken")
        if(token ){
            // const decodedToken=jwt_decode(token)
            // const currentTime=Date.now()/1000
            // if(decodedToken.exp>currentTime){
                return <Navigate to = "/admin/dashboard"/>
            }else{
                <Navigate to ="/admin"/>
                return props.children
            }
        // }else{
        //     <Navigate to = "/admin"/>
        //     return props.children
        // }

    }catch(error){
        console.log(error.message)
    }
}
export default AdminPublic