import React, { useEffect, useState } from 'react'
import MediaCard from '../../components/common/MediaCard'
import { getFirms } from '../../store/firmSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, ButtonGroup, Stack } from '@mui/material'
import DialogBox from '../../components/common/Dialog'
import FirmForm from '../../components/forms/FirmForm'
import AddIcon from '@mui/icons-material/Add';
import { removeFirm } from '../../store/firmSlice'
import MapIcon from '@mui/icons-material/Map';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import Map from '../../components/map/Map'

const Firms = () => {
  const dispatch = useDispatch();
  const firms = useSelector(state=>state.firms.firms)
  const [open, setOpen] = useState(false);
  const [selectedFirm, setSelectedFirm] = useState();
  const [mapView, setMapView] = useState(false);
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
        <Stack direction="row" justifyContent="space-between">
          <Button variant='contained' className='text-white !bg-indigo-500 w-[15%]' onClick={handleAddFirm}><AddIcon/>  Add Firm</Button>
          <ButtonGroup variant="outlined" aria-label="Basic button group" className='!border-gray-500' color="primary">
            <Button>
              <ViewCarouselIcon 
                className={`${!mapView? 'text-indigo-500': 'text-gray-700'} cursor-pointer`}
                onClick={()=>setMapView(false)}/>
            </Button>
            <Button disabled={!selectedFirm}>
              <MapIcon 
                className={`${mapView? 'text-indigo-500': 'text-gray-700'} cursor-pointer`}
                onClick={()=>setMapView(true)}/>
            </Button>
          </ButtonGroup>
        </Stack>
        {!mapView &&<Stack direction="row" flexWrap="wrap" gap={5} justifyContent="space-between" className='mt-5'>
        {firms.map(firm=>(
            <MediaCard 
                  data={firm} key={firm.id} 
                  handleDelete={handleDeleteFirm} 
                  handleEdit={handleEditFirm} 
                  setSelected={setSelectedFirm}
                  isSelected={selectedFirm && selectedFirm.id === firm.id}/>
        ))}
        {open && <DialogBox open={open} setOpen={setOpen}>
                    <FirmForm firm={editMode? selectedFirm: null} setOpen={setOpen} editMode={editMode}/>
                 </DialogBox>}
        </Stack>}
        {mapView && <Map lat={51.505} lng={-0.09} data={selectedFirm}/>}
    </Box>
  )
}

export default Firms
