import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { server } from "../../Server";
import { toast } from "react-toastify";

export const ProductsContext = createContext();

const ProductsContextProvider = (props) => {
 
  

  const [product, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${server}/get-products`)
      .then((res) => setProducts(res.data.product));
      
  }, []);

 

  const [searchData, setSearchData] = useState("");
  const [filterData, setFilterData] = useState(product);

  const searchfunction = (e) => {
    const getSearchData = e.target.value.toLowerCase();
    setSearchData(getSearchData);
  };

  useEffect(() => {
    if (!searchData) {
      setFilterData(product);
    } else {
      const filteredSearchData = product.filter(
        (res) =>
          res.productname.toLowerCase().includes(searchData) ||
          res.Product_id.toString().toLowerCase().includes(searchData)
      );
      setFilterData(filteredSearchData);
    }
  }, [searchData, product]);

  return (
    <ProductsContext.Provider
      value={{
        product,
        searchfunction,
        filterData,
        searchData,
      
       
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
