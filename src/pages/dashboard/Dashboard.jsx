import React from 'react'
import PurchasesSalesPieChart from '../../components/dashboard/PurchasesSalesPieChart'
import { Stack } from '@mui/material'
import PurchasesSalesTotal from '../../components/dashboard/PurchasesSalesTotal'
import SalesLineChart from '../../components/dashboard/SalesLineChart'
import PurchasesLineChart from '../../components/dashboard/PurchasesLineChart'

const Dashboard = () => {
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
      <PurchasesSalesPieChart/>
      <PurchasesSalesTotal/>
      <SalesLineChart/>
      <PurchasesLineChart/>
    </Stack>
  )
}

export default Dashboard
