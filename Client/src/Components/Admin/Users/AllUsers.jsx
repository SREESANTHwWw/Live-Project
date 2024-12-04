import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../../Server";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`${server}/get-users`)
      .then((res) => 
        setUsers(res.data.getusers))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`${server}/delete-user/${id}`)
        .then(() => {
          setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
        })
        .catch((err) => console.error("Error deleting user:", err));
    }
  };

  const handleEditClick = (user) => {
    setEditUser(user);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setEditUser(null);
    setIsModalOpen(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`${server}/edit-user/${editUser._id}`, editUser)
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === editUser._id ? { ...user, ...editUser } : user
          )
        );
        handleModalClose();
      })
      .catch((err) => console.error("Error updating user:", err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="p-4 text-left">Shop Name</th>
              <th className="p-4 text-left">Owner Name</th>
              <th className="p-4 text-left">Phone Number</th>
              <th className="p-4 text-left">Address</th>
              <th className="p-4 text-left">User Name</th>
              <th className="p-4 text-left">Pincode</th>
              <th className="p-4 text-left">City</th>
              <th className="p-4 text-left">WhatsApp No</th>
              <th className="p-4 text-left">State ID</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">GST Number</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="border-t hover:bg-gray-50">
                  <td className="p-4">{user.shopname}</td>
                  <td className="p-4">{user.owner}</td>
                  <td className="p-4">{user.phonenumber}</td>
                  <td className="p-4">{user.address}</td>
                  <td className="p-4">{user.username}</td>
                  <td className="p-4">{user.pincode}</td>
                  <td className="p-4">{user.city}</td>
                  <td className="p-4">{user.whatsappno}</td>
                  <td className="p-4">{user.stateid}</td>
                  <td className="p-4">{user.type}</td>
                  <td className="p-4">{user.gstno}</td>
                  <td className="p-4">
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => handleEditClick(user)}
                        className="px-3 py-1.5 text-white bg-yellow-500 rounded hover:bg-yellow-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="px-3 py-1.5 text-white bg-red-500 rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={12} className="p-4 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isModalOpen && editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full sm:w-11/12 md:w-2/3 lg:w-1/2 max-h-screen overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Edit User</h3>
            <form onSubmit={handleEditSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Input fields */}
              {[
                "shopname",
                "owner",
                "phonenumber",
                "whatsappno",
                "address",
                "city",
                "pincode",
                "gstno",
                "username",
                "type",
                "stateid",
              ].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    {field.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={editUser[field] || ""}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              ))}

              {/* Buttons */}
              <div className="col-span-2 flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
