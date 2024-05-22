import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getPurchases, removePurchase } from '../../store/purchaseSlice';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { useState } from 'react';
import DialogBox from '../../components/common/Dialog';
import PurchaseForm from '../../components/forms/PurchaseForm';

const Purchases = ()=>{
  const purchases = useSelector(state=>state.purchases.purchases)
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'purchases',
        headerName: '#',
        width: 90,
        editable: false,
        renderCell: (params) => {
            const allRows = params.api.getSortedRowIds();
            const rowIndex = allRows.indexOf(params.id);
            return rowIndex + 1;
        } 
      },
    {
      field: 'product',
      headerName: 'Product',
      width: 200,
      editable: false,
    },
    {
      field: 'firm',
      headerName: 'Firm',
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
        <EditIcon  className='hover:text-indigo-500 cursor-pointer mr-3' onClick={() => handleEditPurchase(params.row)}/>
        <DeleteIcon className='text-red-500 hover:text-red-400 cursor-pointer' onClick={() => dispatch(removePurchase(params.row.id))}/>
        </div>
      ),
    },
  ];

  useEffect(()=>{
    dispatch(getPurchases())
  },[dispatch])

  const handleAddPurchase=()=>{
    setOpen(true)
    setEditMode(false)
  }

  const handleEditPurchase =(purchase)=>{
    setOpen(true)
    setEditMode(true)
    setSelectedPurchase(purchase)
  }

  return (
    <Box className="mx-auto">
      <Box className='h-auto w-[905vw] md:w-[95vw] xl:w-[90vw] overflow-auto mx-auto '>
      <h3 className='text-lg font-semibold mb-5'>Purchases</h3>
      <Button variant='contained' className='text-white !bg-indigo-500' onClick={handleAddPurchase}><AddIcon/>  Add Purchase</Button>
      <DataGrid  
        sx={{mt:3}}
        rows={purchases}
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
                <PurchaseForm purchase={editMode? selectedPurchase: null} setOpen={setOpen} editMode={editMode}/>
              </DialogBox>}
    </Box>
  );
}

export default Purchases
