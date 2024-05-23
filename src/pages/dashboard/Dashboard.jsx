import React from 'react'
import PurchasesSalesPieChart from '../../components/dashboard/PurchasesSalesPieChart'
import { Stack } from '@mui/material'
import PurchasesSalesTotal from '../../components/dashboard/PurchasesSalesTotal'
import SalesLineChart from '../../components/dashboard/SalesLineChart'

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
    </Stack>
  )
}

export default Dashboard
