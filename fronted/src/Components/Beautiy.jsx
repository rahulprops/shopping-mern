import React, { useEffect, useState } from 'react';
import ProductCart from './ProductCart';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBeauty } from '../store/getcategoy';

const Beauty = () => {
  const dispatch = useDispatch();
  const { beauty, loading, error } = useSelector((state) => state.category);
  const products = beauty.product || []; // Ensure it's correctly fetched
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    dispatch(fetchBeauty());
  }, [dispatch]);

  // Number of products to show per page
  const productsPerPage = 4;

  // Calculate the products to be displayed on the current page
  const startIndex = currentPage * productsPerPage;
  const displayedProducts = products.slice(startIndex, startIndex + productsPerPage);

  // Calculate the total number of pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Function to handle page number click
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to handle next and previous arrow clicks
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mt-10">
      <div className="text-3xl font-semibold capitalize text-slate-700">
        Beauty
      </div>
      <p className="capitalize mb-8 text-slate-500 text-sm">
        Do not miss the current offers until the end of the year
      </p>

      {/* Display products in a grid */}
      <div className="grid grid-cols-4 gap-4 mt-5">
        {displayedProducts.map((product, index) => (
          <ProductCart key={product.id || index}  name={product.name} description={product.description} image={product.image} price={product.price} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-5 flex justify-center items-center gap-2">
        {/* Left Arrow */}
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          className={`px-4 py-2 mx-1 font-bold rounded ${
            currentPage === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-400'
          }`}
        >
          ←
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <button
            key={pageIndex}
            onClick={() => handlePageClick(pageIndex)}
            className={`px-4 py-2 mx-1 font-bold rounded ${
              currentPage === pageIndex ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {pageIndex + 1}
          </button>
        ))}

        {/* Right Arrow */}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
          className={`px-4 py-2 mx-1 font-bold rounded ${
            currentPage === totalPages - 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-400'
          }`}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default Beauty;
