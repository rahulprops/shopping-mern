import React from "react";
import shirt from "../assets/shirts.jpeg";
import { FaStar } from "react-icons/fa";
import { TbArrowsCross } from "react-icons/tb";
import { FaHeart } from "react-icons/fa6";

const ProductCart = (props) => {
  const {name,description,image,price,handleproductdetails}=props;
  return (
    <div className="relative w-full shadow-md rounded-md overflow-hidden group">
      <div className="flex h-48 justify-center rounded-md shadow">
        <img src={image} alt="Shirt" className="w-full  object-cover" />
      </div>
      <div className="text-lg capitalize mt-2 font-semibold text-slate-700 ps-2">
        {name}
      </div>
      <div className=" text-base capitalize mt-2 font-semibold text-slate-700 ps-2">
        {description}
      </div>
      <div className="text-sm text-slate-400 ps-2 capitalize font-semibold">
        In stock
      </div>
      <div className="flex my-2 ps-2">
        <FaStar size={25} className="text-yellow-400" />
        <FaStar size={25} className="text-yellow-400" />
        <FaStar size={25} className="text-yellow-400" />
      </div>
      <div className="flex gap-2 my-2 ps-2">
        <div className="text-lg text-slate-300">&#8377; 27000</div>
        <div className="text-lg text-slate-800">&#8377; {price}</div>
      </div>
      <div className="absolute top-1 left-3 px-1 rounded-md text-slate-50 text-md font-semibold bg-blue-700">
        20%
      </div>
      
      {/* Action buttons container */}
      <div className="absolute top-3 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button onClick={handleproductdetails} className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 shadow-xl flex items-center justify-center mb-2 transition-transform transform hover:scale-105">
          <TbArrowsCross size={23} className=" "/>
        </button>
        <button className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 shadow-xl flex items-center justify-center transition-transform transform hover:scale-105">
          <FaHeart size={23} className="  hover:text-red-500" />
        </button>
      </div>
    </div>
  );
};

export default ProductCart;
