import React, {useState} from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Avatar, Divider, Stack, Typography  } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

const ProfileMenu = () => {
    const [anchorEl, setAnchorEl] = useState(false);
    const dispatch = useDispatch();
    const open = Boolean(anchorEl);
    const currentUser = useSelector(state => state.auth.currentUser);
    const isAdmin = useSelector(state => state.auth.admin);
    const first_name = useSelector(state => state.auth.first_name);
    const last_name = useSelector(state => state.auth.last_name);
    const navigate = useNavigate()
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = ()=>{
        dispatch(logout(navigate))
    }

  return (
    <>
    <Avatar sx={{position:'absolute', right: 10, p:2, fontSize:'0.8rem'}} id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}>{first_name[0]}{last_name[0]}</Avatar>
    <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
        'aria-labelledby': 'basic-button',
        }}
    >
        <Stack direction="row" spacing={2}  alignItems="between" sx={{pr:10, pl:2, py:2}}>
          <Avatar sx={{p:2, fontSize:'0.8rem'}}>{first_name[0]}{last_name[0]}</Avatar>
          <div>
          <Typography className='!font-semibold'>{last_name} {first_name}</Typography>
          <Typography className="text-gray-300 !font-semibold !text-sm">{isAdmin? 'Admin': 'User'}</Typography>
          </div>
        </Stack>
        <Divider/>
        <MenuItem onClick={()=>navigate("/stock/profile")} sx={{pr:10, fontSize: '0.9rem', mt:1}}>
            <ListItemIcon>
                <PersonIcon fontSize='small'/>
            </ListItemIcon>
            My Profile
        </MenuItem>
        <Divider/>
        <MenuItem onClick={handleLogout} sx={{pr:10, fontSize: '0.9rem'}}>
            <ListItemIcon>
                <LogoutIcon fontSize='small'/>
            </ListItemIcon>
            Logout
        </MenuItem>
    </Menu>
    </>
  )
}

export default ProfileMenu
