import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./Pages/Navbar";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import CategoryComponent from "./Components/Category/CategoryComponent";

import Cart from "./Pages/Cart";
import Profile from "./Pages/Profile";
import ProfileEdit from "./Pages/ProfileEdit";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import ProductsContextProvider from "./Components/Context/ProductsContext";
import CategoryContextProvider from "./Components/Context/CategoryContext";
import SignupvalContextProvider from "./Components/Context/SignupInputValContext";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContextProvider, {
  AuthContext,
} from "./Components/Context/AuthContext";
import Admin from "./Components/Admin/Admin";
import AllUsers from "./Components/Admin/Users/AllUsers";
import ProtectedRoute from "./Components/ProtectedRoute";
import CheckoutPage from "./Pages/CheckoutPage";



const App = () => {

  const { isAuthenticated,adminData  } = useContext(AuthContext);

console.log(adminData);

  return (
    <div className="">
      <AuthContextProvider>
        <CategoryContextProvider>
          <SignupvalContextProvider>
            <ProductsContextProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Navbar />}>
                    <Route index element={<Home />} />
                  </Route>

                  {/* <Route
                    path="/admin"
                    element={
                      <ProtectedRoute>
                        <Admin />
                        
                      </ProtectedRoute>
                      
                    }
                    
                  /> */}



                  <Route path="/admin" element={adminData ? <Admin/> : <Navigate to="/login"/> } />

                  <Route path="/login" element={  <Login/> } />

                  <Route path="/users" element={<AllUsers />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/editpage" element={<ProfileEdit />} />
                  <Route path="/cart" element={<Cart />} />
                   <Route path="/checkout" element={<CheckoutPage/>}/>
                  <Route path="/signup" element={<SignUp />} />
                </Routes>
              </BrowserRouter>
              <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition:Zoom
              />
            </ProductsContextProvider>
          </SignupvalContextProvider>
        </CategoryContextProvider>
      </AuthContextProvider>
    </div>
  );
};

export default App;
