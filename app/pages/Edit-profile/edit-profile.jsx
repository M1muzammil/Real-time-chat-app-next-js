"use client"

import React, { useRef } from 'react'
import axios from "axios"
import { Password } from 'primereact/password';
import { Dice1 } from 'react-bootstrap-icons';
import CloseIcon from '@mui/icons-material/Close';

const Page = () => {

  const fileRef = useRef()



  const submitHandler = async (e) => {

    e.preventDefault()

    const file = fileRef.current.files[0]

    const formData = new FormData()
    formData.append("file", file)

    try {
      // api call
      const response = await axios.put("http://localhost:3000/api/v1/auth/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })

      console.log(response); // public url of your file

    } catch (error) {
      console.log(error);
    }

  }

  return (
  <div className=' flex justify-center items-center'>
      < div className='flex flex-col gap-12 w-[400px] shadow-lg p-2'>
<span className="back cursor-pointer">
<CloseIcon/>
</span>

<span className="">
 <h1 className='text-2xl '>Update your profile picture</h1>
<input ref={fileRef} type="file" className="file-input file-input-bordered  w-full max-w-xs" />
 <span className="flex justify-end mt-4">
 <button className="btn btn-success"onClick={submitHandler}>Update</button>  


 </span>
</span>



<div className="card flex justify-content-center ">
   <h1>Old password</h1>
       <Password className=' border-gray-700 border-b-2' onChange={(e) => setValue(e.target.value)} />
   </div>
   <div className="card flex justify-content-center ">
   <h1>New password</h1>
       <Password className=' border-gray-700 border-b-2' onChange={(e) => setValue(e.target.value)} />
   </div>
   <span className="flex justify-end">
   <button className="btn btn-success"onClick={submitHandler}>Update</button> 
   </span>
</div>
  </div>

  )
}

export default Page