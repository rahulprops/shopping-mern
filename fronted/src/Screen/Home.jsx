import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import bannerone from '../assets/bannerleft.png';
import ProductCart from '../Components/ProductCart';
import 'swiper/css';
import 'swiper/css/navigation';
import './style.css';
import { Navigation } from 'swiper/modules';
import BestSeller from '../Components/BestSeller';
import AdverBanner from '../Components/AdverBanner';
import Fassion from '../Components/Fassion';
import Beautiy from '../Components/Beautiy';
import SideBanner from '../Components/SideBanner';

const Home = () => {
  return (
    <>
      <div className='mx-16 flex my-5'>
        <div className='w-[25%]'>
          <SideBanner/>
        </div>
        <div className='w-[70%] h-full ms-5'>
          
          <BestSeller/>
          <AdverBanner/>
          <Fassion/>
          <Beautiy/>
        </div>
      </div>
    </>
  );
};

export default Home;
