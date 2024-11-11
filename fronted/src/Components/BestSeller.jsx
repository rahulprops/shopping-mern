import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCart from "./ProductCart";
import "swiper/css";
import "swiper/css/navigation";
import "../Screen/style.css";
import { Navigation } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { fetchallProduct } from "../store/getAllProduct";
import { useNavigate } from "react-router-dom";
const BestSeller = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { products, error, loading } = useSelector((state) => state.allproduct);
  const allProducts = products.product || []; // Adjusted to avoid potential issues if `products.product` doesn't exist
  // console.log(allProducts)
  useEffect(() => {
    dispatch(fetchallProduct());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>; // Simple loading message, can be replaced with a spinner
  }

  if (error) {
    return <div>Error: {error}</div>; // Error message display
  }

  const handleProductDetails=(id)=>{
    // alert(id)
    navigate(`/productview/${id}`)
  }

  return (
    <div>
      <div className="text-3xl font-semibold uppercase text-slate-700">
        Best Sellers
      </div>
      <p className="capitalize mb-5 text-slate-500 text-sm">
        Do not miss the current offers until the end of the year
      </p>

      <Swiper
        navigation={true}
        modules={[Navigation]}
        slidesPerView={4} // Shows 4 slides at a time
        slidesPerGroup={1} // Scrolls 1 slide at a time
        spaceBetween={10} // Adds some spacing between slides
        className="mySwiper"
      >
        {allProducts.length > 0 ? (
          allProducts.map((product, index) => (
            <SwiperSlide key={product.id || index}> {/* Ensure a unique key */}
              <ProductCart  name={product.name} description={product.description} image={product.image} price={product.price} handleproductdetails={()=>handleProductDetails(product._id)}/>
            </SwiperSlide>
          ))
        ) : (
          <div>No products available</div> // Fallback message if no products are found
        )}
      </Swiper>
    </div>
  );
};

export default BestSeller;
