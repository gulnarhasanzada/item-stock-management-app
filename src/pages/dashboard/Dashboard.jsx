import React from 'react'
import PurchasesSalesPieChart from '../../components/dashboard/PurchasesSalesPieChart'
import { Stack } from '@mui/material'
import PurchasesSalesTotal from '../../components/dashboard/PurchasesSalesTotal'

const Dashboard = () => {
  return (
    <Stack sx={{
      flexDirection: {
        xs: 'column',
        lg: 'row'
      },
      gap: 4,
      justifyContent: 'center'
    }}>
      <PurchasesSalesPieChart/>
      <PurchasesSalesTotal/>
    </Stack>
  )
}

export default Dashboard
