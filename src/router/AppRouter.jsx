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
import Firms from '../pages/firms/Firms';
import Products from '../pages/products/Products';
import Sales from '../pages/sales/Sales';
import Purchases from '../pages/purchases/Purchases';
import PrivateRouter from './PrivateRouter';
import { useSelector } from 'react-redux';

const AppRouter = () => {
  const user = useSelector(state=>state.auth.currentUser)
  return (
    <ThemeProvider theme={theme}>
    <Routes>
      <Route path="/" element={<AuthLayout/>}>
        <Route index element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
      </Route>
      <Route path="/stock" element={<PrivateRouter user={user}><MainLayout/></PrivateRouter>}>
        <Route path="dashboard" element={<Dashboard/>}/>
        <Route path="profile" element={<Profile/>}/>
        <Route path='categories' element={<Categories/>}/>
        <Route path='brands' element={<Brands/>}/>
        <Route path='firms' element={<Firms/>}/>
        <Route path='products' element={<Products/>}/>
        <Route path='sales' element={<Sales/>}/>
        <Route path='purchases' element={<Purchases/>}/>
      </Route> 
    </Routes>
    </ThemeProvider>
  );
};

export default AppRouter;
