import React, { useContext, useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { HiOutlineShoppingCart } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { TbHome } from "react-icons/tb";
import { ProductsContext } from '../Components/Context/ProductsContext';

const Navbar = () => {

 const {product ,searchfunction,searchData} = useContext(ProductsContext)








 const navigate = useNavigate() 
const navLoginPage = ()=>{
   navigate('/login')
   
}

  return (
    <>
    <div className='w-full h-[7rem] bg-slate-200 shadow-md flex flex-col sm:w-full md:w-full '>
    <div className='w-full h-[3rem] bg-blue-950 text-white flex justify-center items-center'>
    <div className="overflow-hidden w-full max-w-lg mx-auto  ">
            <div className="flex scrolling-text whitespace-nowrap ">
              
                <span className=" mr-8   font-medium text-white ">Up to 40% Off</span>
                <span className=" font-medium text-white mr-8">blaaaaaaa</span>
                <span className=" font-medium text-white mr-8">welcome</span>
                
               
                <span className=" font-medium text-white mr-8">Up to 40% Off</span>
                <span className=" font-medium text-white mr-8">blaaaaaa</span>
                <span className=" font-medium text-white mr-8">welcome</span>
             
            </div>
        </div>
       
              


    </div>
    <div className='w-full h-[7rem] flex justify-around items-center'>

    <div className='sm:w-[60%] h-[5rem] w-[22rem] flex justify-around mx-8 gap-7   items-center '>
       <img className='' src=''/>
        
       <input className='w-[25rem] h-[3rem] rounded-md outline-none sm:px-9 px-5' type="search" placeholder='Search' value={searchData} onChange={searchfunction} />
       <IoSearch className='relative sm:right-[537px] right-[305px] sm:text-2xl text-[25px] text-gray-400'/>
       </div>
       <div className='w-[25%] h-[5rem]  sm:flex justify-between items-center hidden   '>
       <div className='w-[30px] h-[70px] flex flex-col justify-center items-center'>
       <Link to={'/'}  className= 'text-base font-bold'><TbHome   className= 'text-2xl text-blue-950 hover:text-yellow-600  '/></Link>
       <span className='text-[12px] font-bold tracking-wide  text-blue-950 hover:text-yellow-500 cursor-pointer'>Home</span>
       </div>
       <div className='w-[30px] h-[70px] flex flex-col justify-center items-center'>
       <Link to={'/cart'}><HiOutlineShoppingCart className='text-2xl text-blue-950 hover:text-yellow-600 '/></Link>
       <span className='text-[12px] font-bold tracking-wide text-blue-950 hover:text-yellow-500 cursor-pointer '>Cart</span>
       </div>
       <div className='w-[30px] h-[70px] flex flex-col justify-center items-center'>
       <Link to={'/profile'}><CgProfile className='text-2xl text-blue-950 hover:text-yellow-600 '/></Link>
       <span className='text-[12px] font-bold tracking-wide cursor-pointer  text-blue-950 hover:text-yellow-500'>Account</span>
       </div>
       <button className='w-28 h-10 bg-blue-950 rounded-2xl hover:border-[2px] hover:border-slate-200  hover:bg-yellow-600 text-white hover:text-blue-950 tracking-widest font-medium' onClick={navLoginPage}>Login</button>


       </div>

          
</div>
   
    </div>
    <Outlet/>
   
    </>
  )
}

export default Navbar