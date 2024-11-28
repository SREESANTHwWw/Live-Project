import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { IoArrowForwardOutline } from "react-icons/io5";
import { AiFillShop } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { PiPhoneCall } from "react-icons/pi";
import { FaRegAddressBook } from "react-icons/fa";
import { PiCity } from "react-icons/pi";
import { IoLocationSharp } from "react-icons/io5";
import { HiHashtag } from "react-icons/hi";
import { FiArrowLeftCircle } from "react-icons/fi";
import Navbar from '../../Pages/Navbar';
import { useNavigate } from 'react-router-dom';

const ProfileEditComponent = () => {
    const [shopName, setShopname] = useState("");
    const [ownerName, setOwnername] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");
    const [gstNumber, setGstNumber] = useState("");
    const[state,setState]= useState("")
    const navigate = useNavigate();

    const toprofile = () => {
        navigate('/profile');
    };

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center gap-4 bg-gray-50 py-6">
          

            <div className="sm:w-[60rem] w-full max-w-7xl bg-white rounded-3xl sm:h-full h-screen shadow-xl px-8 py-6">
                <div className="flex items-center justify-between mb-6">
                    <button onClick={toprofile}>
                        <FiArrowLeftCircle className="text-3xl text-yellow-500 hover:text-blue-950" />
                    </button>
                    <div className="text-center flex flex-col">
                        <span className="text-3xl font-bold text-blue-950">Edit Profile</span>
                        <span className="text-lg text-gray-500 mt-2">Create your new Account</span>
                    </div>
                    <div className="w-8"></div>
                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-2 sm:grid-cols-1 gap-8">
                    <div className="space-y-6">
                        <div className="relative">
                            <input
                                className="w-full h-[3rem] rounded-xl bg-white border-2 border-gray-300 focus:border-blue-950 px-8"
                                type="text"
                                placeholder="Shop Name"
                                value={shopName}
                                onChange={(e) => setShopname(e.target.value)}
                            />
                            <AiFillShop className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
                        </div>

                        <div className="relative">
                            <input
                                className="w-full h-[3rem] rounded-xl bg-white border-2 border-gray-300 focus:border-blue-950 px-8"
                                type="text"
                                placeholder="Owner Name"
                                value={ownerName}
                                onChange={(e) => setOwnername(e.target.value)}
                            />
                            <FaRegUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
                        </div>

                        <div className="relative">
                            <input
                                className="w-full h-[3rem] rounded-xl bg-white border-2 border-gray-300 focus:border-blue-950 px-8"
                                type="text"
                                placeholder="Phone Number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            <PiPhoneCall className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
                        </div>

                        <div className="relative">
                            <input
                                className="w-full h-[3rem] rounded-xl bg-white border-2 border-gray-300 focus:border-blue-950 px-8"
                                type="text"
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <FaRegAddressBook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="relative">
                        <input
                                className="w-full h-[3rem] rounded-xl bg-white border-2 border-gray-300 focus:border-blue-500 px-8"
                                type="text"
                                placeholder="State"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                            <PiCity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
                           
                        </div>

                        <div className="relative">
                            <input
                                className="w-full h-[3rem] rounded-xl bg-white border-2 border-gray-300 focus:border-blue-950 px-8"
                                type="text"
                                placeholder="City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <PiCity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
                        </div>

                        <div className="relative">
                            <input
                                className="w-full h-[3rem] rounded-xl bg-white border-2 border-gray-300 focus:border-blue-950 px-8"
                                type="text"
                                placeholder="Pincode"
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                            />
                            <IoLocationSharp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
                        </div>

                        <div className="relative">
                            <input
                                className="w-full h-[3rem] rounded-xl bg-white border-2 border-gray-300 focus:border-blue-950 px-8"
                                type="text"
                                placeholder="GST No. (Optional)"
                                value={gstNumber}
                                onChange={(e) => setGstNumber(e.target.value)}
                            />
                            <HiHashtag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-center items-center mt-8">
                    <button className="w-[14rem] h-[3rem] rounded-xl bg-blue-950 text-white shadow-lg hover:bg-blue-700 transition-all duration-300">
                        Update
                    </button>
                    <IoArrowForwardOutline className="text-white text-2xl relative left-3" />
                </div>
            </div>
        </div>
    );
};

export default ProfileEditComponent;
