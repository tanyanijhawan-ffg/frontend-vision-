import React, { useState } from 'react';
import { Box, IconButton, Badge, Avatar, Menu, MenuItem, InputBase, Popover, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  onToggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleProfileMenuClose();
    navigate('/login');
  };

  const handleProfile = () => {
    handleProfileMenuClose();
    navigate('/settings/profile');
  };

  const handleNotifOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotifAnchorEl(event.currentTarget);
  };

  const handleNotifClose = () => {
    setNotifAnchorEl(null);
  };

  return (
    <Box sx={{
      height: 64,
      display: 'flex',
      alignItems: 'center',
      px: 2,
      bgcolor: 'background.paper',
      borderBottom: 1,
      borderColor: 'divider',
      justifyContent: 'space-between'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={onToggleSidebar} edge="start" sx={{ mr: 2, display: { sm: 'none' } }}>
          <MenuIcon />
        </IconButton>
        
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          bgcolor: 'grey.100', 
          borderRadius: 1, 
          px: 2, 
          py: 0.5,
          width: { xs: 200, sm: 300 }
        }}>
          <SearchIcon sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />
          <InputBase placeholder="Search students, centres..." sx={{ flex: 1, fontSize: '0.875rem' }} />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton color="inherit" onClick={handleNotifOpen}>
          <Badge badgeContent={4} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <Popover
          open={Boolean(notifAnchorEl)}
          anchorEl={notifAnchorEl}
          onClose={handleNotifClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Box sx={{ width: 300, py: 1 }}>
            <Typography variant="subtitle2" sx={{ px: 2, pb: 1, fontWeight: 600 }}>Notifications</Typography>
            <Divider />
            <List sx={{ p: 0 }}>
              <ListItem button>
                <ListItemText primary="Low attendance alert" secondary="Karthik Selvam (< 80%)" primaryTypographyProps={{ variant: 'body2' }} secondaryTypographyProps={{ variant: 'caption' }} />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText primary="Assessments due" secondary="Madurai Centre A" primaryTypographyProps={{ variant: 'body2' }} secondaryTypographyProps={{ variant: 'caption' }} />
              </ListItem>
            </List>
            <Divider />
            <Typography variant="button" sx={{ display: 'block', textAlign: 'center', pt: 1, color: 'primary.main', cursor: 'pointer' }}>
              View All
            </Typography>
          </Box>
        </Popover>

        <IconButton edge="end" onClick={handleProfileMenuOpen}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.875rem' }}>KM</Avatar>
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={handleProfile}>Profile Settings</MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Navbar;
