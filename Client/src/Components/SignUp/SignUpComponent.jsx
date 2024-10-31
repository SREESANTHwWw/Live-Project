import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoArrowForwardOutline } from "react-icons/io5";
import { AiFillShop } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { PiPhoneCall } from "react-icons/pi";
import { BsWhatsapp } from "react-icons/bs";
import { FaRegAddressBook } from "react-icons/fa";
import { PiCity } from "react-icons/pi";
import { IoLocationSharp } from "react-icons/io5";
import { HiHashtag } from "react-icons/hi";
import { RiLock2Fill } from "react-icons/ri";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";

const SignUpComponent = () => {

   const [shopName , setShopname] = useState("")
   const [ownerName , setOwnername] = useState("")
   const [phoneNumber , setPhoneNumber] = useState("")
   const [whatsApp , setWhatsapp] = useState("")
   const [address , setAddress] = useState("")
   const [city , setCity] = useState("")
   const[pincode, setPincode] = useState("")
   const [ gstNumber , setGstNumber] = useState("")
   const[username , setUsename] = useState("")
   const [password, setPasswod] = useState("")
   const [visible ,setVisible] = useState(false)








  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[80rem] sm:h-[40rem] h-full bg-slate-200 flex flex-col rounded-md gap-10  shadow-lg ">
        <div className="w-full h-[6rem]  flex flex-col justify-center items-center">
          <span className="text-[2rem] text-blue-950 font-bold">Register</span>
          <span className="font-medium">Create your new Account</span>
        </div>

        <from>
          <div className="w-full sm:flex  sm:flex-row sm:justify-around  flex flex-col items-center  sm:h-[27rem]  bg-slate-200   ">
            <div className="w-[24rem]  h-[27rem]  flex flex-col justify-around items-center py-9   ">
        
              <input
                className="w-[20rem] h-[3rem] rounded-xl shadow-lg outline-none focus:border-blue-950 placeholder:text-center px-8 "
                type="text"
                placeholder="Shop name"
                value={shopName}
                required
                onChange={(e)=>setShopname(e.target.value)}
              />
               <AiFillShop className=" size-7 relative text-yellow-500 right-36 bottom-8 text-[20px]" />
             
              <input
                className="w-[20rem] h-[3rem] rounded-xl shadow-lg outline-none focus:border-blue-950 placeholder:text-center px-8 "
                type="text" placeholder="Owner name"
                value={ownerName}
                required
                onChange={(e)=>setOwnername(e.target.value)}
              />
                  <FaRegUser className="relative text-yellow-500 right-36 bottom-8 text-[20px]"/>
               
              <input
                className="w-[20rem] h-[3rem] rounded-xl shadow-lg outline-none focus:border-blue-950 placeholder:text-center px-7 "
                type="text" placeholder="Phone Number"
                value={phoneNumber}
                required
                onChange={(e)=>setPhoneNumber(e.target.value)}
              />
                 
                 <PiPhoneCall className="relative bottom-8 right-36 text-yellow-500 text-[20px]" />
              <input
                className="w-[20rem] h-[3rem] rounded-xl shadow-lg outline-none focus:border-blue-950 placeholder:text-center px-7 "
                type="text"  placeholder="Whatsapp"
                value={whatsApp}
                required
                onChange={(e)=>setWhatsapp(e.target.value)}
              />
              <BsWhatsapp  className="relative bottom-8 right-36 text-yellow-500 text-[20px]"  />
              <input
                className="w-[20rem] h-[3rem] rounded-xl shadow-lg outline-none focus:border-blue-950 placeholder:text-center px-7 "
                type="text"placeholder="Address"
                value={address}
                onChange={(e)=>setAddress(e.target.value)}
                required
              />
               
               <FaRegAddressBook  className="relative bottom-8 right-36 text-yellow-500 text-[20px]"/>
              <select
                className="w-[20rem] h-[3rem] bg-white rounded-xl shadow-lg outline-none "
                id=""
                name="" 
              >
                <option className="" value="kerala">
                  kerala
                </option>
                <option value="kerala"></option>
              </select>
            </div>

            <div className=" w-[24rem]  h-[25rem] flex flex-col justify-around items-center sm:flex  sm:items-start py-3 ">
           
              <input
                className="w-[20rem] h-[3rem] rounded-xl shadow-lg outline-none focus:border-blue-950 placeholder:text-center px-7 "
                type="text" placeholder="City"
                value={city}
                required
                onChange={(e)=>setCity(e.target.value)}
              />
                <PiCity  className="relative sm:mx-[150px] bottom-10 right-36 text-yellow-500 text-[20px]" />
              <input
                className="w-[20rem] h-[3rem] rounded-xl shadow-lg outline-none focus:border-blue-950 placeholder:text-center px-7 "
                type="text" placeholder="Pincode"
                value={pincode}
                required
                onChange={(e)=>setPincode(e.target.value)}

              />
                <IoLocationSharp className="relative sm:mx-[150px] bottom-10 right-36 text-yellow-500 text-[20px]" /> 
              <input
                className="w-[20rem] h-[3rem] rounded-xl shadow-lg outline-none focus:border-blue-950 placeholder:text-center px-7"
                type="text" placeholder="GST no. (Optional)"
                value={gstNumber}
                onChange={(e)=>setGstNumber(e.target.value)}
              />
              <HiHashtag  className="relative bottom-10 sm:mx-[150px] right-36 text-yellow-500 text-[20px]"/>
              <input 
                className="w-[20rem] h-[3rem] rounded-xl shadow-lg outline-none focus:border-blue-950 placeholder:text-center px-7"
                type="text" placeholder="Username"
                value={username}
                required
                onChange={(e)=>setUsename(e.target.value)}
              />
              <FaRegUser className="relative text-yellow-500 sm:mx-[150px] right-36 bottom-10 text-[20px]"/>
              <input 
                className="w-[20rem] h-[3rem] rounded-xl shadow-lg outline-none focus:border-blue-950 placeholder:text-center px-7"
                type={visible ? "text":"password"} placeholder="Password"
                value={password}
                required
                onChange={(e)=>setPasswod(e.target.value)}
              />
              <RiLock2Fill className="relative text-yellow-500 sm:mx-[150px] right-36 bottom-9 text-[20px]"/>
              {
                visible ?(<AiOutlineEye   size={"25px"}
                    className="relative sm:left-[290px] left-[130px] bottom-[58px] cursor-pointer "
                    onClick={() => setVisible(false)}
                    />):(<AiOutlineEyeInvisible size={"25px"}
                        className="relative sm:left-[290px] left-[130px] bottom-[58px] cursor-pointer "
                        onClick={() => setVisible(true)}/>)
              }
            </div>
          </div>
          <div className="w-full h-[6rem] flex justify-center items-center sm:pr-[324px] bg-slate-200  ">
            <IoArrowForwardOutline className="relative text-white left-[75px] sm:mx-[150px] sm:left-[225px] text-[20px]" />
            <button className="w-[13rem] h-[3rem] rounded-md bg-blue-950 text-white shadow-xl">
              Sign Up
            </button>
          </div>
          <div className="w-full   flex justify-center items-center bg-slate-200">
          <span className="text-slate-600">
            Don't have an account{" "}
            <Link to={"/login"}>
              <u className="text-blue-950 font-semibold">Sign in</u>
            </Link>{" "}
          </span>
        </div>
        </from>
      
      </div>
    </div>
  );
};

export default SignUpComponent;
