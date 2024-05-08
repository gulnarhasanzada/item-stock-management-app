import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout><Login/></AuthLayout>} />
      <Route path="/register" element={<AuthLayout><Register/></AuthLayout>} />
    </Routes>
  );
};

export default AppRouter;
