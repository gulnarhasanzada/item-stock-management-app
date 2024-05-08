import { Box } from '@mui/material'
import React from 'react'

const AuthCard = ({children}) => {
  return (
    <Box className="w-full flex flex-col align-items-center px-5 py-14 bg-white my-auto">
        {children}
    </Box>
  )
}

export default AuthCard
