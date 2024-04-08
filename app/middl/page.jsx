"use client"
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { useGlobalContext } from '../context/store';

const Middleware = () => {
    const { userRole } = useGlobalContext();
    const [isLoading, setIsLoading] = useState(true);
console.log("user",userRole)
    useEffect(() => {
        if (userRole !== '') {
            // Check if userRole is not empty
            setIsLoading(false);
            if (userRole === 'login') {
                console.log("aaaaa")
                redirect('/pages/chats');
            } else  {
                redirect('/pages/login');
            } 
        }
    }, [userRole]);


    

    return null;
};

export default Middleware;
