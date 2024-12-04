import axios from "axios";
import { Pencil, Trash2, LayersIcon, PlusCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { server } from "../../../Server";
import AddCategory from "./AddCategory";
import { CategoryContext } from "../../Context/CategoryContext";
import { useNavigate } from "react-router-dom";

export default function CategoryTable() {
  const [categories, setCategories] = useState([]); // Top-level categories
  const [currentData, setCurrentData] = useState([]); // Current data being displayed
  const [path, setPath] = useState([]); // Breadcrumb path for navigation
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen ,setEditOpen] =useState(false)
  const[updateCategory ,setUpdateCate]= useState("")
  const [Category_name, setCategoryName] = useState("");
  const [Category_img, setCategoryImg] = useState(null);
  const [hasSubcategory, setHasSubcategory] = useState(false);
  const [subCategory, setSubcategoryName] = useState(""); // State for Subcategory
  const [subCateory_img ,setSubcategoryImg] =useState("")
  const [productModalOpen, setProductModal]= useState(false)
  const {category} = useContext(CategoryContext)
  const navigate = useNavigate()
 


  // Fetch categories
  const fetchCategories = () => {
    axios
      .get(`${server}/get-category`)
      .then((res) => {
        // Filter categories where subCategory is not present or is an empty string
        const categoriesWithoutSubcategory = res.data.getAllcategory.filter(
          (category) => !category.subCategory || category.subCategory.trim() === ""
        );
        setCategories(categoriesWithoutSubcategory);
        setCurrentData(categoriesWithoutSubcategory); // Initialize with categories without subcategories
      })
      .catch((err) => console.error("Error fetching categories:", err));
  };
  

  useEffect(() => {
    fetchCategories();
  }, []);

  const dltCate = (id) => {
    axios
      .delete(`${server}/delete-cate/${id}`)
      .then(() =>
        setCurrentData((prev) => prev.filter((item) => item._id !== id))
      )
      .catch((err) => console.error("Error deleting category:", err));
  };


  const editcategory = async (e)=>{

    try {
      const formData = new FormData()
       for (const key in updateCategory ){
        formData.append(key , updateCategory[key])
       }
      await  axios.patch(`/edit-category/${updateCategory._id}`,formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      setCategories((prev) =>
        prev.map((cat) =>
          cat._id === updateCategory._id
            ? { ...cat, Category_name: Category_name }
            : cat
        ))
      setEditOpen(false)
      
    } catch (error) {
      
    }
     

  }

  const openEdit = ()=> {
    setEditOpen(true)
    setUpdateCate(category);

  }
  const closeedit =()=>{
    setEditOpen(false)
  
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // const handleManage = (category) => {
  //   if (category.subCategory && category.subCategory.length > 0) {
  //     setPath([...path, category]); // Add the category to the breadcrumb path
  //     setCurrentData(category.subCategory); // Display subcategories
  //   } else {
  //     alert("No subcategories available!");
  //   }
  // };
  const handleManage = (id) => {
    
    Promise.all([
      axios.get(`${server}/get-category/${id}`),
      axios.get(`${server}/get-products/${id}`)
 
    ])
    
      .then(([categoryres, productres]) => {
        console.log(categoryres,productres)

      const subcategories = categoryres.data.getsub_category
      if(subcategories && subcategories.length > 0){

        setCurrentData(subcategories)
      }
      const categoryproduct = productres.data.GetcategoryProuduct
      if(categoryproduct && categoryproduct.length>0){
        setProductModal(true)

          setCurrentData(productres.data.GetcategoryProuduct)

      }
    
      })
      

      

     
  };
  

  
  const deleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`${server}/delete-product/${id}`)
        .then((res) => {
          setCurrentData((preval) => preval.filter((pro) => pro._id !== id));
        })
        .catch((err) => toast.error("Error deleting Product:", err));
    }
  };
 


  // const handleGoBack = () => {
  //   const newPath = [...path];
  //   newPath.pop(); // Remove the last category in the path
  //   setPath(newPath);

  //   if (newPath.length === 0) {
  //     setCurrentData(categories); // Go back to top-level categories
  //   } else {
  //     setCurrentData(newPath[newPath.length - 1].subcategories); // Go back to the parent category
  //   }
  // };

  const handlerFileInputs = (e) => {
    const file = e.target.files[0];
    setCurrentData((prev) => ({ ...prev, Category_img: file }));
    setImagePreview(URL.createObjectURL(file)); // Update preview image
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentData((prev) => ({
      ...prev,
      [  name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSelect = (e)=>{
    setSubcategoryName(e.target.value)
  }
  const closeProduct =()=>{
    setProductModal(false)
    
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Category List</h2>
        <button
          onClick={openModal}
          className="flex items-center gap-2 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <PlusCircle size={18} />
          <span>Add Category</span>
        </button>
      </div>

      {/* Breadcrumb Navigation */}
      {/* <div className="mb-4">
        {path.length > 0 && (
          <button
            onClick={handleGoBack}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
          >
            Go Back
          </button>
        )}
        <span className="ml-4">
          Current Level: {path.map((p) => p.Category_name).join(" > ") || "Home"}
        </span>
      </div> */}

      {/* Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="py-4 px-4 text-left text-gray-700">SI No</th>
              <th className="py-4 px-4 text-left text-gray-700">
                Category/Subcategory Name
              </th>
              <th className="py-4 px-4 text-left text-gray-700">Image</th>
              <th className="py-4 px-4 text-left text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
          {
  currentData.map((item, index) => (
    <tr key={item._id} className="border-b hover:bg-gray-50 text-gray-700">
      <td className="py-4 px-4">{index + 1}</td>
      <td className="py-4 px-4">{item.Category_name || item.name}</td>
      <td className="py-4 px-4">
        <img
          src={item.Category_img}
          alt={item.name}
          className="w-12 h-12 rounded-lg object-cover"
        />
      </td>
      <td className="py-4 px-4">
        <div className="flex gap-2 flex-wrap md:flex-nowrap">
          <button
            className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600 transition-colors flex items-center gap-1"
            onClick={() => dltCate(item._id)}
          >
            <Trash2 size={16} />
            <span className="hidden sm:inline">Delete</span>
          </button>
          <button
            className="px-3 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600 transition-colors flex items-center gap-1"
            onClick={openEdit}
          >
            <Pencil size={16} />
            <span className="hidden sm:inline">Edit</span>
          </button>
          {
            item.subCategory ?  <button
            className="px-3 py-1 text-white rounde bg-gray-700 transition-colors flex items-center gap-1 "
           
            
            onClick={() => handleManage(item._id)}
          >
            Manage
            <LayersIcon size={16} />
           
          </button>:
          
          <button  > Product</button>
          }
        
        </div>
      </td>
    </tr>
  ))
}

          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            <AddCategory
              onSuccess={() => {
                closeModal();
                fetchCategories();
              }}
            />
          </div>
        </div>
      )}
      {
   productModalOpen && (
  <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
    <div className="bg-white rounded-lg shadow-lg max-w-full max-h-[90vh] w-[90%] p-6 relative overflow-hidden">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Products in Category</h3>
      <div className="overflow-y-auto max-h-[70vh]">
        <table className="min-w-full text-sm table-auto">
          <thead className="sticky top-0 bg-gray-100 z-10">
            <tr className="border-b">
              <th className="py-4 px-4 text-left text-gray-700">SI NO</th>
              <th className="py-4 px-4 text-left text-gray-700">Name</th>
              <th className="py-4 px-4 text-left text-gray-700">Image</th>
              <th className="py-4 px-4 text-left text-gray-700">Normal Price</th>
              <th className="py-4 px-4 text-left text-gray-700">Mid Price</th>
              <th className="py-4 px-4 text-left text-gray-700">Premium Price</th>
              <th className="py-4 px-4 text-left text-gray-700">Min Order Qty</th>
              <th className="py-4 px-4 text-left text-gray-700">Unit</th>
              <th className="py-4 px-4 text-left text-gray-700">Description</th>
              <th className="py-4 px-4 text-left text-gray-700">Is Fast Moving</th>
              <th className="py-4 px-4 text-left text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((product, index) => (
              <tr key={product._id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-4">{index + 1}</td>
                <td className="py-4 px-4">{product.productname}</td>
                <td className="py-4 px-4">
                  <img
                    src={product.product_img}
                    alt={product.productname}
                    className="w-40 h-40 rounded-lg object-cover"
                  />
                </td>
                <td className="py-4 px-4">{product.price}</td>
                <td className="py-4 px-4">{product.medium_price}</td>
                <td className="py-4 px-4">{product.premium_price}</td>
                <td className="py-4 px-4">{product.minimum_order_quantity}</td>
                <td className="py-4 px-4">{product.unitid}</td>
                <td className="py-4 px-4">{product.description}</td>
                <td className="py-4 px-4">{product.fast_moving ? 'Yes' : 'No'}</td>
                <td className="py-4 px-4">
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600">
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                      onClick={() => deleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-end gap-4">
        <button
          onClick={ closeProduct}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)
}



      {
        isEditModalOpen &&(
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-3xl">
              <h3 className="text-xl font-semibold mb-4">Edit Category</h3>
              <form className="space-y-6" onSubmit={editcategory}>
                <div className="text-center">
                  <img
                    className="w-[200px] h-[200px] rounded-lg mx-auto"
                    // src={imagePreview}
                    alt="Preview"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Add New Image</label>
                  <input type="file" accept="image/*"/>
                  {/* //  onChange={handlerFileInputs} /> */}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Category Name:</label>
                  <input
                    type="text"
                    name="Category_name"
                    value={category.Category_name || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Sub Category Name:</label>
                  <select
                    name="subCategory"
                    value={category.subCategory || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md"
                  >
                    <option value="">-- Select an option --</option>
                    {category.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.Category_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-between">
                  <button type="submit" className="bg-blue-600 py-2 px-6 rounded text-white hover:bg-blue-800">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={closeedit}
                    className="bg-gray-500 py-2 px-6 rounded text-white hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
         
        )
      }
    </div>
  );
}
