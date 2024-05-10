import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import StarsIcon from '@mui/icons-material/Stars';
import CategoryIcon from '@mui/icons-material/Category';
import { useNavigate } from 'react-router-dom';

const listItems = [
  {label: 'Admin Panel', url: '/admin', icon: AdminPanelSettingsIcon},
  {label: 'Dashboard', url: '/stock/dashboard', icon: DashboardIcon},
  {label: 'Products', url: '/stock/products', icon: InventoryIcon},
  {label: 'Sales', url: '/stock/sales', icon: ReceiptIcon},
  {label: 'Purchases', url: '/stock/purchases', icon: ShoppingCartIcon},
  {label: 'Firms', url: '/stock/firms', icon: AccountBalanceIcon},
  {label: 'Brands', url: '/stock/brands', icon: StarsIcon},
  {label: 'Categories', url: '/stock/categories', icon: CategoryIcon},
]

const Nav = () => {
  const navigate = useNavigate();
  return (
    <List>
      {listItems.map(item => (
        <ListItem key={item.label} disablePadding sx={{ display: 'block' }}>
          <ListItemButton sx={{minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }}>
            <ListItemIcon sx={{minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center',}} onClick={()=>navigate(`${item.url}`)}>
              <item.icon/>
            </ListItemIcon>
            <ListItemText primary={item.label} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}

export default Nav
