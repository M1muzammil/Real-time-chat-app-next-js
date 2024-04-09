import React from 'react'
import Chat from "./users"
import Singleuser from "./single-user"
const chat = () => {
  return (
    <div className='flex'>
   <Chat/>
   <Singleuser/>
    </div>
  )
}

export default chat
