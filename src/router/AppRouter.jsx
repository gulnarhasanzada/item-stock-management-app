import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import Login from '../pages/login/Login';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<AuthLayout><Login/></AuthLayout>} />
    </Routes>
  );
};

export default AppRouter;
