import React, { useContext, useState } from "react";
import { FiArrowLeftCircle, FiLogOut } from "react-icons/fi";
import { BiMessageSquareEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { AiFillShop } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { PiPhoneCall } from "react-icons/pi";
import { BsWhatsapp } from "react-icons/bs";
import { FaRegAddressBook } from "react-icons/fa";
import { PiCity } from "react-icons/pi";
import { IoLocationSharp } from "react-icons/io5";
import { HiHashtag } from "react-icons/hi";

const Profile = () => {
  const navigate = useNavigate();
  const editpage = () => navigate("/editpage");
  const navtoHome = () => navigate("/");

  const logout = () => {
    localStorage.clear(userData);
    navigate("/");
  };

  const localdata = localStorage.getItem("userdata");
  const userData = localdata ? JSON.parse(localdata) : [];
  console.log(userData);

  const [shopname, setShopname] = useState(userData?.shopname || "");
  const [owner, setOwnername] = useState(userData?.owner || "");
  const [phonenumber, setPhoneNumber] = useState(userData?.phonenumber || "");
  const [whatsappno, setWhatsapp] = useState(userData?.whatsappno || "");
  const [address, setAddress] = useState(userData?.address || "");
  const [city, setCity] = useState(userData?.city || "");
  const [pincode, setPincode] = useState(userData?.pincode || "");
  const [gstno, setGstNumber] = useState(userData?.gstno || "");
  const [username, setUsename] = useState(userData?.username || "");
  const [stateid, setSelectedCity] = useState(userData?.stateid || "");

  const signupvalues = [
    { icon: <AiFillShop />, placeholder: "Shop Name", value: shopname, setValue: setShopname },
    { icon: <FaRegUser />, placeholder: "Owner Name", value: owner, setValue: setOwnername },
    { icon: <PiPhoneCall />, placeholder: "Phone Number", value: phonenumber, setValue: setPhoneNumber },
    { icon: <BsWhatsapp />, placeholder: "WhatsApp", value: whatsappno, setValue: setWhatsapp },
    { icon: <FaRegAddressBook />, placeholder: "Address", value: address, setValue: setAddress },
    { icon: <PiCity />, placeholder: "City", value: city, setValue: setCity },
    { icon: <PiCity />, placeholder: "State", value: stateid, setValue: setSelectedCity },
    { icon: <IoLocationSharp />, placeholder: "Pincode", value: pincode, setValue: setPincode },
    { icon: <HiHashtag />, placeholder: "GST No. (Optional)", value: gstno, setValue: setGstNumber },
    { icon: <FaRegUser />, placeholder: "Username", value: username, setValue: setUsename },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center pt-16">
      <Navbar />
      <div className="w-full sm:w-3/4 lg:w-[100%] mx-auto mt-8 p-8 h-full bg-white rounded-3xl shadow-lg">
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
            className="flex items-center text-sm text-red-600 hover:text-red-700 transition-all duration-300"
          >
            <FiLogOut className="mr-2 text-lg" />
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
              className="flex items-center p-3 bg-gray-50 rounded-lg shadow-sm transition-shadow duration-300"
            >
              <div className="text-yellow-600 text-2xl mr-3 leading-none">{icon}</div>
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
        <div className="flex justify-center mt-4">
          <button
            className="w-[10%] h-[2.5rem] bg-blue-950 text-white rounded-full shadow-md hover:bg-blue-600 transition-all duration-300 flex items-center justify-center gap-2"
            onClick={editpage}
          >
            Edit Profile
            <BiMessageSquareEdit className="text-white text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
