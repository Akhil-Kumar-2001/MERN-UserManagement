import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-teal-500 p-8 flex">
     

   
      <main className="flex-1 ml-4">
        <h1 className="text-4xl mb-8">Welcome Admin</h1>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl mb-4">Total Users</h3>
            <p className="text-3xl font-bold">1,245</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl mb-4">Total Sales</h3>
            <p className="text-3xl font-bold">$12,340</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl mb-4">Pending Orders</h3>
            <p className="text-3xl font-bold">67</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl mb-4">New Feedback</h3>
            <p className="text-3xl font-bold">32</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
