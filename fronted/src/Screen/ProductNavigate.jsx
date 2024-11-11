import React from 'react';

const categories = [
  { name: "home" },
  { name: "electronics" },
  { name: "fashion" },
  { name: "beauty" },
  { name: "sports" },
  { name: "outdoors" },
  { name: "toys" }
];

const ProductNavigate = () => {
  return (
    <div className="flex mx-10">
      {/* Sidebar */}
      <div className="w-[20%]">

      {/* product category */}
        <div className="p-4 rounded-md my-5">
          <h2 className="text-xl font-semibold capitalize mb-3">Product Category</h2>
          <ul className="overflow-y-auto max-h-44">
            {categories.map((category, index) => (
              <li key={index} className="flex items-center mb-5">
                <input
                  type="checkbox"
                  name="category"
                  id={`category-${index}`}
                  className="mr-2 w-5 h-5 accent-blue-600" // Enlarged size and blue color
                />
                <label htmlFor={`category-${index}`} className="uppercase ps-2">
                  {category.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
        {/* product brand filter  */}

        <div className="p-4 rounded-md my-5">
          <h2 className="text-xl font-semibold capitalize mb-3">brand</h2>
          <ul className="overflow-y-auto max-h-44">
            {categories.map((category, index) => (
              <li key={index} className="flex items-center mb-5">
                <input
                  type="checkbox"
                  name="category"
                  id={`category-${index}`}
                  className="mr-2 w-5 h-5 accent-blue-600" // Enlarged size and blue color
                />
                <label htmlFor={`category-${index}`} className="uppercase ps-2">
                  {category.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-[80%] p-4 bg-white rounded-md shadow-md">
        {/* Placeholder content */}
        <h3 className="text-2xl font-semibold text-gray-700">Main Content Area</h3>
        <p className="text-gray-500">This section will contain the main product details or other content.</p>
      </div>
    </div>
  );
};

export default ProductNavigate;
