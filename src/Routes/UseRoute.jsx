import { Routes, Route } from 'react-router-dom';
import React from 'react';
import { RegisterPage } from '../Pages/userPages/Login/RegisterPage';
import Homepage from '../Pages/userPages/Home/Home';
import Otp from '../Pages/userPages/Otp';
import UserPublic from './UserPrivate/UserPublic';
import UserProtect from './UserPrivate/UserProtect';
import PropertyPage from '../Pages/userPages/Home/propertyPage';
import PropertyDetail from '../Pages/userPages/Home/propertyDetail';
import Profile from "../Pages/userPages/Home/Profile"
import SentMailCard from '../Component/userComponent.js/sentMailCard';
import RentPage from '../Pages/userPages/Home/RentPage';
import SalePage from '../Pages/userPages/Home/SalePage';
import PremiumPage from '../Component/userComponent.js/PremiumPage';
import '@stripe/stripe-js'
import Status from '../Component/userComponent.js/Status';
import AgentDetails from '../Pages/userPages/Home/AgentDetails';
import ChatPage from '../Pages/userPages/chatPage/ChatPage';
import PropertyCards from '../Component/userComponent.js/Card/propertyCards';

import DetailCards from '../Pages/userPages/Home/DetailCards';
import CardRentDetails from '../Component/userComponent.js/CardRentDetails';
import CardSaleDetails from '../Component/userComponent.js/CardSaleDetails';
import ResetPassword from '../Pages/userPages/ResetPassword';
import ForgetPassword from '../Component/CommonComponent/ForgotPassword';
import SearchProperty from '../Pages/userPages/searchProperty';
import AboutPage from '../Pages/userPages/AboutPage'
const UseRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/login' element={<UserPublic><RegisterPage /></UserPublic>} />
      <Route path='/otp' element={<UserPublic><Otp /></UserPublic>} />
      <Route path='/propertyList' element={<PropertyPage />} />
      <Route path='/propertyDetails' element={<PropertyDetail />} />
      <Route path='/account' element={<UserProtect><Profile /></UserProtect>} />
      <Route path='/rent' element={<RentPage />} />
      <Route path='/sale' element={<SalePage />} />
      <Route path='/subscription' element={<PremiumPage />} />
      <Route path='/status' element={<UserProtect><Status /></UserProtect>} />
      <Route path='/contactToAgent' element={<UserProtect><SentMailCard /></UserProtect>} />
      <Route path='/AgentDetails/:partnerId' element={<UserProtect><AgentDetails /></UserProtect>} />
      <Route path='/chat/:partnerId' element={<UserProtect><ChatPage /></UserProtect>} />
      <Route path='/propertyCard' element={<PropertyCards />} />
      <Route path='/CardRentDetail' element={<CardRentDetails />} />
      <Route path='/CardSaleDetail' element={<CardSaleDetails />} />
      <Route path='/CardDetails' element={<DetailCards />} />
      <Route path='/forgotPassword' element={<ForgetPassword />} />
      <Route path='/resetPassword/:id/:token' element={<ResetPassword />} />
      <Route path='/searchProperty' element={<SearchProperty />} />
      <Route path='/about' element={<AboutPage/>} />

    </Routes>
  );
};

export default UseRoute;
