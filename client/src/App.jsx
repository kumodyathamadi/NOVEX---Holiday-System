import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loading from './pages/Loading';
import Register from './pages/Register';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import { AnimatePresence } from 'framer-motion';

function App() {
  return (
    <div className="App font-poppins overflow-x-hidden min-h-screen">
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Navigate to="/loading" />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/register" element={<Register />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
