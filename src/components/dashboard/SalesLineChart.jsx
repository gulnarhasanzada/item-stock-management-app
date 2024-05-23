import React from 'react'
import LineChrt from '../common/LineChrt'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getSales } from '../../store/saleSlice';

const SalesLineChart = () => {
    const dispatch = useDispatch();
    const sales = useSelector(state=>state.sales.sales)

    useEffect(()=>{
      dispatch(getSales())
    },[])

    const data = sales.map((sale)=>{
        return {
            name: sale.time_hour,
            amount: parseFloat(sale.price_total)
        }
    })
  return (
    <LineChrt data={data} dataKey="amount"/>
  )
}

export default SalesLineChart
