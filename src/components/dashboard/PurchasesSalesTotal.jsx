import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getSales } from '../../store/saleSlice';
import { getPurchases } from '../../store/purchaseSlice';
import MainCard from '../common/MainCard';
import { Divider, Stack } from '@mui/material';

const PurchasesSalesTotal = () => {
  const dispatch = useDispatch();
  const sales = useSelector(state => state.sales.sales);
  const purchases = useSelector(state => state.purchases.purchases);

  const totalSales = sales?.reduce((acc,sale)=>acc+parseFloat(sale.price_total), 0);
  const totalPurchases = purchases?.reduce((acc,purchase)=>acc+parseFloat(purchase.price_total), 0);

  useEffect(() => {
    dispatch(getSales());
    dispatch(getPurchases())
  }, [dispatch]);
  
  return (
    <MainCard>
      <Stack direction="row" justifyContent="space-between" sx={{mt:4}}>
        <div className='font-semibold'>Sales</div>
        <div>+${totalSales}</div>
      </Stack>
      <Stack direction="row" justifyContent="space-between" sx={{mt:3}}>
        <div className='font-semibold'>Purchases</div>
        <div>+${totalPurchases}</div>
      </Stack>   
      <Divider sx={{mt:3}}/>
      <Stack direction="row" justifyContent="space-between" sx={{mt:3}}>
        <div className='font-semibold'>Total</div>
        <div>${totalSales - totalPurchases}</div>
      </Stack>
    </MainCard>
  )
}

export default PurchasesSalesTotal
