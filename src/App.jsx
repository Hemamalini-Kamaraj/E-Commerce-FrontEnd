import React from 'react'
import Home from './components/Home'
import CartContextProvider from './context/cartContext'
import { useState } from 'react'
import ProductList from './components/ProductList'
import { Route, Routes } from 'react-router-dom'
import Cart from './components/Cart'
import Signin from './components/Signin'
import Signup from './components/Signup'
import ForgotPassword from './components/ForgotPassword'
import UserProfile from './components/UserProfile'

function App() {

  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <CartContextProvider>
      <Routes>
        <Route path='/' element={<Home selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />} />
        <Route path='/product-list/:category' element={<ProductList selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />} />
        <Route path='/cart' element={<Cart selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/user-profile' element={<UserProfile selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} /> } />
      </Routes>
    </CartContextProvider>
  )
}

export default App