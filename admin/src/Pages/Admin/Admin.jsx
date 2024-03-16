import React from 'react'
import './Admin.css'
import Navbar  from '../../Component/Navbar/Navbar'
import Sidebar from '../../Component/Sidebar/Sidebar'
import { Routes,Route } from 'react-router-dom'
import AddProduct from '../../Component/AddProduct/AddProduct'
import ListProduct from '../../Component/ListProduct/ListProduct'

const Admin = () => {
  return (
    <div className='admin'>
        
        <Sidebar/>
   <Routes>

        <Route path="/listproduct" element={<ListProduct/>} />
        <Route path="/addproduct" element={<AddProduct/>} />
        </Routes>

    </div>
  )
}

export default Admin