import React from 'react'
import PurchasesSalesPieChart from '../../components/dashboard/PurchasesSalesPieChart'
import { Stack } from '@mui/material'
import PurchasesSalesTotal from '../../components/dashboard/PurchasesSalesTotal'
import ChartCard from '../../components/common/ChartCard'
import { useDispatch, useSelector } from 'react-redux'
import { getSales } from '../../store/saleSlice'
import { getPurchases } from '../../store/purchaseSlice'
import { useEffect } from 'react'
import RecentPurchases from '../../components/dashboard/RecentPurchases'
import RecentSales from '../../components/dashboard/RecentSales'

const Dashboard = () => {
  const dispatch = useDispatch();
  const sales = useSelector(state => state.sales.sales);
  const purchases = useSelector(state => state.purchases.purchases);

  const totalSales = sales?.reduce((acc,sale)=>acc+parseFloat(sale.price_total), 0);
  const totalPurchases = purchases?.reduce((acc,purchase)=>acc+parseFloat(purchase.price_total), 0);

  const dataSales = sales.map((sale)=>{
    return {
        name: sale.time_hour,
        amount: parseFloat(sale.price_total)
    }
  })

  const dataPurchases = purchases.map((purchase)=>{
    return {
        name: purchase.time_hour,
        amount: parseFloat(purchase.price_total)
    }
  })

  const recentPurchases = [...purchases].sort((a, b)=>{
    return a.id - b.id;
  }).slice(3)

  const recentSales = [...sales].sort((a, b)=>{
    return a.id - b.id;
  }).slice(3)

  useEffect(() => {
    dispatch(getSales());
    dispatch(getPurchases())
  }, [dispatch]);
  return (
    <Stack sx={{
      flexDirection: {
        xs: 'column',
        lg: 'row'
      },
      gap: 4,
      justifyContent: 'center',
      flexWrap:'wrap'
    }}>
      <PurchasesSalesPieChart totalSales={totalSales} totalPurchases={totalPurchases}/>
      <PurchasesSalesTotal/>
      <ChartCard data={dataSales} label="Sales"/>
      <RecentSales data={recentSales}/>
      <ChartCard data={dataPurchases} label="Purchases"/>
      <RecentPurchases data={recentPurchases}/>
    </Stack>
  )
}

export default Dashboard
