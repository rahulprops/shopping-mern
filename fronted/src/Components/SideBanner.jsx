import React from 'react'
import bannerone from '../assets/bannerleft.png'
import bannertwo from '../assets/sidebanner2.png'
const SideBanner = () => {
  return (
    <div>
        <img src={bannerone} alt="banner" className='w-full rounded-md' />
        <img src={bannertwo} alt="banner" className='w-full rounded-md mt-20' />
        <img src={bannerone} alt="banner" className='w-full rounded-md mt-20' />
    </div>
  )
}

export default SideBanner