import { Navigate } from "react-router-dom";

const PartnerPublic=(props)=>{
    try{
        const token =localStorage.getItem("partnerToken")
        if(token){
                return <Navigate to ="/partner/home"/>
            }else{
                <Navigate to="/partner"/>
                return props.children
            }
    }catch(error){
        console.log(error.message)
    }
}
export default PartnerPublic;