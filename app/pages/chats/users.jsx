"use client"
import React from 'react'
import Avatar from '@mui/material/Avatar';
import { useState, useEffect } from 'react';
import { deepOrange, deepPurple } from '@mui/material/colors';
import axios from  'axios';
import Edit from "../Edit-profile/edit-profile"


const index = () => {

  const [users, setUsers] = useState([]);
 const [crrunteUser , setCrrunteUser]=useState([])
 const [showEdit, setShowEdit] = useState(false); // Initially set to true

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data.users);
      console.log("users", response)
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

 
   
    const fetchcrruntuser = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/auth/profile', {
                withCredentials: true
            });
           
           console.log("new profile",response.data.data)
           setCrrunteUser(response.data.data)

        } catch (error) {
            console.error('Error fetching user data: ', error);
       
        }
    };
   
  

  useEffect(() => {
    fetchUsers();
    fetchcrruntuser()
  }, []);


  const handleProfileClick = ()=>{
    setShowEdit(true)
  }
  const handleCloseClick = (handleCloseClick)=>{
    setShowEdit(handleCloseClick)
  }

  return (





    <div className='w-[444px] p-3 border-black shadow-lg flex gap-3 flex-col'>


      <span className='flex flex-col gap-3'>

        <span className="crrunt-user flex gap-2 items-center cursor-pointer" onClick={handleProfileClick}>
          <Avatar alt="Travis Howard" src={crrunteUser.profileImageUrl}/>
          <h1 className='text-2xl text-purple-800'>{crrunteUser.firstName}</h1>
        </span>



        <div className="search-input  ">
          <label className="input input-bordered flex items-center gap-2 p-3">
            <input type="text" className="grow border-purple-800 border-b-2  " placeholder="Search" />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
          </label>
        </div>

      </span>


      <span className="allusers flex flex-col gap-2">
        {users.map(user => (
          <span key={user._id} className="allusers flex flex-col gap-2 cursor-pointer shadow-md p-2">
            <span className="crrunt-user flex gap-2 items-center">
              <Avatar alt={user.firstName} src={user.profileImageUrl}
                sx={{ bgcolor: deepPurple[500], width: "80px", height: "80px" }} />
              <h1 className='text-2xl text-purple-800'>{user.firstName}</h1>

            </span>
          </span>
        ))}
      </span>


      {showEdit && <div className='fixed flex justify-center items-center bg-purple-200'><Edit onSubmit={handleCloseClick} handleCloseClick={handleCloseClick} /></div>}
    

    </div>
  )
}

export default index
