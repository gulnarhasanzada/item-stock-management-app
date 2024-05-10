import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import MainLayout from '../components/layout/MainLayout';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout><Login/></AuthLayout>} />
      <Route path="/register" element={<AuthLayout><Register/></AuthLayout>} />
      <Route path="/stock/dashboard" element={<MainLayout></MainLayout>} />
    </Routes>
  );
};

export default AppRouter;
