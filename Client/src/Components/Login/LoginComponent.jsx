import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { RiLock2Fill } from "react-icons/ri";
import { IoArrowForwardOutline } from "react-icons/io5";
import { MdPermContactCalendar } from "react-icons/md";

const LoginComponent = () => {
  const [name, setName] = useState("");
  const [pass, setPasswod] = useState("");
  const [visible, setVisible] = useState(false);

  return (
    <div className="w-full h-screen  flex justify-center items-center ">
      <div className=" sm:w-[33rem] sm:h-[39rem] h-full w-full bg-slate-200 rounded-md shadow-md   ">
        <div className="w-full h-[12rem]  flex flex-col items-center justify-center">
          <span className="text-[2rem] text-blue-950 font-semibold">
            {" "}
            Welcome Back
          </span>
          <span className="font-medium">Login to your Account</span>
        </div>
        <form>
          <div className="w-full h-[12rem]  justify-center flex flex-col  items-center">
       
             <FaRegUser className="relative text-yellow-500 right-36 top-[34px] text-[20px]"/>
            <input
              className="w-[20rem] h-[3rem] rounded-md shadow-lg outline-none placeholder:text-center px-7"
              type="text"
              placeholder="Username"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          
          <RiLock2Fill className="relative text-yellow-500 right-36 top-[34px] text-[20px]" />
            <input
              className="w-[20rem] h-[3rem] rounded-md shadow-lg outline-none focus:border-blue-950 placeholder:text-center px-7"
              type={visible ? "text " : "password"}
              placeholder="Password"
              required
              value={pass}
              onChange={(e) => setPasswod(e.target.value)}
              
            />
            
            
            {visible ? (
              <AiOutlineEye
                size={"25px"}
                className="relative left-[140px] bottom-[37px] cursor-pointer "
                onClick={() => setVisible(false)}
              />
            ) : (
              <AiOutlineEyeInvisible
                size={"25px"}
                className="relative left-[140px] bottom-[37px] cursor-pointer "
                onClick={() => setVisible(true)}
              />
            )}
            
            
          </div>
          
          <div className="w-full h-[10rem]   flex flex-col   items-center">
          <IoArrowForwardOutline className="relative text-white right-10 top-[37px] text-[20px]"/>
            <button className="w-[20rem] h-[3rem] rounded-md bg-blue-950 text-white shadow-xl">
            
              Sign in
            </button>
            <MdPermContactCalendar className="relative text-white right-10 top-[37px] text-[20px]"/>
            <button className="w-[20rem] h-[3rem] rounded-md bg-yellow-600  text-white shadow-xl">
              {" "}
              Guest
            </button>
          </div>
          <div className="w-full h-full flex justify-center items-center">
            <span>
              Don't have an account{" "}
              <Link to={"/signup"}>
                <u className="text-blue-950 font-semibold">Signup</u>
              </Link>{" "}
            </span>
          </div>
        </form>
      </div>
      
    </div>
  );
};

export default LoginComponent;
