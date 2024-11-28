import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/user/store";
import { addUserStart, addUserSuccess, addUserFailure } from '../../redux/admin/adminSlice';
import { currentUserType } from "../../Type/type";

type RegisterErrorType = {
    username?: string;
    email?: string;
    password?: string;
  };
type AddUserModalType = {
  onClose: () => void;
};

const AddModal: React.FC<AddUserModalType> = ({ onClose }) => {
  const [formData, setFormData] = useState<currentUserType>({
    username: "",
    email: "",
    password: "",
  });
  const [registerError, setRegisterError] = useState<RegisterErrorType>({});
  const dispatch = useDispatch();
  const { adminLoading } = useSelector((state: RootState) => state.admin);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
        setFormData({ ...formData, [e.target.id]: e.target.value });
      } catch (error) {
        console.log(error);
      }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    

    try {
      dispatch(addUserStart());

      if (!validateFormInputs()) {
        dispatch(addUserFailure("Invalid user details"));
        return;
      }

      const res = await fetch("http://localhost:3321/api/admin/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || data.status===false) {
        dispatch(addUserFailure(data.message))
        return
      }

      dispatch(addUserSuccess(data));
      onClose(); 
    } catch (error) {
    
      dispatch(addUserFailure(error));
    }
  };

  const validateFormInputs = () => {
    try {
      let validFormField = true;
      let foundError: RegisterErrorType = {
        username: "",
        email: "",
        password: "",
      };
      if (!formData.email || formData.email.trim() === "") {
        validFormField = false;
        foundError.email = "Invalid email";
      }
      if (!formData.username || formData.username.trim() === "") {
        validFormField = false;
        foundError.username = "Invalid name";
      }
      if (!formData.password || formData.password.trim() === "") {
        validFormField = false;
        foundError.password = "Invalid password";
      }
      setRegisterError(foundError);
      return validFormField;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
      <div className="bg-gray-500 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h3 className="text-xl font-semibold text-black">Add User</h3>
        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <input
            type="text"
            id="username"
            className="border rounded p-2 w-full text-black"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          
          />
          {registerError && (
            <p className="text-red-600">{registerError.username}</p>
          )}
          <input
            type="email"
            id="email"
            className="border rounded p-2 w-full text-black"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          
          />
        
          {registerError && (
            <p className="text-red-600">{registerError.email}</p>
          )}
          <input
            type="password"
            id="password"
            className="border rounded p-2 w-full text-black"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            
          />
          {registerError.password && <p className="text-red-500">{registerError.password}</p>}
        
          <button
            className="bg-blue-500 p-2 text-white font-semibold rounded w-full"
            type="submit"
            disabled={adminLoading}
          >
            {adminLoading ? "Adding..." : "Add User"}
          </button>
        </form>
        <button className="text-black mt-4" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddModal;
