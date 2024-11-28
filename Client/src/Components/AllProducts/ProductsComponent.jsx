import React, { useContext } from 'react'
import HomeProductsComponent from '../HomeProducts/HomeProductsComponent'
import { ProductsContext } from '../Context/ProductsContext'
import Navbar from '../../Pages/Navbar'
import '../../app.css'

const ProductsComponent = () => {

  const {product ,filterData ,addtoCart} = useContext(ProductsContext)

   
  return (
    <div className='w-full flex justify-center items-center flex-col mt-[7rem] '>
        <Navbar/>

        <div className="w-[85%] grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-10">
          {filterData.map((product, index) => (
            <div
              key={index}
              className="flex flex-col  items-center justify-between bg-slate-200 p-6 rounded-lg shadow-lg border border-blue-950 hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <img
                className="w-[150px] h-[150px] object-contain mb-4"
                src={product.image}
                alt={product.productname}
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
                <button className="w-[200px] h-[40px] bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
       
        

    </div>
  )
}

export default ProductsComponent