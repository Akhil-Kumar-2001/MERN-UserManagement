import React from 'react';
import { Link } from 'react-router-dom';
import ManageUser from './ManageUser';

const AdminHeader = () => {
  return (
    <header className="bg-gray-950 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold">Admin Panel</div>
        </div>
        <nav className="flex space-x-6">
          <a href="/admin/dashboard" className="hover:text-red-200 transition-colors duration-300">
            Dashboard
          </a>
          <Link
            to="/admin/user" // This route will render the ManageUser component
            className="hover:text-red-200 transition-colors duration-300"
          >
            Users
          </Link>
          <a href="/admin/reports" className="hover:text-red-200 transition-colors duration-300">
            Reports
          </a>
          <button className="bg-white text-red-700 px-4 py-2 rounded-md hover:bg-red-100 transition-colors duration-300">
            Logout
          </button>
        </nav>
      </div>
    </header>
  )
}

export default AdminHeader