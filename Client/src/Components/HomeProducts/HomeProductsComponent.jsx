import React, { useContext, useEffect } from "react";
import { TbSquareRoundedArrowRight } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { ProductsContext } from "../Context/ProductsContext";

const HomeProductsComponent = () => {
  const navigate = useNavigate();
  const { filterData, Addtocartfun, formatPrice } = useContext(ProductsContext);

  // Navigate to the Products page
  const navtoProducts = () => {
    navigate("/products");
  };

  return (
    <div className="w-full flex justify-center items-center bg-gray-50 py-10">
      <div className="w-full max-w-7xl flex flex-col items-center px-6 lg:px-0">
        {/* Header Section */}
        <div className="w-full flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 tracking-wide">
            New Fast Moving Products
          </h2>
          <button
            onClick={navtoProducts}
            className="text-4xl text-yellow-500 hover:text-blue-700 transition-colors duration-300"
          >
            <TbSquareRoundedArrowRight />
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
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
    </div>
  );
};

export default HomeProductsComponent;
