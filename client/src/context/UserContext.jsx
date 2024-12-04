import { createContext, useContext, useEffect, useState } from "react";
import { UserApi } from "../api";

const UserContext = createContext();

// custom hook for using context
export const useUsers = () => {
    return useContext(UserContext)
}

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [userLoading, setUserLoading] = useState(true);

    const fetchUsers = async()=>{
        try {
            const data = await UserApi.getUsers();
            console.log("Data inside context",data);
            setTimeout(()=>{
                setUsers(data);
                setUserLoading(false);
            },3000);  
          
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchUsers();
    },[])

    return (
        <>
            <UserContext.Provider value={{ users,setUsers, userLoading }}>
                {children}
            </UserContext.Provider>
        </>
    )
}
