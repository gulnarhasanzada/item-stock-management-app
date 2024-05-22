import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getSales, removeSale } from '../../store/saleSlice';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { useState } from 'react';
import DialogBox from '../../components/common/Dialog';
import SaleForm from '../../components/forms/SaleForm';

const Sales = ()=>{
  const sales = useSelector(state=>state.sales.sales)
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'product',
      headerName: 'Product',
      width: 200,
      editable: false,
    },
    {
      field: 'brand',
      headerName: 'Brand',
      width: 200,
      editable: false,
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 150,
      editable: false,
      renderCell: (params) => (
        params.value.map(v=><span key={v.id}>{v.name} </span>)
      ),
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 100,
      editable: false,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      type: 'number',
      width: 90,
      editable: false,
    },
    {
        field: 'price_total',
        headerName: 'Total Price',
        type: 'number',
        width: 120,
        editable: false,
    },
    {
        field: 'created',
        headerName: 'Date Time',
        type: 'datetime',
        width: 120,
        editable: false,
    },
    {
        field: 'user',
        headerName: 'Owner',
        width: 150,
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
        <EditIcon  className='hover:text-indigo-500 cursor-pointer mr-3' onClick={() => handleEditSale(params.row)}/>
        <DeleteIcon className='text-red-500 hover:text-red-400 cursor-pointer' onClick={() => dispatch(removeSale(params.row.id))}/>
        </div>
      ),
    },
  ];

  useEffect(()=>{
    dispatch(getSales())
  },[dispatch])

  const handleAddSale=()=>{
    setOpen(true)
    setEditMode(false)
  }

  const handleEditSale =(sale)=>{
    setOpen(true)
    setEditMode(true)
    setSelectedSale(sale)
  }

  return (
    <Box className="mx-auto">
      <Box className='h-auto w-[90vw] md:w-[95vw] xl:w-[80vw] overflow-auto mx-auto '>
      <h3 className='text-lg font-semibold mb-5'>Sales</h3>
      <Button variant='contained' className='text-white !bg-indigo-500' onClick={handleAddSale}><AddIcon/>  Add Sale</Button>
      <DataGrid  
        sx={{mt:3}}
        rows={sales}
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
                <SaleForm sale={editMode? selectedSale: null} setOpen={setOpen} editMode={editMode}/>
              </DialogBox>}
    </Box>
  );
}

export default Sales
