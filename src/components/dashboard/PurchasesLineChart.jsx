import React from 'react'
import LineChrt from '../common/LineChrt'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getPurchases } from '../../store/purchaseSlice';

const PurchasesLineChart = () => {
    const dispatch = useDispatch();
    const purchases = useSelector(state=>state.purchases.purchases)

    useEffect(()=>{
      dispatch(getPurchases())
    },[])

    const data = purchases.map((purchase)=>{
        return {
            name: purchase.time_hour,
            amount: parseFloat(purchase.price_total)
        }
    })
  return (
    <LineChrt data={data} dataKey="amount" label="Purchases" color="#EF4444"/>
  )
}

export default PurchasesLineChart
