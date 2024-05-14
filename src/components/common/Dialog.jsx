import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';

const DialogBox = ({open, setOpen, children}) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={()=>{setOpen(false)}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <CloseIcon onClick={()=>setOpen(false)} className='absolute right-2 top-2 cursor-pointer'/>
        {children}
      </Dialog>
    </>
  )
}

export default DialogBox;