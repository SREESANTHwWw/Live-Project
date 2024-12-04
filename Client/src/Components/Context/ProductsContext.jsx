import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { server } from "../../Server";
import { toast } from "react-toastify";

export const ProductsContext = createContext();

const ProductsContextProvider = (props) => {
  const [product, setProducts] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios
      .get(`${server}/get-products`)
      .then((res) => setProducts(res.data.product))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch products");
      });
  }, []);

  useEffect(() => {
    if (!searchData) {
      setFilterData(product);
    } else {
      const filteredSearchData = product.filter(
        (res) =>
          res.productname.toLowerCase().includes(searchData)
          
      );
      setFilterData(filteredSearchData);
    }
  }, [searchData, product]);

  const searchfunction = (e) => {
    setSearchData(e.target.value.toLowerCase());
  };



  const addtoCart = (product) => {
   
  
 
   
    const existingItem = cart.find((item) => item._id === product._id);

    if (existingItem) {
      setCart(cart);
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    toast.success(`${product.productname} added to cart`, { theme: "colored" });

  
  };
  return (
    <ProductsContext.Provider
      value={{
        product,
        searchfunction,
        filterData,
        searchData,
        addtoCart,
        cart,
        setCart
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
