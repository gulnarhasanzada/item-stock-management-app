import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack } from '@mui/material';
import { useState } from 'react';

const MediaCard =({data, setOpen, setSelectedItem, setEditMode})=> {
  const [isHovered, setIsHovered] = useState(false);

  const handleEdit= ()=>{
    setOpen(true);
    setSelectedItem(data);
    setEditMode(true)
  }

  const handleDelete = ()=>{
    setEditMode(false)
    setSelectedItem(data);
  }

  return (
    <Card sx={{ p: 3}} className='min-w-full sm:min-w-96' onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}>
      <Stack direction="row" justifyContent="space-between">
      <Typography gutterBottom variant="h5" component="div" className='!text-sm !font-semibold  !my-3'>
          {data.name}
      </Typography>
      <span className={`relative right-2 top-2 ${isHovered ? 'visible': 'invisible'}`} >
        <EditIcon onClick={handleEdit} className='hover:text-indigo-500 cursor-pointer mr-1' fontSize="small"/>
        <DeleteIcon onClick={handleDelete} className='text-red-500 hover:text-red-400 cursor-pointer' fontSize="small"/>
      </span>
      </Stack>
      <img src={data.image} alt={data.name} className='max-w-32 mx-auto my-auto p-3'/>
    </Card>
  );
}

export default MediaCard;
