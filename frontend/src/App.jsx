import { useState } from 'react'
import { Box} from "@chakra-ui/react"
import { Route, Routes, Navigate } from 'react-router-dom'
import CreatePage from './pages/CreatePage'
import Signup from './components/signup'
import Login from './components/Login'
import AboutUs from './pages/AboutUs'
import Navbar from './components/Navbar'
import ViewServices from './pages/viewServices'
import MechanicDash from './pages/MechanicDash'
import UserDash from './pages/UserDash'
import Operations from './components/Operations'
import UpdateService from './pages/UpdateService'
import ContactUs from './pages/ContactUs'
import Booking from './pages/booking'
import ManageBookings from './pages/ManageBookings'
import UpdateBooking from './pages/UpdateBooking'
import { ToastContainer } from 'react-toastify';
import CheckoutForm from './pages/CheckoutForm';
import Return from './pages/Return';
import SuccessPage from './pages/Success';
import InquiriesPage from './pages/inquiry'
import AdminInquiriesPage from './pages/admininquiry'
import AllBookings from './pages/allbookings'

import 'react-toastify/dist/ReactToastify.css';
import Payment from './pages/Payment' 


function App() {

  const user = localStorage.getItem("token")

  return (
    <>
 
     <Box minH="100vh" bgColor='black'>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/viewservice" element={<ViewServices/>} />
        <Route path="/" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/managebooking" element={<ManageBookings/>} />
        <Route path="/UpdateService" element={<UpdateService />} />
        <Route path="/userdash" element={<UserDash />} />
        <Route path="/booking" element={<Booking />} />
        <Route path='/AboutUS' element={<AboutUs/>} />
        <Route path='/Operations' element={<Operations/>} />
        <Route path="/CreatePage" element={<CreatePage/>} />
        <Route path="/ContactUs" element={<ContactUs/>} />
        <Route path="/MechDash" element={<MechanicDash />} />
        <Route path="/updtbooking" element={<UpdateBooking />} />
        <Route path="/checkout" element={<CheckoutForm />} />
        <Route path="/return" element={<Return />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/inquiries" element={<InquiriesPage />} />
        <Route path="/admininquiries" element={<AdminInquiriesPage />} />
        <Route path="/allbookings" element={<AllBookings />} />
      </Routes>
     </Box>
    </>
  )
}

export default App

