import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import MainLayout from '../components/layout/MainLayout';
import Profile from '../pages/profile/Profile';
import Dashboard from '../pages/dashboard/Dashboard';
import { ThemeProvider } from '@mui/material';
import { theme } from '../util/Theme';
import Categories from '../pages/categories/Categories';
import Brands from '../pages/brands/Brands';

const AppRouter = () => {
  return (
    <ThemeProvider theme={theme}>
    <Routes>
      <Route path="/" element={<AuthLayout/>}>
        <Route index element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
      </Route>
      <Route path="/stock" element={<MainLayout/>}>
        <Route path="/stock/dashboard" element={<Dashboard/>}/>
        <Route path="/stock/profile" element={<Profile/>}/>
        <Route path='/stock/categories' element={<Categories/>}/>
        <Route path='/stock/brands' element={<Brands/>}/>
      </Route> 
    </Routes>
    </ThemeProvider>
  );
};

export default AppRouter;
