import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const MainCard = ({children})=>{
  return (
    <Card sx={{ width: {xs: '100%', lg: '40%'}, minHeight: '240px', p:3}}>
      <CardContent>
            {children}
      </CardContent>
    </Card>
  );
}

export default MainCard
