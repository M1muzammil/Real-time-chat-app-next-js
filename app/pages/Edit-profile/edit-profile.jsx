"use client"

import React, { useRef ,useState } from 'react'
import axios from "axios"
import { Password } from 'primereact/password';
import { Dice1 } from 'react-bootstrap-icons';
import CloseIcon from '@mui/icons-material/Close';

const Page = ({handleCloseClick}) => {
  
  const fileRef = useRef()
  
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
  


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


  const passwordsubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put("http://localhost:3000/api/v1/auth/password", {
        oldPassword,
        newPassword
      }, {
        withCredentials: true,
      });
setNewPassword("")
setOldPassword("")
      console.log(response.data.message); 
    } catch (error) {
      console.log(error.response.data.message); 
    }
  };

  return (
  <div className=' flex justify-center items-center'>
      < div className='flex flex-col gap-12 w-[400px] shadow-lg p-2'>
<span className="back cursor-pointer" onClick={()=>handleCloseClick(false)}>
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
   <Password value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className='border-gray-700 border-b-2  bg-purple-200' />
        </div>
   <div className="card flex justify-content-center ">
   <h1>New password</h1>
   <Password value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className='border-gray-700 border-b-2  bg-purple-200' />
          </div>
   <span className="flex justify-end">
   <button className="btn btn-success"onClick={passwordsubmitHandler}>Update</button> 
   </span>
</div>

  </div>

  )
}

export default Page