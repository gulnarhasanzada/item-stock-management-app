import React, { useEffect, useState } from 'react'
import MediaCard from '../../components/common/MediaCard'
import { getBrands } from '../../store/brandSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Stack } from '@mui/material'
import DialogBox from '../../components/common/Dialog'
import BrandForm from '../../components/brands/BrandForm'
import AddIcon from '@mui/icons-material/Add';

const Brands = () => {
  const dispatch = useDispatch();
  const brands = useSelector(state=>state.brands.brands)
  const [open, setOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState();
  const [editMode, setEditMode] = useState(false);

  useEffect(()=>{
    dispatch(getBrands())
  },[dispatch])  

  const handleAddBrand =()=>{
    setOpen(true)
    setEditMode(false)
  }

  return (
    <Box className="p-10 mx-auto">  
        <h3 className='text-lg font-semibold my-5'>Brands</h3>
        <Button variant='contained' className='text-white !bg-indigo-500' onClick={handleAddBrand}><AddIcon/>  Add Brand</Button>
        <Stack direction="row" flexWrap="wrap" gap={5} justifyContent="center" className='mt-5'>
        {brands.map(brand=>(
            <MediaCard data={brand} key={brand.id} setOpen={setOpen} setSelectedItem={setSelectedBrand} setEditMode={setEditMode}/>
        ))}
        {open && <DialogBox open={open} setOpen={setOpen}>
                    <BrandForm brand={editMode? selectedBrand: null} setOpen={setOpen} editMode={editMode}/>
                 </DialogBox>}
        </Stack>
    </Box>
  )
}

export default Brands
