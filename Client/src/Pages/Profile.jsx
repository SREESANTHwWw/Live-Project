import React, { useContext } from "react";
import { FaRegUser } from "react-icons/fa";
import { FiArrowLeftCircle } from "react-icons/fi";
import { BiMessageSquareEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { SignupInputValContext } from "../Components/Context/SignupInputValContext";
import { AuthContext } from "../Components/Context/AuthContext";

const Profile = () => {
  const navigate = useNavigate();
  const { signupvalues } = useContext(SignupInputValContext);
  const { userData,setUserData } = useContext(AuthContext);

  const editpage = () => navigate("/editpage");
  const navtoHome = () => navigate("/");
  const logout = () => {
    localStorage.clear(userData)
    navigate("/login");

  }
  


  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center pt-16">
      <Navbar />
      <div className="w-full sm:w-3/4 lg:w-[85%] mx-auto mt-8 p-8 h-full bg-white rounded-3xl shadow-lg">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={navtoHome}
            className="text-3xl text-yellow-500 hover:text-blue-950 transition-all duration-300"
          >
            <FiArrowLeftCircle />
          </button>
          <h2 className="text-2xl font-semibold text-blue-950 leading-tight">
            Account Overview
          </h2>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-all duration-300"
          >
            Logout
          </button>
        </div>

        {/* Profile Picture Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-2">
            <FaRegUser className="text-blue-950 text-4xl leading-none" />
          </div>
          <h3 className="text-xl font-medium text-blue-950 leading-tight">
            {userData?.username || " "}
          </h3>
          
        </div>

        {/* User Information Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          {signupvalues.map(({ icon, placeholder, value }, index) => (
            <div
              key={index}
              className="flex items-center p-3 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="text-blue-600 text-xl mr-3 leading-none">{icon}</div>
              <div>
                <span className="block text-xs text-gray-600 leading-none">{placeholder}</span>
                <span className="block text-base text-blue-950 font-medium leading-tight">
                  {value || "N/A"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            className="w-[48%] h-[2.5rem] bg-blue-950 text-white rounded-full shadow-md hover:bg-blue-600 transition-all duration-300 flex items-center justify-center gap-2"
            onClick={editpage}
          >
            Edit Profile
            <BiMessageSquareEdit className="text-white text-lg" />
          </button>
          <button
            className="w-[48%] h-[2.5rem] bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-all duration-300 text-sm"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
