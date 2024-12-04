import React, { useState, useEffect } from "react";
import AddProduct from "./AddProducts/AddProducts";
import EditProducts from "./AddProducts/EditProducts";
import AddCategory from "./Category/AddCategory";
import AllUsers from "./Users/AllUsers";
import Category from "./Category/Category";
import CategoryContextProvider from "../Context/CategoryContext";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import {
  LayoutDashboard,
  Settings,
  ShoppingCart,
  Users,
  Package,
  PackageX,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";  // To handle navigation after logout


const Admin = () => {
  const [selectedSection, setSelectedSection] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate(); // Use navigate hook to redirect after logout

  const handleMenuClick = (section) => {
    setSelectedSection(section);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true); // Open sidebar on larger screens
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", section: "dashboard" },
    { icon: <Settings size={20} />, label: "Category Settings", section: "category" },
  
    { icon: <ShoppingCart size={20} />, label: "Orders", section: "orders" },
    { icon: <Users size={20} />, label: "Users", section: "users" },
    { icon: <Package size={20} />, label: "Add Product", section: "addProduct" },
    { icon: <PackageX size={20} />, label: "Edit Products", section: "editProducts" },
    { icon: <LogOut size={20} />, label: "Logout", section: "logout" },
  ];

  // Logout function
  const logout = () => {
    
    // Clear everything from localStorage
    localStorage.clear();  // Removes all items from localStorage

    // Redirect to the login page
    navigate("/login");  // Assuming you have a login route set up
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed z-40 h-screen bg-white  w-64 md:relative">
          <div className="p-4 border-b flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">DT</span>
            </div>
            <h2 className="font-semibold text-gray-800">DILS TRADING</h2>
            <button
              className="ml-auto hover:bg-gray-100 p-2 rounded-lg"
              onClick={() => setIsSidebarOpen(false)}
            >
              <XMarkIcon className="h-6 w-6 text-gray-800" />
            </button>
          </div>
          <nav className="p-4">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg mb-1 transition-colors w-full ${
                  selectedSection === item.section
                    ? "bg-blue-50 text-blue-600"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => {
                  if (item.section === "logout") {
                    logout();  // Call logout function on "Logout" click
                  } else {
                    handleMenuClick(item.section);
                  }
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          {!isSidebarOpen && (
            <button
              className="text-blue-900 bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          )}
          <h1 className="text-2xl font-semibold text-gray-800">
            {isSidebarOpen ? "Admin Panel" : "Admin Panel"}
          </h1>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          {selectedSection === "dashboard" && <p>Welcome to the Dashboard!</p>}
          {selectedSection === "category" && (
            <CategoryContextProvider>
              <Category />
            </CategoryContextProvider>
          )}
          
          {selectedSection === "orders" && <p>Orders Section</p>}
          {selectedSection === "users" && <AllUsers />}
          {selectedSection === "addProduct" && <AddProduct />}
          {selectedSection === "editProducts" && <EditProducts />}
        </div>
      </div>
    </div>
  );
};

export default Admin;
