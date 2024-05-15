import React, { useEffect, useState } from 'react'
import MediaCard from '../../components/common/MediaCard'
import { getFirms } from '../../store/firmSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Stack } from '@mui/material'
import DialogBox from '../../components/common/Dialog'
import FirmForm from '../../components/forms/FirmForm'
import AddIcon from '@mui/icons-material/Add';
import { removeFirm } from '../../store/firmSlice'

const Firms = () => {
  const dispatch = useDispatch();
  const firms = useSelector(state=>state.firms.firms)
  const [open, setOpen] = useState(false);
  const [selectedFirm, setSelectedFirm] = useState();
  const [editMode, setEditMode] = useState(false);

  useEffect(()=>{
    dispatch(getFirms())
  },[dispatch])  

  const handleAddFirm =()=>{
    setOpen(true)
    setEditMode(false)
  }

  const handleEditFirm= (data)=>{
    setOpen(true);
    setSelectedFirm(data);
    setEditMode(true)
  }

  const handleDeleteFirm = (id)=>{
    setEditMode(false)
    dispatch(removeFirm(id))
  }

  return (
    <Box className="p-5 mx-auto">  
        <h3 className='text-lg font-semibold mb-5'>Firms</h3>
        <Button variant='contained' className='text-white !bg-indigo-500' onClick={handleAddFirm}><AddIcon/>  Add Firm</Button>
        <Stack direction="row" flexWrap="wrap" gap={5} justifyContent="space-between" className='mt-5'>
        {firms.map(firm=>(
            <MediaCard data={firm} key={firm.id} handleDelete={handleDeleteFirm} handleEdit={handleEditFirm}/>
        ))}
        {open && <DialogBox open={open} setOpen={setOpen}>
                    <FirmForm firm={editMode? selectedFirm: null} setOpen={setOpen} editMode={editMode}/>
                 </DialogBox>}
        </Stack>
    </Box>
  )
}

export default Firms
