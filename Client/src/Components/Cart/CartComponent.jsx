import React, { useContext } from "react";
import Navbar from "../../Pages/Navbar";
import { ProductsContext } from "../Context/ProductsContext";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const CartComponent = () => {
  const { cart, setCart } = useContext(ProductsContext);
 const navigate = useNavigate()
  const qtyinc = (id) => {
    setCart(cart.map((item) => (item._id === id ? { ...item, qty: item.qty + 1 } : item)));
  };

  const qtydec = (id) => {
    setCart(
      cart
        .map((item) => (item._id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item._id !== id));

  };
  const checkout = ()=>{
  navigate("/checkout") 
    
  }

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen mt-[8rem]">
      <Navbar />
      <div className="w-[80%] flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-blue-950">Cart Items</h2>
      </div>
      <div className=" w-[90%] sm:hidden mb-6 p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-col items-center gap-6">
            {cart.length > 0 ? (
              <div className="flex flex-col items-center gap-6">
                <span className="text-xl font-semibold text-gray-700">
                  Subtotal: ₹
                  {cart.reduce((total, item) => total + item.price * item.qty, 0)}
                </span>
                <button className="w-full py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300">
                  Proceed to Buy
                </button>
              </div>
            ) : (
              <span className="text-gray-600">Your cart is empty</span>
            )}
          </div>

      </div>

      <div className="w-full flex flex-row justify-center  gap-5">
        <div className="w-[80%] lg:w-[60%] ">
          {cart.length > 0 ? (
            <div className="flex  flex-col gap-8">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex sm:flex-row flex-col items-center p-4 bg-white rounded-lg shadow-lg border border-gray-300 hover:shadow-xl transition duration-200"
                >
                  <img
                    className="w-[100px] h-[100px] object-contain rounded-md"
                    src={item.product_img}
                    alt={item.productname}
                  />

                  <div className="flex-1 flex flex-col gap-2 ml-6">
                    <span className="text-lg font-semibold text-blue-950">{item.productname}</span>
                    <span className="text-sm text-gray-600">{item.description}</span>
                    <div className="flex items-center gap-4 mt-2">
                      <button
                        className="w-[30px] h-[30px] flex items-center justify-center border border-gray-300 text-black font-extrabold rounded-md hover:bg-gray-200"
                        onClick={() => qtydec(item._id)}
                      >
                        -
                      </button>
                      <span className="font-bold text-lg">{item.qty}</span>
                      <button
                        className="w-[30px] h-[30px] flex items-center justify-center border border-gray-300 text-black font-extrabold rounded-md hover:bg-gray-200"
                        onClick={() => qtyinc(item._id)}
                      >
                        +
                      </button>
                    </div>
                    <span className="text-xl font-semibold text-black-600">Price: ₹{item.price}</span>
                  </div>
                  <div className="sm:w-[30px]  w-full items-start sm:h-[200px] flex justify-end">
                  <button
                    className=" text-red-500 hover:text-red-700 transition duration-200"
                    onClick={() => removeItem(item._id)}
                  >
                    <MdDelete size={24} />
                  </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 p-8 bg-white rounded-lg shadow-md">
              <p className="text-lg font-medium text-gray-700">🛒 Your cart is empty.</p>
              <p className="text-sm text-gray-500">Browse products and add items to your cart.</p>
            </div>
          )}
        </div>

        <div className="w-[80%] lg:w-[20%] hidden h-[200px] lg:block sm:block sm:w-[20%] shadow-md rounded-md border bg-white p-4">
          <div className="flex flex-col items-center gap-6">
            {cart.length > 0 ? (
              <div className="flex flex-col items-center gap-6">
                <span className="text-xl font-semibold text-gray-700">
                  Subtotal: ₹
                  {cart.reduce((total, item) => total + item.price * item.qty, 0)}
                </span>
                <button className="w-full py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300" onClick={checkout}>
                  Proceed to Buy
                </button>
              </div>
            ) : (
              <span className="text-gray-600">Your cart is empty</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartComponent;
