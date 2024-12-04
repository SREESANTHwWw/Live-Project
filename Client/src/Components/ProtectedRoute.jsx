import React, { useContext, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated,adminData } = useContext(AuthContext);
  const navigate = useNavigate()

  useEffect(()=>{
    if ( !adminData ) {
      navigate('/login');
   }
   else if (adminData==="admin") {
    navigate('/admin');
  }

  },[navigate,isAuthenticated ])

  
 
  return children;
};

export default ProtectedRoute;
