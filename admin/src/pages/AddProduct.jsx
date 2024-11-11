import { useEffect, useState } from 'react';
import { FiUpload } from 'react-icons/fi'; // Replace or remove if not using react-icons
import { createdata, fetchdata, fetchsubcate } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productSubCategory, setProductSubCategory] = useState('');
  const [productSize, setProductSize] = useState('');
  const [productRating, setProductRating] = useState('5');
  const [productImages, setProductImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [productCateList, setProductCateList] = useState([]);
  const [subCateList, setSubCateList] = useState([]); // List of subcategories
  const [isSubCategoryDisabled, setIsSubCategoryDisabled] = useState(true); // Disable subcategory initially
  const [loading, setLoading] = useState(false);
const [success, setSuccess] = useState(false);
const [errorMessage, setErrorMessage] = useState('');
const navigate=useNavigate()

  // Fetch product categories
  useEffect(() => {
    fetchdata("category").then((res) => {
      setProductCateList(res.getcate);
    });
  }, []);

  // Fetch subcategories when category is selected
  useEffect(() => {
    if (productCategory) {
      console.log(productCategory)
      fetchsubcate(`subcate/query/?Catename=${productCategory}`).then((res) => {
        setSubCateList(res.data);
        setIsSubCategoryDisabled(false); // Enable subcategory once data is fetched

        // const res = await fetchsubcate(`subcate/query/?Catename=${categoryId}`); // Adjust your API endpoint accordingly
        // setSubCateList(res.data); 

      });
    } else {
      setIsSubCategoryDisabled(true); // Disable if no category is selected
    }
  }, [productCategory]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProductImages((prevImages) => [...prevImages, ...files]);

    const imagePreviews = files.map((file) => URL.createObjectURL(file));
    setSelectedImages((prevImages) => [...prevImages, ...imagePreviews]);
  };

  const removeImage = (index) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((_, i) => i !== index)
    );
    setProductImages((prevImages) =>
      prevImages.filter((_, i) => i !== index)
    );
  };
// form submit this code
const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);
  setSuccess(false);
  setErrorMessage('');

  const formData = new FormData();
  formData.append('productname', productName);
  formData.append('description', productDescription);
  formData.append('brand', brand);
  formData.append('Productprice', productPrice);
  formData.append('oldPrice', oldPrice);
  formData.append('discount', discount);
  formData.append('Productcategory', productCategory);
  formData.append('productsubcatename', productSubCategory);
  formData.append('productSize', productSize);
  formData.append('rating', productRating);

  productImages.forEach((image, index) => {
    formData.append(`image[${index}]`, image); // Correctly append images with unique keys
  });

  try {
    const res = await createdata('product', formData);

    setLoading(false);
    setSuccess(true);
    resetForm();
    navigate('/listproduct');
  } catch (err) {
    setLoading(false);
    setErrorMessage('Product upload failed. Please try again.');
    console.error(err);
    if(err.request && err.request.status){
      if(err.request.status==404){
        alert("client side error please check URL")
      }
      if(err.request.status==500){
      alert("server error")
      }
    }
    // Handle specific error responses
    if (err.response && err.response.data && err.response.data.message) {
      alert(err.response.data.message);
    }
  }
};

const resetForm = () => {
  setProductName('');
  setProductDescription('');
  setBrand('');
  setProductPrice('');
  setOldPrice('');
  setDiscount('');
  setProductCategory('');
  setProductSubCategory('');
  setProductSize('');
  setProductRating('5');
  setProductImages([]);
  setSelectedImages([]);
};
  

  return (
         <>

<div className="mx-5 mt-10 h-auto shadow-md rounded-md bg-white capitalize flex flex-wrap justify-between items-center py-4">
        {/* Title */}
        <div className="text-xl lg:text-2xl font-bold ps-4 lg:ps-10 text-slate-800 mb-2 lg:mb-0">
          add product
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
              onClick={() => navigate("/listproduct")}
              className="px-3 lg:px-5 py-2 text-slate-100 text-base lg:text-2xl capitalize bg-blue-600 rounded-md font-semibold hover:bg-blue-500 shadow-md shadow-slate-500"
            >
              list product
            </button>
          </div>
        </div>
      </div>

    <div className="mt-4 mx-2 rounded-md mb-5  p-6 bg-white shadow-md">
      <h2 className="text-2xl font-semibold mb-2">Add Product</h2>
      <form onSubmit={handleSubmit}>
      {loading && <p className="text-blue-600">Uploading product, please wait...</p>}
  {success && <p className="text-green-600">Product uploaded successfully!</p>}
  {errorMessage && <p className="text-red-600">{errorMessage}</p>}


        <div className="grid grid-cols-3 gap-5">
          {/* Product Name */}
          <div className="lg:col-span-3 col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="mt-1 block w-full h-12 px-3 py-2 ps-5 text-2xl font-semibold text-slate-800  bg-blue-50  shadow-md hover:border-blue-300 rounded-md hover:border-2 focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm"
              // required
            />
          </div>

          {/* Product Description */}
          <div className="lg:col-span-3 col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              Product Description
            </label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
               className="mt-1 block w-full h-20 px-3 py-2 ps-5 text-2xl font-semibold text-slate-800  bg-blue-50  shadow-md hover:border-blue-300 rounded-md hover:border-2 focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm"
              rows="4"
              // required
            />
          </div>

          {/* Product Category */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Product Category
            </label>
            <select
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              className="mt-1 block w-full h-12 px-3 py-2 ps-5 text-2xl font-semibold text-slate-800 bg-blue-50 shadow-md hover:border-blue-300 rounded-md hover:border-2 focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm"
              // required
            >
              <option value="">Select category...</option>
              {productCateList.map((res, index) => (
                <option key={index} value={res.catename}> {res.catename}</option>
              ))}
            </select>
          </div>


          {/* Product Sub Category */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Product SubCategory
            </label>
            <select
              value={productSubCategory}
              onChange={(e) => setProductSubCategory(e.target.value)}
              className="mt-1 block w-full h-12 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              disabled={isSubCategoryDisabled} // Disable if no category is selected
              // required
            >
              <option value="">Select subcategory...</option>
              {subCateList.map((sub, index) => (
                <option key={index} value={sub.subCateName}>{sub.subCateName}</option>
              ))}
            </select>
          </div>

          {/* Brand */}
          <div className="">
            <label className="block text-sm font-medium text-gray-700">
              Brand
            </label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="mt-1 block w-full h-12 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              // required
            />
          </div>

          {/* Product Price */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Product Price
            </label>
            <input
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className="mt-1 block w-full h-12 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              // required
            />
          </div>

          {/* Old Price */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Old Price
            </label>
            <input
              type="number"
              value={oldPrice}
              onChange={(e) => setOldPrice(e.target.value)}
              className="mt-1 block w-full h-12 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Discount */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Discount
            </label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="mt-1 block w-full h-12 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Product Size */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Product Size
            </label>
            <select
              value={productSize}
              onChange={(e) => setProductSize(e.target.value)}
              className="mt-1 block w-full h-12 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              // required
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          {/* Product Rating */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Product Rating
            </label>
            <select
              value={productRating}
              onChange={(e) => setProductRating(e.target.value)}
              className="mt-1 block w-full h-12 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              // required
            >
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </select>
          </div>

          {/* Product Images */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images
            </label>
            <div className="flex items-center space-x-4">
              <div className="h-20 w-full border-2 border-dashed border-gray-300 flex items-center justify-center rounded-md">
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="hidden"
                  id="file-upload"
                  accept="image/*"
                  multiple
                />
                <label
                  htmlFor="file-upload"
                  className="w-full h-full cursor-pointer flex items-center justify-center space-x-2 text-slate-800 py-2 px-4 rounded-md hover:bg-slate-100 focus:ring-2 focus:ring-blue-500"
                >
                  <FiUpload className="h-5 w-5" />
                  <span>Choose Images</span>
                </label>
              </div>
            </div>

            {/* Image Preview */}
            <div className="flex flex-wrap mt-4 space-x-4">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt="Selected"
                    className="w-20 h-20 object-cover rounded-md border border-gray-300"
                  />
                  <button
                    type="button"
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 text-xs"
                    onClick={() => removeImage(index)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>

            {selectedImages.length > 0 ? (
              <p className="mt-2 text-sm text-green-600">
                {selectedImages.length} images selected
              </p>
            ) : (
              <p className="mt-2 text-sm text-gray-500">No images selected</p>
            )}
          </div>

          {/* Submit Button */}
          <button
    type="submit"
    className="w-full col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-3 px-4 py-3 text-xl uppercase font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    disabled={loading}
  >
    {loading ? 'Uploading...' : 'Add Product'}
  </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default AddProduct;
