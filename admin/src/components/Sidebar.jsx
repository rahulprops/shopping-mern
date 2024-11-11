import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {  FaProductHunt, FaPlus, FaList, FaThLarge, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Sidebar = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);

  const toggleCategoryDropdown = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const toggleProductDropdown = () => {
    setIsProductOpen(!isProductOpen);
  };

  return (
    <aside className="w-64  mt-20   bg-white min-h-full h-screen text-gray-800 p-4">
      <nav>
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center py-2 px-3 bg-blue-100 shadow-md text-slate-700 text-lg font-bold rounded'
                  : 'flex items-center py-2 px-3  bg-slate-50 shadow-md hover:bg-gray-300 rounded text-lg text-slate-800 font-bold'
              }
            >
              {/* <FaDashboard className="mr-2" /> */}
              <FaThLarge size={23} className="mr-5  text-blue-400" />
               Dashboard
            </NavLink>
          </li>
          
          {/* Product Dropdown */}
          <li>
            <button
              onClick={toggleProductDropdown}
              className="flex items-center justify-between w-full text-left text-lg py-2  bg-slate-50 shadow-md hover:bg-gray-300 px-3   rounded text-slate-800 font-bold"
            >
              <div className="flex items-center">
                <FaProductHunt size={25} className="mr-5 text-blue-500 " /> {/* Product Icon */}
                <span>Product</span>
              </div>
              {isProductOpen ? <FaChevronUp  className=' text-blue-700' /> : <FaChevronDown />} {/* Arrow indication */}
            </button>
            {isProductOpen && (
              <ul className="ml-4 mt-2 space-y-2">
                <li>
                  <NavLink
                    to="/addproduct"
                    className={({ isActive }) =>
                      isActive
                        ? 'flex items-center py-2 px-3 bg-blue-100 shadow-md text-slate-700 text-lg font-bold rounded'
                        : 'flex items-center py-2 px-3  bg-slate-50 shadow-md hover:bg-gray-300 rounded text-lg text-slate-800 font-semibold'
                    }
                  >
                    <FaPlus size={20} className="mr-2 text-blue-500" /> {/* Add Product Icon */}
                    Add Product
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/listproduct"
                    className={({ isActive }) =>
                      isActive
                        ? 'flex items-center py-2 px-3 bg-blue-100 shadow-md text-slate-700 text-lg font-bold rounded'
                        : 'flex items-center py-2 px-3  bg-slate-50 shadow-md hover:bg-gray-300 rounded text-lg text-slate-800 font-semibold'
                    }
                  >
                    <FaList  className="mr-2 text-blue-500" /> {/* List Product Icon */}
                    List Product
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* Category Dropdown */}
          <li>
            <button
              onClick={toggleCategoryDropdown}
              className="flex items-center justify-between bg-slate-50  text-lg font-bold shadow-md w-full text-left py-2 px-3  hover:bg-gray-300 rounded  text-slate-800"
            >
              <div className="flex items-center">
                <FaThLarge className="mr-5 text-blue-500" /> {/* Category Icon */}
                <span>Category</span>
              </div>
              {isCategoryOpen ? <FaChevronUp className=' text-blue-700'  /> : <FaChevronDown />} {/* Arrow indication */}
            </button>
            {isCategoryOpen && (
              <ul className="ml-4 mt-2 space-y-2">
                <li>
                  <NavLink
                    to="/addcate"
                    className={({ isActive }) =>
                      isActive
                        ? 'flex items-center py-2 px-3 bg-blue-100 shadow-md text-slate-700 text-lg font-bold rounded'
                        : 'flex items-center py-2 px-3  bg-slate-50 shadow-md hover:bg-gray-300 rounded text-lg text-slate-800 font-semibold'
                    }
                  >
                    <FaPlus className="mr-2 text-blue-500" /> {/* Add Category Icon */}
                    Add Category
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/listcate"
                    className={({ isActive }) =>
                      isActive
                        ? 'flex items-center py-2 px-3 bg-blue-100 text-slate-700 text-lg font-bold rounded'
                        : 'flex items-center py-2 px-3  bg-slate-50 shadow-md hover:bg-gray-300 rounded text-lg text-slate-800 font-semibold'
                    }
                  >
                    <FaList className="mr-2 text-blue-600" /> {/* List Category Icon */}
                    List Category
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/addsubcate"
                    className={({ isActive }) =>
                      isActive
                        ? 'flex items-center py-2 px-3 bg-blue-100 text-slate-700 text-lg font-bold rounded'
                        : 'flex items-center py-2 px-3  bg-slate-50 shadow-md hover:bg-gray-300 rounded text-lg text-slate-800 font-semibold'
                    }
                  >
                    <FaPlus className="mr-2 text-blue-500" /> {/* List Category Icon */}
                    add subcategory
                  </NavLink>
                </li>
                
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
