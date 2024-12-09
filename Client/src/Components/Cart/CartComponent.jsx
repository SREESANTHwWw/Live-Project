import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../Pages/Navbar";
import { ProductsContext } from "../Context/ProductsContext";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../Server";

const CartComponent = () => {
  const { formatPrice } = useContext(ProductsContext);
  const localdata = localStorage.getItem("user_id");
  const userId = localdata ? JSON.parse(localdata) : [];
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const qtyinc = (id) => {
    setCart(cart.map((item) => (item.Product_id === id ? { ...item, qty: item.minimum_order_quantity + 1 } : item)));
  };

  const qtydec = (id) => {
    setCart(
      cart
        .map((item) => (item._id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id) => {
    axios.delete(`${server}/removeFromcart/${userId}/${id}`).then((res) => setCart(res.data.cart.items));
  };

  const checkout = () => {
    navigate("/checkout");
  };

  useEffect(() => {
    axios.get(`${server}/getAll-cart/${userId}`).then((res) => setCart(res.data.cart.items));
  }, [userId]);

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen mt-[8rem]">
      <Navbar />
      <div className="w-[90%] sm:w-[80%] lg:w-[60%] flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-blue-950">Shopping Cart</h2>
      </div>

      {/* Cart Items */}
      <div className="w-full flex flex-col sm:flex-row justify-center gap-5">
        <div className="w-full sm:w-[80%] lg:w-[60%] flex flex-col gap-8">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-center p-4 bg-white rounded-lg shadow-md border border-gray-300 hover:shadow-xl transition duration-200 relative"
              >
                <img
                  className="w-[120px] h-[120px] object-contain rounded-md"
                  src={item.product_img}
                  alt={item.productname}
                />

                {/* Product Details */}
                <div className="flex-1 flex flex-col gap-2 ml-6">
                  <span className="text-lg font-semibold text-blue-950">{item.productname}</span>
                  <span className="text-sm text-gray-600">{item.description}</span>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4 mt-2">
                    <button
                      className="w-[30px] h-[30px] flex items-center justify-center border border-gray-300 text-black font-extrabold rounded-md hover:bg-gray-200"
                      onClick={() => qtydec(item.Product_id)}
                    >
                      -
                    </button>
                    <span className="font-bold text-lg">{item.minimum_order_quantity}</span>
                    <button
                      className="w-[30px] h-[30px] flex items-center justify-center border border-gray-300 text-black font-extrabold rounded-md hover:bg-gray-200"
                      onClick={() => qtyinc(item.Product_id)}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price and MRP */}
                <div className="absolute flex flex-col items-center justify-center top-2 right-4">
                  <span className="text-xl font-semibold text-black-600">Price: {formatPrice(item.price)}</span>
                  <span className="text-sm font-semibold line-through text-gray-500">MRP: {formatPrice(item.mRP)}</span>
                </div>

                {/* Remove Item */}
                <div className="absolute bottom-2 right-4">
                  <button
                    className="text-red-500 hover:text-red-700 transition duration-200"
                    onClick={() => removeItem(item.Product_id)}
                  >
                    <MdDelete size={24} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center gap-4 p-8 bg-white rounded-lg shadow-md">
              <p className="text-lg font-medium text-gray-700">🛒 Your cart is empty.</p>
              <p className="text-sm text-gray-500">Browse products and add items to your cart.</p>
            </div>
          )}
        </div>

        {/* Cart Summary (Desktop) */}
        <div className="w-full sm:w-[20%] lg:w-[20%] shadow-md rounded-md border bg-white p-4 hidden sm:block">
          <div className="flex flex-col items-center gap-6">
            {cart.length > 0 ? (
              <div className="flex flex-col items-center gap-6">
                <span className="text-xl font-semibold text-gray-700">
                  Subtotal: {formatPrice(cart.reduce((total, item) => total + item.price * item.minimum_order_quantity, 0))}
                </span>
                <button
                  className="w-full py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300"
                  onClick={checkout}
                >
                  Proceed to Buy
                </button>
              </div>
            ) : (
              <span className="text-gray-600">Your cart is empty</span>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Cart Summary */}
      <div className="w-[90%] sm:hidden mb-6 p-4 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center gap-6">
          {cart.length > 0 ? (
            <div className="flex flex-col items-center gap-6">
              <span className="text-xl font-semibold text-gray-700">
                Subtotal: ₹
                {cart.reduce((total, item) => total + item.price * item.qty, 0)}
              </span>
              <button
                className="w-full py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300"
                onClick={checkout}
              >
                Proceed to Buy
              </button>
            </div>
          ) : (
            <span className="text-gray-600">Your cart is empty</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartComponent;
