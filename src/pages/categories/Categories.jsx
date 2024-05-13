import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getCategories } from '../../store/categorySlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state=>state.categories.categories)
  useEffect(()=>{
    dispatch(getCategories());
  },[dispatch])

  console.log(categories)
  return (
    <Paper  className='!w-2/3 mx-auto p-5'>
     <h1 className='font-semibold mb-5'>Categories</h1>
     <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align='left'>#</TableCell>
            <TableCell align="left">Category Name</TableCell>
            <TableCell align="left">Number of Products</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories && categories.map(item=>(
            <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="left">{item.id}</TableCell>
              <TableCell align="left">{item.name}</TableCell>
              <TableCell align="left">{item.product_count}</TableCell>
              <TableCell align="left">
                <EditIcon className='hover:text-indigo-500 cursor-pointer mr-3'/>
                <DeleteIcon className='text-red-500 hover:text-red-400 cursor-pointer'/>
              </TableCell>
            </TableRow>
          ))
            
          }
        </TableBody>
      </Table>
     </TableContainer>
    </Paper>
  )
}

export default Categories
