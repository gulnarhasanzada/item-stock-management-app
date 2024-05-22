import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack } from '@mui/material';
import { useState } from 'react';

const MediaCard =({data, handleEdit, handleDelete, setSelected, isSelected})=> {
  const [isHovered, setIsHovered] = useState(false);

  const onClickHandler = ()=>{
    setSelected && setSelected(data);
  }
  return (
    <Card sx={{ p: 3, border: isSelected ? '1px solid #9CA3B2' : 'none'}} className='w-full sm:w-2/5 lg:w-1/5'
          onMouseEnter={()=>setIsHovered(true)} 
          onMouseLeave={()=>setIsHovered(false)}
          onClick={onClickHandler}>
      <Stack direction="row" justifyContent="space-between">
      <Typography gutterBottom variant="h5" component="div" className='!text-sm !font-semibold  !my-3'>
          {data.name}
      </Typography>
      <span className={`relative right-2 top-2 ${isHovered ? 'visible': 'invisible'}`} >
        <EditIcon onClick={()=>handleEdit(data)} className='hover:text-indigo-500 cursor-pointer mr-1' fontSize="small"/>
        <DeleteIcon onClick={()=>handleDelete(data.id)} className='text-red-500 hover:text-red-400 cursor-pointer' fontSize="small"/>
      </span>
      </Stack>
      <img src={data.image} alt={data.name} className='max-w-32 mx-auto my-auto p-3'/>
    </Card>
  );
}

export default MediaCard;
