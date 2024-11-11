import React from 'react'
import banner1 from '../assets/averbanner1.png'
import banner2 from '../assets/adverbanner2.png'
const AdverBanner = () => {
  return (
    <div className=' mt-8'>
        <div className=' grid   grid-cols-2 gap-2' >
            <div className=' w-full'> <img src={banner1} alt="" className=' w-full h-[200px] rounded-md' /></div>
            <div> <img src={banner2} alt="" className=' w-full h-[200px] rounded-md'  /></div>
        </div>
    </div>
  )
}

export default AdverBanner