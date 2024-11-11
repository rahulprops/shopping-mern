import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchdata, createdata } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const AddSubCate = () => {
  const [getcate, setGetcate] = useState([]);
  const [subname, setSubname] = useState("");
  const [catename, setCatename] = useState("");
  const navigate=useNavigate()
  useEffect(() => {
    // Fetch category data
    fetchdata("category").then((res) => {
      setGetcate(res.getcate);
    });
  }, []);

  const sendSubCate = async (e) => {
    e.preventDefault(); // Prevent page reload
    const formData = new FormData();
    formData.append('subcatename', subname);
    formData.append('Category', catename);
       console.log(formData)
    try {
      const response = await createdata("subcate", formData)
      console.log(response);
      // Reset form if needed
      setSubname("");
      setCatename("");
      navigate("/listcate")
    } catch (error) {
      // console.error("Error adding subcategory:", error);
      // alert(error.request.status)
      // alert(error.response.data.message)
         if(error.request){
          // alert(error.request.status)
          if(error.request.status==404){
            alert("client error please check url")
          }
          if(error.request.status==500){
           alert(" server error")

          }
         }

      if(error.response.data.message){
        alert(error.response.data.message)
      }
    }
  };

  return (
      <>
             <div className="mx-5 mt-10 h-auto shadow-md rounded-md bg-white capitalize flex flex-wrap justify-between items-center py-4">
        {/* Title */}
        <div className="text-xl lg:text-2xl font-bold ps-4 lg:ps-10 text-slate-800 mb-2 lg:mb-0">
           add subcategory
        </div>

        {/* Buttons and navigation */}
        <div className="pr-4 lg:pr-10 flex flex-col lg:flex-row gap-2 items-center">
          <div className="text-base lg:text-lg px-2 py-1 flex items-center rounded-md border font-bold">
            dashboard
          </div>
          <span className="font-bold hidden lg:flex items-center">/</span>
          <div className="text-base lg:text-lg px-2 py-1 flex items-center rounded-md border font-bold">
            category
          </div>

          {/* Add category button */}
          <div className="mt-2 lg:mt-0">
            <button
              onClick={() => navigate("/listcate")}
              className="px-3 lg:px-5 py-2 text-slate-100 text-base lg:text-2xl capitalize bg-blue-600 rounded-md font-semibold hover:bg-blue-500 shadow-md shadow-slate-500"
            >
              list subcategory
            </button>
          </div>
        </div>
      </div>


    <div className="w-full sm:w-[400px] md:w-[600px] lg:w-[600px] mx-auto bg-white p-6 rounded-md shadow-md px-5 mt-10">
      <h2 className="text-2xl font-semibold mb-4">Add Subcategory</h2>
      <form onSubmit={sendSubCate}>
        {/* Subcategory Name */}
        <div className="mb-4">
          <label htmlFor="subcateName" className="block text-sm font-medium text-gray-700">
            Subcategory Name
          </label>
          <input
            type="text"
            id="subcateName"
            value={subname}
            onChange={(e) => setSubname(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            // required
          />
        </div>

        {/* Category Selection */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Select Category
          </label>
          <select
            id="category"
            value={catename}
            onChange={(e) => setCatename(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            // required
          >
            <option value="">Select category...</option>
            {getcate.map((res, index) => (
              <option key={index} value={res.catename}>
                {res.catename}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Add Subcategory
        </button>
      </form>
    </div>

    </>
  );
};

export default AddSubCate;
