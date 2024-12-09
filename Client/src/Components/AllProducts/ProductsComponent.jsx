import React, { useContext } from 'react'
import HomeProductsComponent from '../HomeProducts/HomeProductsComponent'
import { ProductsContext } from '../Context/ProductsContext'
import Navbar from '../../Pages/Navbar'
import '../../app.css'

const ProductsComponent = () => {

  const {product ,filterData , Addtocartfun,formatPrice} = useContext(ProductsContext)

   
  return (
    <div className='w-full flex justify-center items-center flex-col mt-[7rem] '>
        <Navbar/>

        <div className="w-[85%] grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-10">
        {filterData.map((product, index) => (
            <div
              key={index}
              className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 duration-300 overflow-hidden"
            >
              {/* Product Image */}
              <img
                className="w-full h-56 object-cover"
                src={product.product_img}
                alt={product.productname}
              />

              {/* Product Content */}
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  {/* Product Name */}
                  <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">
                    {product.productname}
                  </h3>

                  {/* Product Description */}
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Price Section */}
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-500 line-through">
                      MRP: {formatPrice(product.mRP)}
                    </p>
                    <p className="text-xl font-bold text-green-600">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => Addtocartfun(product)}
                  className="mt-4 w-full py-2 bg-blue-950 text-white font-semibold rounded-md hover:bg-yellow-600 transition duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
          </div>

    </div>
  )
}

export default ProductsComponent