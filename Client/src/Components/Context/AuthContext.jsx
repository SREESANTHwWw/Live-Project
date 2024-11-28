import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { server } from "../../Server";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [userType, setUserType] = useState(""); // Use a string for user type like 'admin', 'user'
  const [userData, setUserData] = useState([]);
  
  const [isAuthenticated, setAuthenticated] = useState(false);


  // Guest login handler
  const loginAsGuest = () => {
    const guestUser = {
      username: "guest",
      type: "guest", // Assuming "guest" is a valid user type in your backend
    };
  };


        
  // useEffect(() => {
  //   // Fetch all users (this can be removed if you don’t need this data globally)
  //   axios
  //     .get(`${server}/get-users`)
  //     .then((res) => setUserData(res.data.getusers));
  // }, []);
console.log(userData)
  return (
    <AuthContext.Provider
      value={{
        loginAsGuest,
        userData,
        setUserData,
        isAuthenticated,
        setAuthenticated,
        userType,
        setUserType,
       
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
