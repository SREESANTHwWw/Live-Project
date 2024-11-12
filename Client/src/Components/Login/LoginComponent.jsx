import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { RiLock2Fill } from "react-icons/ri";
import { IoArrowForwardOutline } from "react-icons/io5";
import { MdPermContactCalendar } from "react-icons/md";
import axios from "axios";
import { server } from "../../Server";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";

const LoginComponent = () => {
  const [name, setName] = useState("");
  const [pass, setPasswod] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const {loginUsguest} = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(`${server}/login.php`, {
        username: name,
        password: pass,
      })
      .then((res) => {
        if (res.data.msg === "success") {
          const userdata = { name, pass };

          localStorage.setItem("userdata", JSON.stringify(userdata));

          toast.success("Login successfully",{theme:"colored"},  );
          navigate("/");
          setName("");
          setPasswod("");
        } else {
          toast.error("Invalid Credentials" ,{theme:"colored"});
        }
      })
      .catch((err) => {
        console.log(err);

      });
  }; 
  const handleGuest = ()=>{

   if(loginUsguest){
    toast.success("Guest Mode",{theme:"colored"})
   }
    navigate('/')


  }





  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full sm:w-[500px] sm:h-[500px] h-screen flex flex-col items-cente justify-center   bg-white p-8 rounded-lg shadow-lg ">
        <div className="text-center mb-8">
          <span className="text-2xl text-blue-950 font-semibold">Welcome Back</span>
          <p className="text-gray-500 mt-2">Login to your Account</p>
        </div>
        <div className=" grid grid-cols-1 items-center ">
        <form onSubmit={handleSubmit}>
          <div className="mb-5 relative">
            <FaRegUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
            <input
              className="w-full h-12 pl-12 pr-4 rounded-md shadow-lg border focus:border-blue-950 outline-none placeholder:text-gray-500"
              type="text"
              placeholder="Username"
              value={name}
           
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-6 relative">
            <RiLock2Fill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
            <input
              className="w-full h-12 pl-12 pr-12 rounded-md shadow-lg border focus:border-blue-950 outline-none placeholder:text-gray-500"
              type={visible ? "text" : "password"}
              placeholder="Password"
           
              maxLength={8}
              value={pass}
              onChange={(e) => setPasswod(e.target.value)}
            />
            {visible ? (
              <AiOutlineEye
                size={25}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setVisible(false)}
              />
            ) : (
              <AiOutlineEyeInvisible
                size={25}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setVisible(true)}
              />
            )}
          </div>

          <div className="mb-6 flex flex-col gap-4">
            <button className="w-full h-12 bg-blue-950 text-white rounded-md shadow-xl hover:bg-blue-800 transition-all duration-300">
              <IoArrowForwardOutline size={20} className="inline mr-2" />
              Sign In
            </button>
            <button className="w-full h-12 bg-yellow-600 text-white rounded-md shadow-xl hover:bg-yellow-500 transition-all duration-300" onClick={handleGuest}>
              <MdPermContactCalendar size={20} className="inline mr-2" />
              Guest
            </button>
          </div>

          <div className="text-center">
            <span className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-950 font-semibold">
                Sign Up
              </Link>
            </span>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
