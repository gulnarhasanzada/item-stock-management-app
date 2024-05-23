import React from 'react'
import PurchasesSalesPieChart from '../../components/charts/PurchasesSalesPieChart'
import { Stack } from '@mui/material'

const Dashboard = () => {
  return (
    <Stack direction="row">
      <PurchasesSalesPieChart/>
    </Stack>
  )
}

export default Dashboard
