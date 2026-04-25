import React from 'react'
import Home from './LandingPage/Home'
import {Routes, Route } from "react-router-dom";
import Sign_up from './Pages/Sign_up';
import Sign_in from './Pages/Sign_in';
import { Toaster } from "react-hot-toast";
import Chat from './Pages/chat';
import Chatcontainer from './Pages/Chatcontainer';
import ChatPerson from './Pages/ChatPerson';
import ProfileCard from './Pages/ProfileCard';
import NotFound from './Pages/NotFound';
import Emailverified from './components/Emailverified';
import {ProfileEdit} from './components/ProfileEdit';
import { DeleteMessage } from './components/DeteleMessage';
import LiveLocation from './Pages/LiveLocation';
import Ai_chat from './Pages/Ai_chat';


function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/emailverified/otpverified/signup" element={<Sign_up/>}/>
        <Route path="/signin" element={<Sign_in/>}/>
         <Route path="/chat" element={<Chat/>}/>
         <Route path="/chatContainer" element={<Chatcontainer/>}/>
         <Route path="/chatPerson" element={<ChatPerson/>}/>
          <Route path="/chat/profile" element={<ProfileCard/>}/>
          <Route path='/emailverified' element={<Emailverified/>}/>
          <Route path='/chat/profile/profileupdate' element={<ProfileEdit/>}/>
          <Route path='/chatContainer/Deletemessage' element={<DeleteMessage/>}/>
          <Route path='/live-location/:receiverId' element={<LiveLocation/>}/>
          <Route path='/Ai_chat' element={<Ai_chat/>}/>
            <Route path='*' element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App
