import React, { useEffect, useState } from 'react';
import { fetchdata } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const ListProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [allproduct, setAllProduct] = useState([]);
  const navigate=useNavigate()
  // Fetch product data
  useEffect(() => {
    fetchdata("product").then((res) => {
      setAllProduct(res.product);
    });
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allproduct.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(allproduct.length / itemsPerPage);

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
           list product
        </div>

        {/* Buttons and navigation */}
        <div className="pr-4 lg:pr-10 flex flex-col lg:flex-row gap-2 items-center">
          <div className="text-base lg:text-lg px-2 py-1 flex items-center rounded-md border font-bold">
            dashboard
          </div>
          <span className="font-bold hidden lg:flex items-center">/</span>
          <div className="text-base lg:text-lg px-2 py-1 flex items-center rounded-md border font-bold">
            product
          </div>

          {/* Add category button */}
          <div className="mt-2 lg:mt-0">
            <button
              onClick={() => navigate("/addproduct")}
              className="px-3 lg:px-5 py-2 text-slate-100 text-base lg:text-2xl capitalize bg-blue-600 rounded-md font-semibold hover:bg-blue-500 shadow-md shadow-slate-500"
            >
              add product
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5  w-screen sm:w-screen md:w-full lg:w-full mx-2 mb-5 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-3 ps-5 pt-3">Product List</h2>

        <table className=" min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-3 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
              <th className="px-3 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-3 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Brand</th>
              <th className="px-3 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-3 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-3 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-3 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((product, index) => (
              <tr key={index} className="bg-white border-b">
                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{product.description}</td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{product.brand}</td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">${product.price}</td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{product.catename}</td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <img src={product.image}  className="w-16 h-16 object-cover" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-900 mr-4" onClick={() => openModal(product)}>
                    <div className="h-10 w-10 bg-slate-100 hover:bg-slate-300 rounded-md items-center flex justify-center">👁️</div>
                  </button>
                  <button className="text-blue-600 hover:text-blue-900 mr-4" onClick={() => openModal(product)}>
                    <div className="h-10 w-10 bg-slate-100 hover:bg-slate-300 rounded-md items-center flex justify-center">✏️</div>
                  </button>
                  <button className="text-red-600 hover:text-red-900" onClick={() => alert(`Delete product: ${product.productName}`)}>
                    <div className="h-10 w-10 bg-red-200 hover:bg-red-500 rounded-md items-center flex justify-center">🗑️</div>
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
            className={`px-3 py-2 mx-1 bg-gray-300 text-gray-700 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'}`}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => goToPage(pageNumber)}
              className={`px-3 py-2 mx-1 ${currentPage === pageNumber ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'} rounded`}
            >
              {pageNumber}
            </button>
          ))}
          <button
            onClick={goToNextPage}
            className={`px-3 py-2 mx-1 bg-gray-300 text-gray-700 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'}`}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>

        {/* Edit Product Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
              <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Product Name</label>
                  <input
                    type="text"
                    value={selectedProduct?.productName || ''}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, productName: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Product Description</label>
                  <textarea
                    value={selectedProduct?.productDescription || ''}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, productDescription: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    rows="4"
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
                    type="button"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={() => {
                      console.log('Updated product:', selectedProduct);
                      closeModal();
                    }}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ListProduct;
