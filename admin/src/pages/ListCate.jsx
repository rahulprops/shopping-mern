import React, { useEffect, useState } from "react";
import {
  fetchdata,
  deletedata,
  editdata,
  fetchsubcate,
} from "../../utils/api.js";
import { useNavigate } from "react-router-dom";

const ListCategory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [catelist, setCateList] = useState([]);
  const [subCateList, setSubCateList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [newSubcategoryName, setNewSubcategoryName] = useState("");
  const navigate = useNavigate();
  // Open the edit modal for a subcategory
  const openSubcategoryModal = (subcat) => {
    setSelectedSubcategory(subcat);

    // console.log(selectedSubcategory._id)
    setNewSubcategoryName(subcat.subCateName); // Assuming this is the field for subcategory name
    setIsSubModalOpen(true);
  };

  // Close the modal for editing subcategory
  const closeSubModal = () => {
    setIsSubModalOpen(false);
    setSelectedSubcategory(null);
    setNewSubcategoryName("");
  };

  // Handle the subcategory edit form submission
  const handleEditSubcategory = async (e) => {
    e.preventDefault();
    try {
      // Assuming `editSubcategory` is a utility function to update subcategories
      await editdata("subcate", selectedSubcategory._id, {
        subCateName: newSubcategoryName,
      });

      // Update the local state with the edited subcategory name
      setSubCateList((prev) =>
        prev.map((subcat) =>
          subcat._id === selectedSubcategory._id
            ? { ...subcat, subCateName: newSubcategoryName }
            : subcat
        )
      );

      closeSubModal();
    } catch (err) {
      console.error("Error updating subcategory:", err);
    }
  };

  // Handle subcategory deletion
  const handleDeleteSubcategory = (subcatId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this subcategory?"
    );
    if (confirmed) {
      deletedata("subcate", subcatId)
        .then(() => {
          setSubCateList((prev) =>
            prev.filter((subcat) => subcat._id !== subcatId)
          );
          console.log("Subcategory deleted successfully");
        })
        .catch((err) => {
          console.error("Error deleting subcategory:", err);
        });
    }
  };

  useEffect(() => {
    fetchdata("category/").then((res) => {
      setCateList(res.getcate);
    });
  }, []);

  // Function to fetch subcategories for a selected category
  const fetchSubcategories = async (categoryId) => {
    const res = await fetchsubcate(`subcate/query/?Catename=${categoryId}`); // Adjust your API endpoint accordingly
    setSubCateList(res.data); // Assuming the subcategories are in the 'data' property
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    // console.log(category)
    fetchSubcategories(category); // Fetch subcategories on category click
  };

  const openModal = (category) => {
    setSelectedCategory(category);
    setNewCategoryName(category.catename);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
    setNewCategoryName("");
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const updatedCategory = await editdata("category", selectedCategory._id, {
        name: newCategoryName,
      });

      setCateList((prev) =>
        prev.map((cat) =>
          cat._id === selectedCategory._id
            ? { ...cat, catename: newCategoryName }
            : cat
        )
      );

      closeModal();
    } catch (err) {
      console.error("Error updating category:", err);
    }
  };

  const handleDelete = (categoryId, categoryName) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${categoryName}?`
    );
    if (confirmed) {
      deletedata("category", categoryId)
        .then(() => {
          setCateList(catelist.filter((cat) => cat._id !== categoryId));
          console.log("Category deleted successfully");
        })
        .catch((err) => {
          console.error("Error deleting category:", err);
        });
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = catelist.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(catelist.length / itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="mx-5 mt-10 h-auto shadow-md rounded-md bg-white capitalize flex flex-wrap justify-between items-center py-4">
        {/* Title */}
        <div className="text-xl lg:text-2xl font-bold ps-4 lg:ps-10 text-slate-800 mb-2 lg:mb-0">
          list category or subcatelist
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
              onClick={() => navigate("/addcate")}
              className="px-3 lg:px-5 py-2 text-slate-100 text-base lg:text-2xl capitalize bg-blue-600 rounded-md font-semibold hover:bg-blue-500 shadow-md shadow-slate-500"
            >
              add category
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 mx-3 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6 ps-5 pt-5">Category List</h2>

        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Category Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((category) => (
              <tr key={category._id} className="bg-white border-b">
                <td
                  className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer"
                  onClick={() => handleCategoryClick(category.catename)} // Clickable category name
                >
                  {category.catename}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="text-blue-600 hover:text-blue-900 mr-4"
                    onClick={() => openModal(category)}
                    aria-label="Edit"
                    style={{ fontSize: "1.3rem" }}
                  >
                    <div className="h-10 w-10 bg-slate-100 hover:bg-slate-300 rounded-md items-center flex justify-center">
                      ✏️
                    </div>
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() =>
                      handleDelete(category._id, category.catename)
                    }
                    aria-label="Delete"
                    style={{ fontSize: "1.1rem" }}
                  >
                    <div className="h-10 w-10 bg-red-200 hover:bg-red-500 rounded-md items-center flex justify-center">
                      🗑️
                    </div>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-center my-4">
          <button
            onClick={goToPrevPage}
            className={`px-3 py-2 mx-1 bg-gray-300 text-gray-700 rounded ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-400"
            }`}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => goToPage(pageNumber)}
              className={`px-3 py-2 mx-1 ${
                currentPage === pageNumber
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              } rounded`}
            >
              {pageNumber}
            </button>
          ))}
          <button
            onClick={goToNextPage}
            className={`px-3 py-2 mx-1 bg-gray-300 text-gray-700 rounded ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-400"
            }`}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
              <h2 className="text-2xl font-semibold mb-4">Edit Category</h2>
              <form onSubmit={handleEdit}>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="categoryName"
                  >
                    Category Name
                  </label>
                  <input
                    type="text"
                    id="categoryName"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mr-4 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Subcategory List */}
      {/* Subcategory List */}
      <div className="mx-5 mt-10 h-auto shadow-md rounded-md bg-white capitalize flex flex-wrap justify-between items-center py-4">
  {/* Title */}
  <div className="text-xl lg:text-2xl font-bold ps-4 lg:ps-10 text-slate-800 mb-2 lg:mb-0">
    list subcatelist
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
        onClick={() => navigate('/addsubcate')}
        className="px-3 lg:px-5 py-2 text-slate-100 text-base lg:text-2xl capitalize bg-blue-800 rounded-md font-semibold hover:bg-blue-700 shadow-md shadow-slate-500"
      >
        add subcategory
      </button>
    </div>
  </div>
</div>
        
      {selectedCategory && (
        <div className="mt-5 mx-3 bg-white rounded-md shadow-md">
          
            {/* Subcategories Heading */}
            <h2 className="text-xl  sm:text-2xl py-5 sm:mt-0 font-semibold ps-5">
              Subcategories under {selectedCategory.catename}
            </h2>

          
          

          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3  text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Subcategory Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {subCateList.map((subcat) => (
                <tr key={subcat._id} className="bg-white border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {subcat.subCateName} {/* Assuming subcategory name field */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="text-blue-600 hover:text-blue-900 mr-4"
                      onClick={() => openSubcategoryModal(subcat)}
                    >
                      <div className="h-10 w-10 bg-slate-100 hover:bg-slate-300 rounded-md items-center flex justify-center">
                        ✏️
                      </div>
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeleteSubcategory(subcat._id)}
                    >
                      <div className="h-10 w-10 bg-red-200 hover:bg-red-500 rounded-md items-center flex justify-center">
                        🗑️
                      </div>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Subcategory Edit Modal */}
      {isSubModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4">Edit Subcategory</h2>
            <form onSubmit={handleEditSubcategory}>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="subcategoryName"
                >
                  Subcategory Name
                </label>
                <input
                  type="text"
                  id="subcategoryName"
                  value={newSubcategoryName}
                  onChange={(e) => setNewSubcategoryName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeSubModal}
                  className="mr-4 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ListCategory;
