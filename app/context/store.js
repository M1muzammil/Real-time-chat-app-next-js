'use client';

import { createContext, useContext, useState , useEffect} from "react";

import axios from "axios";
const GlobalContext = createContext({
    userRole:  "",
    setUserRole: () => '',
});

export const GlobalContextProvider = ({ children }) => {
    const [userRole, setUserRole] = useState('');
    useEffect(() => {
   
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/auth/profile', {
                    withCredentials: true
                });
               
               console.log(response)

                if (response.status===200) {
                    console.log("User is an Admin");
                    setUserRole('login')
                    console.log(userRole)
                } else {
                    setUserRole('non-login')
                    console.log(userRole)
                }
            } catch (error) {
                console.error('Error fetching user data: ', error);
            setUserRole("unauth")
            }
        };
        fetchData();
    }, []); 

    



    return (
        <GlobalContext.Provider value={{ userRole, setUserRole }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
