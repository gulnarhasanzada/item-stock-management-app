import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getSales } from '../../store/saleSlice';
import { getPurchases } from '../../store/purchaseSlice';
import MainCard from '../common/MainCard';

const PurchasesSalesPieChart = () => {
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
        <PieChart
        series={[
            {
            data: [
                { id: 0, value: totalPurchases, label: 'Purchases' },
                { id: 1, value: totalSales, label: 'Sales' },
            ],
            },
        ]}
        width={400}
        height={200}
        />
    </MainCard>
  )
}

export default PurchasesSalesPieChart
