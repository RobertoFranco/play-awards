import { useEffect, useState } from "react";
import { setAuthToken } from "../services/httpService";
import UserContext from './context/UserContext';

const UserProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const t = localStorage.getItem("token");
        if(!t) return;
        
        setToken(t);
        setAuthToken(t);
    }, [])

    const setUserToken = (token) => {
        setToken(token);
        localStorage.setItem("token", token);
    }

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
        window.location = "/";
    }

    return <UserContext.Provider value={{ token, setUserToken, logout }}>
        {children}
      </UserContext.Provider>
  };
  
  export default UserProvider;