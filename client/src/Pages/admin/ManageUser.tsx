import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../app/user/store";
import {   fetchUserDetailsStart,
    fetchUserDetailsSuccess,
    fetchUserDetailsFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure  } from '../../../redux/admin/adminSlice'
import EditUserModal from "../../Components/EditUserModal";
import { currentUserType } from "../../../Type/type";

const ManageUser: React.FC = () => {

    const dispatch = useDispatch();
  const { userDetails , adminLoading } = useSelector(
    (state: RootState) => state.admin
  );

  console.log('userDetails type:', typeof userDetails);
console.log('userDetails:', userDetails);


  const [editUserId, setEditUserId] = useState<string | null>(null);
//   const [isAddUserModalOpen, setAddUserModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");


//   useEffect(() => {
//     const handleGetUserDetails = async () => {
//       try {
//         dispatch(fetchUserDetailsStart());
//         let res = await fetch("admin/user");
//         let data = await res.json();

//         if (!res.ok) {
//           throw new Error(data.message || "Failed to fetch user details");
//         }
//         dispatch(fetchUserDetailsSuccess(data));
//       } catch (error) {
//         dispatch(fetchUserDetailsFailure(error));
//       }
//     };

//     handleGetUserDetails();
//   }, [dispatch]);
const handleGetUserDetails = async () => {
  try {
    dispatch(fetchUserDetailsStart());
    let res = await fetch("http://localhost:3321/api/admin/user", {
      method: 'GET',
      credentials: 'include', // Important for sending cookies if you're using authentication
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch user details");
    }
    dispatch(fetchUserDetailsSuccess(data));
  } catch (error) {
    console.error("Error fetching user details:", error);
    dispatch(fetchUserDetailsFailure(error));
  }
};

useEffect(() => {
    handleGetUserDetails();
  }, [dispatch]);
  

  const handleDeleteUser = async (userId: string) => {
    try {
      const confirmed = window.confirm("Are you sure want to delete this user?");
      if (!confirmed) {
        return;
      }
      dispatch(deleteUserStart());

      const res = await fetch(`/admin/delete-user/${userId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "failed to delete user");
      }
      dispatch(deleteUserSuccess(userId));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };
//   Filter users based on search term
  const filteredUsers = (userDetails).filter((user: any) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

// const filteredUsers = Array.isArray(userDetails) 
//   ? userDetails.filter((user: any) =>
//       user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   : [];

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="bg-slate-950 p-6 rounded-lg shadow-lg w-full max-w-4xl mt-4">
        <h2 className="tManageUserext-3xl font-bold mb-4 text-gray-200">Manage Users</h2>

        {/* Static Loading Text (Removed dynamic loading state) */}
        {/* <p>Loading.....</p> */}
        {adminLoading && <p>Loading.....</p>}

        <div className="mb-4 text-right">
          <button className="bg-teal-500 px-4 py-2 rounded hover:bg-teal-800 transition duration-300">
            Add User
          </button>
          <h1 className="text-white">User Count: {filteredUsers.length}</h1> {/* Example user count */}
        </div>

        {/* Static Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by username or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 rounded bg-gray-200 text-black"
          />
        </div>

        <table className="w-full table-auto text-gray-300">
          <thead>
            <tr className="text-left bg-gray-700">
              <th className="p-4">Si.No</th>
              <th className="p-4">UserName</th>
              <th className="p-4">Email</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Static User Rows */}
            {filteredUsers.map((user:currentUserType, index: number) => (
            <tr key={user._id} className="border-b border-gray-700 hover:bg-gray-800">
              <td className="p-4">{index + 1}</td>
              <td className="p-4">{user.userName}</td>
              <td className="p-4">{user.userEmail}</td>
              <td className="p-4 flex gap-4">
                <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                onClick={() => setEditUserId(user._id)}>
                  Edit
                </button>
                <button className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition duration-300"
                onClick={() => handleDeleteUser(user._id)}
                disabled={adminLoading}>
                  Delete
                </button>
                {editUserId === user._id && (
                    <EditUserModal
                    userData ={user}
                    //   username ={user.userName}
                    //   email={user.userEmail}
                    //   id={user._id}
                      onClose={() => setEditUserId(null)}
                    />
                )}
              </td>
            </tr>
           
        ))}
          </tbody>
        </table>

        <div className="mt-8 text-center">
          <Link to="/admin/" className="text-teal-500 hover:text-teal-400 underline">
            Go to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
