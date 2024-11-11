import { configureStore } from '@reduxjs/toolkit'
import  allProduct  from './getAllProduct'
import  getCategory  from './getcategoy'

export default configureStore({
  reducer: {
    allproduct:allProduct,
    category:getCategory
  },
})