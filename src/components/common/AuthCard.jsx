import { Box } from '@mui/material'
import React from 'react'

const AuthCard = ({children}) => {
  return (
    <Box className="w-full align-items-center p-5 bg-white my-auto">
        {children}
    </Box>
  )
}

export default AuthCard
