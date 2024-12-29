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
import SignUp from './pages/SignUp.js';
import { AuthProvider } from './context/AuthContext.js';
import ProtectedRoute from './components/ProtectedRoute.js';

function App() {
  return (
    <Router>
    <AuthProvider>
    
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />
        <Route path="/chat" element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
          } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
          } />
        <Route path="/upload" element={
          <ProtectedRoute>
            <Upload />
          </ProtectedRoute>
          } />
        <Route path='/product' element={<Product />} />
        <Route path='/category/:categoryName' element={<CategoryPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    
    </AuthProvider>
    </Router>
  );
}

export default App;
