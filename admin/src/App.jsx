import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import AddCate from './pages/AddCate';
import ListCategory from './pages/ListCate';
import AddProduct from './pages/AddProduct';
import ListProduct from './pages/ListProduct';
import AddSubCate from './pages/AddSubCate';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="flex bg-gray-100 min-h-screen">
        {/* Sidebar with fixed position */}
        <div className="w-64 fixed h-full">
          <Sidebar />
        </div>

        {/* Main content with margin to accommodate the fixed sidebar */}
        <div className="flex-1 ml-64 mt-12 flex flex-col overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/addcate" element={<AddCate />} />
            <Route path="/listcate" element={<ListCategory />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/listproduct" element={<ListProduct />} />
            <Route path="/addsubcate" element={<AddSubCate />} />
            
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
