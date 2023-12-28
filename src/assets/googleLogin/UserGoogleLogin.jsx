import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userLogin } from "../../Redux/Slice/userSlice";
import { userLoginWithGoogle } from "../../Api/userApi";

const GoogleButtonUser = () => {
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const responseMessage = async (response) => {
    try {
   
      const user = jwtDecode(response.credential);
      const res = await userLoginWithGoogle(user.email);
      if (res?.status === 200) {
        const { token, registeredUser } = res.data;
        localStorage.setItem("usertoken", token);
        dispatch(
          userLogin({
            token: token,
            user: registeredUser,
          })
        );
        toast.success(res?.data?.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error.message);
    }
  };
  
  const errorMessage = (error) => {
    console.log(error.message);
  };

  return (
    <>
      <div>
        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <GoogleLogin
            className="text-black"
            onSuccess={responseMessage}
            onError={errorMessage}
           
          />
        </GoogleOAuthProvider>
      </div>
    </>
  );
};
export default GoogleButtonUser;
