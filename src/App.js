import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import React from 'react';
import Home from "./pages/Home.js"
import Navbar from "./components/Navbar.js"
import Cart from "./pages/Cart.js";
import Chat from "./pages/Chat.js";
import Profile from "./pages/Profile.js";
import Upload from './pages/Upload.js';
import Product from './pages/Product.js';
import CategoryPage from './pages/CategoryPage.js';
import Login from './pages/Login.js';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/upload" element={<Upload />} />
        <Route path='/product' element={<Product />} />
        <Route path='/category/:categoryName' element={<CategoryPage />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
