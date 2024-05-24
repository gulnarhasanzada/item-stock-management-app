import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MainCard from '../common/MainCard';

const RecentPurchases = ({data})=> {
  return (
    <MainCard>
    <h2 className='text-xl font-semibold mb-6'>Recent Purchases</h2>    
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="right">Product</TableCell>
            <TableCell align="right">Firm</TableCell>
            <TableCell align="right">Brand</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Qty</TableCell>
            <TableCell align="right">Total Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((purchase) => (
            <TableRow
              key={purchase.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{purchase.id}</TableCell>
              <TableCell align="right">{purchase.product}</TableCell>
              <TableCell align="right">{purchase.firm}</TableCell>
              <TableCell align="right">{purchase.brand}</TableCell>
              <TableCell align="right">{purchase.category[0].name}</TableCell>
              <TableCell align="right">{purchase.price}</TableCell>
              <TableCell align="right">{purchase.quantity}</TableCell>
              <TableCell align="right">{purchase.price_total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </MainCard>
  );
}

export default RecentPurchases;