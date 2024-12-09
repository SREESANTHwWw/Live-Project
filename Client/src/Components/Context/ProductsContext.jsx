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

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(price);
  };

  // const addtoCart = (product) => {
   
  
 
   
  //   const existingItem = cart.find((item) => item._id === product._id);

  //   if (existingItem) {
  //     setCart(cart);
  //   } else {
  //     setCart([...cart, { ...product, qty: 1 }]);
  //   }


  
  // };
  
  const localdata = localStorage.getItem("user_id")

    const userId =   localdata ? JSON.parse(localdata):[]
   
  
   const Addtocartfun =(product)=>{
  
        const Product_id = product._id
        const  minimum_order_quantity  = product.minimum_order_quantity
        
        const productname  = product.productname
        const product_img  = product.product_img
        
        const price= product.price
        const  description = product.description
        const mRP= product.mRP
        
        console.log(Product_id,minimum_order_quantity,userId,price)
  
       axios.post(`${server}/addToCart`,{
           userId,
           Product_id,
           minimum_order_quantity ,
           productname,
           product_img,
           price,
           description,
           mRP
   
       }).then((res)=>{
        setCart(res.data.cart.items)
         toast.success(`${product.productname} added to cart`, { theme: "colored" });
          // const cart =res.data.cart.items;
          // localStorage.setItem("cartdata",JSON.stringify(cart))

          
          
  
       }).catch((err)=>{
          toast.error(err.response.data.msg)
  
       })
   
  
   }
  return (
    <ProductsContext.Provider
      value={{
        product,
        searchfunction,
        filterData,
        searchData,
        // addtoCart,
        cart,
        setCart,
        Addtocartfun,
        formatPrice
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
