import React, { useContext, useEffect, useState } from "react";
import { TbSquareRoundedArrowRight } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { ProductsContext } from "../Context/ProductsContext";
import axios from "axios";
import { server } from "../../Server";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";

const HomeProductsComponent = () => {
  const navigate = useNavigate();
  const { filterData , } = useContext(ProductsContext);
  const { userData ,setUserData,authData } = useContext(AuthContext);
  const [image ,setimage] = useState("")
  const [cart, setCart] = useState([]);
  

  const navtoProducts = () => {
    navigate("/products");
  };
  useEffect(() => {
    // Retrieve and parse user data from localStorage
    const authData = localStorage.getItem("userData");
    if (authData) {
      JSON.parse(authData);
    }
  }, []);




  const addtoCart = (product) => {
    console.log(authData)
  
 
    if(!authData){
      navigate("/login")
      return;
    }else{
      const existingItem = cart.find((item) => item._id === product._id);

      if (existingItem) {
        setCart(cart);
      } else {
        setCart([...cart, { ...product, qty: 1 }]);
      }
      toast.success(`${product.productname} added to cart`, { theme: "colored" });

    }

  
  };

  // useEffect(()=>{
  //  axios.get(`${server}/get-image`)
  //  .then((res)=>setimage(res.data))

  // },[])

  

  return (
    <div className="w-full flex justify-center items-center bg-gray-100 py-10 ">
      <div className="w-full max-w-7xl flex flex-col items-center bg-white p-10 rounded-lg shadow-2xl">
        <div className="w-full flex justify-between items-center mb-8">
          <span className="text-2xl font-bold text-blue-950 hover:text-yellow-500 cursor-pointer transition-all relative before:transition-[width] before:duration-700 before:absolute before:bg-blue-950 before:bottom-0 before:left-[50%] before:h-[2px] before:w-0 hover:before:w-[50%] after:transition-[width] after:duration-700 after:absolute after:bg-blue-950 after:bottom-0 after:right-[50%] after:h-[2px] after:w-0 hover:after:w-[50%]">
            New Fast Moving Products
          </span>
          <button
            onClick={navtoProducts}
            className="text-3xl text-yellow-500 hover:text-blue-950 transition duration-300"
          >
            <TbSquareRoundedArrowRight />
          </button>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filterData.map((product, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-between bg-slate-200 p-6 rounded-lg shadow-lg border border-blue-950 hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <img
                className="w-[150px] h-[150px] object-contain mb-4"
                src={product.image }
                alt={product.name}
              />

              <div className="text-center">
                <span className="block text-lg font-semibold text-blue-950 mb-1">
                  {product.productname}
                </span>
                <span className="block text-md font-medium text-gray-700 mb-1">
                  Qty {product.minimum_order_quantity}
                </span>
                <span className="block text-xl font-bold text-yellow-500">
                  ₹{product.price}
                </span>
              </div>

              <div className="flex flex-col gap-3 mt-4">
                <button className="w-[200px] h-[40px] bg-blue-950 text-white rounded-md hover:bg-blue-800 transition duration-300" onClick={()=>addtoCart(product)} >
                  Add to Cart
                </button>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeProductsComponent;
