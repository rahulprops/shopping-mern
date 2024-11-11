import React from 'react';

const Header = () => {
  return (
    <header className=" bg-blue-600 fixed top-0 w-full text-white shadow-md shadow-slate-400 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <div className="space-x-4">
          <button className="px-3 py-2 bg-blue-500 hover:bg-blue-700 rounded-md">Profile</button>
          <button className="px-3 py-2 bg-blue-500 hover:bg-blue-700 rounded-md">Logout</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
