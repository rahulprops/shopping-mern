import React from "react";
import shirt from "../assets/shirts.jpeg";
import { FaStar } from "react-icons/fa";
import { TbArrowsCross } from "react-icons/tb";
import { FaHeart } from "react-icons/fa6";

const ProductView = () => {
  return (
    <div className=" ms-10 p-5">
    <div className=" mx-24 text-2xl capitalize font-semibold text-slate-800">product tiel kjdkas skjdfs ksjdf</div>
    <ul className="flex mx-24 gap-5 mt-1 mb-5 text-slate-600 text-sm">
        <li>
          <span className="font-semibold">Brand:</span> Fashion & Style
        </li>
        <li>|</li>
        <li>120 Reviews</li>
      </ul>
    <div className="border-t border-blue-300 mt-4 pt-4 text-center mx-10 mb-5"></div>
      <div className=" grid grid-cols-2  gap-10">
        {/* Product Image */}
        <div className=" ">
        <div className=" w-full h-full flex justify-center mx-5">
        <img
            src={shirt}
            alt="Product"
            className=" w-full h-[500px] px-20  rounded-md shadow-lg"
          /> 
        </div>
          {/* <img
            src={shirt}
            alt="Product"
            className=" object-cover rounded-md shadow-lg"
          /> */}
        </div>

        {/* Product Details */}
        <div className="">
        <ul className=" flex gap-3">
            <li className=" text-lg text-slate-400 font-semibold line-through">&#8377; 27000</li>
            <li className=" text-xl font-semibold text-red-800"> &#8377; 10000</li>
          </ul>
          <div className="mt-2">
            <span className="border-2 w-[100px] rounded-full bg-slate-200 text-slate-500 font-semibold text-center px-2">
              In Stock
            </span>
          </div>
          <p className="mt-5 text-lg text-slate-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            euismod, nisl eget consectetur sagittis, nisl felis feugiat libero,
            eu aliquam velit dolor vitae justo.
          </p>
          <div className="flex items-center my-2">
            <FaStar size={25} className="text-yellow-400" />
            <FaStar size={25} className="text-yellow-400" />
            <FaStar size={25} className="text-yellow-400" />
            <FaStar size={25} className="text-yellow-400" />
            <FaStar size={25} className="text-yellow-400" />
            <span className="ml-2 text-sm text-slate-500">(120 Reviews)</span>
          </div>
          <div className="flex justify-center items-center mt-5 gap-4">
            <button className="w-10 h-10 bg-slate-200 rounded-full flex justify-center items-center text-2xl font-semibold text-slate-700 hover:bg-slate-300">
              -
            </button>
            <span className="text-2xl font-semibold text-slate-800">1</span>
            <button className="w-10 h-10 bg-slate-200 rounded-full flex justify-center items-center text-2xl font-semibold text-slate-700 hover:bg-slate-300">
              +
            </button>
          </div>

          <div className="flex justify-center gap-4 mt-4">
            <button className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500 transition duration-200">
              Add to Cart
            </button>
            <button className="px-6 py-2 text-white bg-green-600 rounded-md hover:bg-green-500 transition duration-200">
              Buy Now
            </button>
          </div>

          {/* Action buttons for wishlist and compare */}
          {/* <div className="flex gap-3 mt-4">
            <button className="w-12 h-12 rounded-full bg-slate-100 shadow-xl flex items-center justify-center hover:bg-slate-200">
              <TbArrowsCross size={23} />
            </button>
            <button className="w-12 h-12 rounded-full bg-slate-100 shadow-xl flex items-center justify-center hover:bg-slate-200">
              <FaHeart size={23} />
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProductView;
