import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import MainCard from '../common/MainCard';

const PurchasesSalesPieChart = ({totalPurchases, totalSales}) => {

  return (
    <MainCard>
        <PieChart
        series={[
            {
            data: [
                { id: 0, value: totalPurchases, label: 'Purchases', color:'#EF4444' },
                { id: 1, value: totalSales, label: 'Sales', color:'#6366F1' },
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
