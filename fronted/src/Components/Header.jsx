import React, { useState } from "react";
import { FaSearch, FaChevronDown, FaBars } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { BsFillCartFill } from "react-icons/bs";
import { NavLink, useLocation } from "react-router-dom";
import logo from '../assets/shopify-emblem.png';

const Header = () => {
  const [isCategoryListOpen, setIsCategoryListOpen] = useState(false); // State for all category list
  const [isMenDropdownOpen, setIsMenDropdownOpen] = useState(false); // State for Men category dropdown
  const location = useLocation();

  // Toggle function to open/close the All Category List
  const toggleCategoryList = () => {
    setIsCategoryListOpen(!isCategoryListOpen);
  };

  // Toggle function to open/close the Men dropdown
  const toggleMenDropdown = () => {
    setIsMenDropdownOpen(!isMenDropdownOpen);
  };

  return (
    <>
    <div className=" fixed shadow-md top-0 w-full bg-slate-50 z-50">
      <div className="flex   justify-between px-20 items-center h-16  relative">
        <div className="flex items-center">
          <div className="text-4xl">
            <img src={logo} alt="Shop logo" className="w-16 h-16" />
          </div>
          <div className="text-3xl font-bold ps-3 uppercase text-blue-400">shop</div>
        </div>
        <div className="w-[200px] shadow px-1 border h-10 ms-10 rounded-sm">
          <span className="text-xs absolute ps-2 text-slate-600 font-semibold">
            your location
          </span>
          <select
            name="location"
            id="location-select"
            className="w-full h-full pt-2 bg-white text-blue-600 ps-3 text-xl capitalize"
          >
            <option value="">India</option>
            <option value="new-york">New York</option>
            <option value="los-angeles">Los Angeles</option>
            <option value="chicago">Chicago</option>
          </select>
        </div>

        <div className="w-[550px] h-10">
          <form className="relative flex w-full h-full items-center">
            <input
              type="text"
              placeholder="Search items"
              className="w-full h-full pl-4 bg-slate-100 shadow outline-none ms-3  rounded"
            />
            <button className="w-10 h-full relative left-[-30px]">
              <FaSearch className="text-gray-500" />
            </button>
          </form>
        </div>

        <div className="flex gap-5">
          <div className="relative w-10 h-10 shadow-md rounded-full bg-white">
            <FiUser size={25} className="absolute inset-0 m-auto text-slate-400" />
          </div>
          <div className="relative w-10 h-10 shadow-md rounded-full bg-slate-100">
            <BsFillCartFill size={25} className="absolute inset-0 m-auto text-slate-400" />
            <div className="absolute left-6 bottom-7 w-5 h-5 rounded-full bg-red-700 text-slate-50 text-center">1</div>
          </div>
        </div>
      </div>

      <div className="flex items-center px-20 shadow-lg pb-2">
        {/* All Category List Button */}
        <button
          onClick={toggleCategoryList}
          className="flex items-center gap-2 capitalize rounded-full h-10 px-4  py-2 bg-blue-500 text-indigo-50 focus:outline-none"
        >
          <FaBars /> all category list <FaChevronDown />
        </button>

        {/* Conditionally render the category list when the button is clicked */}
        {isCategoryListOpen && (
          <ul className="absolute top-16  left-20 mt-14 bg-white shadow-md p-3 w-60 rounded-md z-50">
            <li className="hover:bg-blue-100 p-2">
              <NavLink to="/category1" className="block">Category 1</NavLink>
            </li>
            <li className="hover:bg-blue-100 p-2">
              <NavLink to="/category2" className="block">Category 2</NavLink>
            </li>
            <li className="hover:bg-blue-100 p-2">
              <NavLink to="/category3" className="block">Category 3</NavLink>
            </li>
            <li className="hover:bg-blue-100 p-2">
              <NavLink to="/category4" className="block">Category 4</NavLink>
            </li>
            <li className="hover:bg-blue-100 p-2">
              <NavLink to="/category5" className="block">Category 5</NavLink>
            </li>
          </ul>
        )}

        <div className="flex justify-between text-center ms-10">
          <ul className="flex justify-between gap-10 capitalize w-full space-x-4">
            {/* Home Link */}
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? "font-bold text-blue-500" : "")}>
                Home
              </NavLink>
            </li>

            {/* Men with Clickable Dropdown */}
            <li className="relative">
              <button
                onClick={toggleMenDropdown}
                className="flex items-center gap-1 focus:outline-none"
              >
                Men
                <FaChevronDown className="ml-1" />
              </button>

              {/* Subcategory Menu (show/hide based on state) */}
              {isMenDropdownOpen && (
                <ul className="absolute left-0 bg-white shadow-md p-3 w-40 rounded-md z-50">
                  <li>
                    <NavLink to="/men/shirts" className="block px-4 py-2 hover:bg-blue-100">
                      Shirts
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/men/pants" className="block px-4 py-2 hover:bg-blue-100">
                      Pants
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/men/shoes" className="block px-4 py-2 hover:bg-blue-100">
                      Shoes
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            {/* Women with Hoverable Dropdown */}
            <li className="relative group">
              <NavLink to="/women" className={({ isActive }) => (isActive ? "font-bold text-blue-500" : "")}>
                Women
              </NavLink>
              <ul className="absolute left-0 hidden group-hover:block bg-white shadow-md p-3 w-40 rounded-md z-50">
                <li>
                  <NavLink to="/women/dresses" className="block px-4 py-2 hover:bg-blue-100">
                    Dresses
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/women/tops" className="block px-4 py-2 hover:bg-blue-100">
                    Tops
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/women/handbags" className="block px-4 py-2 hover:bg-blue-100">
                    Handbags
                  </NavLink>
                </li>
              </ul>
            </li>

            {/* Other Links */}
            <li>
              <NavLink to="/beauty" className={({ isActive }) => (isActive ? "font-bold text-blue-500" : "")}>
                Beauty
              </NavLink>
            </li>
            <li>
              <NavLink to="/watches" className={({ isActive }) => (isActive ? "font-bold text-blue-500" : "")}>
                Watches
              </NavLink>
            </li>
            <li>
              <NavLink to="/gifts" className={({ isActive }) => (isActive ? "font-bold text-blue-500" : "")}>
                Gifts
              </NavLink>
            </li>
            <li>
              <NavLink to="/blog" className={({ isActive }) => (isActive ? "font-bold text-blue-500" : "")}>
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? "font-bold text-blue-500" : "")}>
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      </div>
    </>
  );
};

export default Header;
