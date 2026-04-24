import React, { useState } from 'react'
import ChatPerson from './ChatPerson'
import Chatcontainer from './Chatcontainer'
import Navbar from '../components/Navbar'

function Chat() {

  const [selectedChat, setSelectedChat] = useState(null);


  return (
    <div className="h-screen flex flex-col overflow-xhidden">
      <Navbar/>

      <div className="flex flex-1 overflow-hidden">

        {/* LEFT SIDE USERS */}
       <div className="w-[250px] border-r border-white/10 bg-white/10 backdrop-blur-md">
  <ChatPerson setSelectedChat={setSelectedChat}/>
</div>

        {/* RIGHT SIDE CHAT */}
        <div className="flex-1 flex flex-col">
          <Chatcontainer selectedChat={selectedChat}/>
        </div>

      </div>

    </div>
  )
}

export default Chat