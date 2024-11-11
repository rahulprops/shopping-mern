import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Screen/Home'
import Header from './Components/Header'
import Footer from './Components/Footer'
import ProductView from './Screen/ProductView'
import ProductNavigate from './Screen/ProductNavigate'

function App() {
  const [count, setCount] = useState(0)

  return (
   <BrowserRouter>
   <Header/>
     <div className=' mt-32 flex-1'>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/productview/:id' element={<ProductView/>} />
      <Route path='/productnavigate' element={<ProductNavigate/>} />
    </Routes>
    </div>
    <Footer/>
   </BrowserRouter>
  )
}

export default App
