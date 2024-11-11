import React, { useState } from "react";
import { createdata } from "../../utils/api"; // Ensure this import is correct
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const AddCate = () => {
  const [categoryName, setCategoryName] = useState("");
  const navigate = useNavigate(); // Correct hook usage

  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log("Submitting Category Name:", categoryName);
  
    if (!categoryName) {
      alert("Please enter a category name");
      return; // Stop submission if the category name is empty
    }
  
    // Submit the category name to the API
    createdata("category/", { name: categoryName }) // Make sure to pass an object with the correct field
      .then((res) => {
        console.log("Category created successfully", res);
        navigate("/listcate"); // Navigate to the category list after success
      })
      .catch((err) => {
        console.error("Error creating category:", err);
  
        if (err.request) {
          // Check the status of the request for error handling
          if (err.request.status === 400) {
            alert("Please enter a valid category name");
          } else if (err.request.status === 404) {
            alert("Client error, please check the URL or endpoint");
          } else {
            alert("Server error, please try again later");
          }
        } else {
          alert("An unexpected error occurred");
        }
      });
  
    // Clear the input field after submission
    setCategoryName(""); 
  };
  

  return (
    <>
      <div className="mx-5 mt-10 h-auto shadow-md rounded-md bg-white capitalize flex flex-wrap justify-between items-center py-4">
        {/* Title */}
        <div className="text-xl lg:text-2xl font-bold ps-4 lg:ps-10 text-slate-800 mb-2 lg:mb-0">
          add category
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
              list category
            </button>
          </div>
        </div>
      </div>

      

      <div className="w-full sm:w-[400px] md:w-[600px] lg:w-[600px] mx-auto bg-white p-6 rounded-md shadow-md px-5 mt-10">
        <h2 className="text-2xl font-semibold mb-4">Add Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="categoryName"
              className="block text-sm font-medium text-gray-700"
            >
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              // required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add Category
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCate;
