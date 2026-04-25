import React, { useState } from 'react'
import ChatPerson from './ChatPerson'
import Chatcontainer from './Chatcontainer'
import Navbar from '../components/Navbar'
import Ai_chat from './Ai_chat'

function Chat() {

  const [selectedChat, setSelectedChat] = useState(null);


  return (
    <div className="h-screen flex flex-col overflow-xhidden">
      <Navbar/>

      <div className="flex flex-1 overflow-hidden">

        {/* LEFT SIDE USERS */}
       <div className="w-[250px] border-r border-white/10 bg-white/10 backdrop-blur-md">
  <ChatPerson/>
</div>

        {/* RIGHT SIDE CHAT */}
        <div className="flex-1 flex flex-col">
     
            <Chatcontainer/>
        
        </div>

      </div>

    </div>
  )
}

export default Chat