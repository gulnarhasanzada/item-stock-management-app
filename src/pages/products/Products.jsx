import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, removeProduct } from '../../store/productSlice';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { useState } from 'react';
import DialogBox from '../../components/common/Dialog';
import ProductForm from '../../components/forms/ProductForm';

export default function Products() {
  const products = useSelector(state=>state.products.products)
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Product Name',
      width: 200,
      editable: false,
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 150,
      editable: false,
    },
    {
      field: 'brand',
      headerName: 'Brand',
      width: 150,
      editable: false,
    },
    {
      field: 'stock',
      headerName: 'Stock',
      type: 'number',
      width: 120,
      editable: false,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 160,
      headerAlign: 'right',
      editable: false,
      renderCell: (params) => (
        <div className='text-right'>
        <EditIcon  className='hover:text-indigo-500 cursor-pointer mr-3' onClick={() => handleEditProduct(params.row)}/>
        <DeleteIcon className='text-red-500 hover:text-red-400 cursor-pointer' onClick={() => dispatch(removeProduct(params.row.id))}/>
        </div>
      ),
    },
  ];

  useEffect(()=>{
    dispatch(getProducts())
  },[dispatch])

  const handleAddProduct=()=>{
    setOpen(true)
    setEditMode(false)
  }

  const handleEditProduct =(product)=>{
    setOpen(true)
    setEditMode(true)
    setSelectedProduct(product)
  }

  return (
    <Box className="mx-auto">
      <Box className='h-auto w-[70vw] md:w-[85vw] xl:w-[60vw] overflow-auto mx-auto '>
      <h3 className='text-lg font-semibold mb-5'>Brands</h3>
      <Button variant='contained' className='text-white !bg-indigo-500' onClick={handleAddProduct}><AddIcon/>  Add Product</Button>
      <DataGrid  
        sx={{mt:3}}
        rows={products}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        pageSizeOptions={[20]}
        disableRowSelectionOnClick
      />
    </Box>
    {open && <DialogBox open={open} setOpen={setOpen}>
                <ProductForm product={editMode? selectedProduct: null} setOpen={setOpen} editMode={editMode}/>
              </DialogBox>}
    </Box>
  );
}