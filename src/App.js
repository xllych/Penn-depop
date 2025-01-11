import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import React from 'react';
import Home from "./pages/Home"
import Navbar from './components/Navbar'
import Cart from './pages/Cart';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import Upload from './pages/Upload';
import Product from './pages/Product';
import CategoryPage from './pages/CategoryPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

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
