import {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getCategories, removeCategory } from '../../store/categorySlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DialogBox from '../../components/common/Dialog';
import { Button } from '@mui/material';
import CategoryForm from '../../components/forms/CategoryForm';

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state=>state.categories.categories);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleEditCategory =(category)=>{
    setOpen(true)
    setEditMode(true)
    setSelectedCategory(category)
  }

  const handleAddCategory =()=>{
    setOpen(true)
    setEditMode(false)
  }

  useEffect(()=>{
    dispatch(getCategories());
  },[dispatch])

  return (
    <Paper  className='!w-2/3 mx-auto p-5'>
     <h1 className='font-semibold mb-6'>Categories</h1>
     <Button variant='contained' className='text-white !bg-indigo-500' onClick={handleAddCategory}><AddIcon/>  Add Category</Button>
     <TableContainer className='mt-5'>
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
                <EditIcon onClick={()=>handleEditCategory(item)} className='hover:text-indigo-500 cursor-pointer mr-3'/>
                <DeleteIcon onClick={()=>dispatch(removeCategory(item.id))} className='text-red-500 hover:text-red-400 cursor-pointer'/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
     </TableContainer>
     {open && <DialogBox open={open} setOpen={setOpen}>
                <CategoryForm category={editMode? selectedCategory: null} setOpen={setOpen} editMode={editMode}/>
              </DialogBox>}
    </Paper>
  )
}

export default Categories
