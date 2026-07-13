import React, { useState } from 'react';
import { 
  Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, 
  Collapse, Typography, IconButton, useTheme, useMediaQuery, Divider
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import DashboardIcon from '@mui/icons-material/Dashboard';
import StorageIcon from '@mui/icons-material/Storage';
import PeopleIcon from '@mui/icons-material/People';
import EventNoteIcon from '@mui/icons-material/EventNote';
import SchoolIcon from '@mui/icons-material/School';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const SIDEBAR_WIDTH = 240;
const COLLAPSED_WIDTH = 68;

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, collapsed, onToggleCollapse }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  const navigate = useNavigate();

  const [mastersOpen, setMastersOpen] = useState(location.pathname.startsWith('/masters'));
  const [attendanceOpen, setAttendanceOpen] = useState(location.pathname.startsWith('/attendance'));
  const [academicsOpen, setAcademicsOpen] = useState(location.pathname.startsWith('/academics'));

  const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { 
      text: 'Masters', 
      icon: <StorageIcon />, 
      path: '/masters',
      expandable: true,
      open: mastersOpen,
      setOpen: setMastersOpen,
      children: [
        { text: 'Regions', path: '/masters/regions' },
        { text: 'Districts', path: '/masters/districts' },
        { text: 'Centres', path: '/masters/centres' },
      ]
    },
    { text: 'Students', icon: <PeopleIcon />, path: '/students' },
    { 
      text: 'Attendance', 
      icon: <EventNoteIcon />, 
      path: '/attendance',
      expandable: true,
      open: attendanceOpen,
      setOpen: setAttendanceOpen,
      children: [
        { text: 'Dashboard', path: '/attendance' },
        { text: 'Entry', path: '/attendance/entry' },
      ]
    },
    { 
      text: 'Academics', 
      icon: <SchoolIcon />, 
      path: '/academics',
      expandable: true,
      open: academicsOpen,
      setOpen: setAcademicsOpen,
      children: [
        { text: 'Dashboard', path: '/academics' },
        { text: 'Entry', path: '/academics/entry' },
      ]
    },
    { text: 'Reports', icon: <AssessmentIcon />, path: '/reports' },
    { text: 'Users', icon: <ManageAccountsIcon />, path: '/users' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  const handleNavClick = (item: any) => {
    if (item.expandable) {
      if (collapsed) {
        onToggleCollapse();
      }
      item.setOpen(!item.open);
    } else {
      navigate(item.path);
      if (isMobile) onClose();
    }
  };

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ 
        height: 64, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: collapsed ? 'center' : 'space-between',
        px: collapsed ? 0 : 2,
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: 'primary.main',
        color: 'white'
      }}>
        {!collapsed && (
          <Typography variant="h6" fontWeight="bold" sx={{ whiteSpace: 'nowrap' }}>
            Visions LEP
          </Typography>
        )}
        {collapsed ? (
          <IconButton onClick={onToggleCollapse} sx={{ color: 'white' }}>
            <MenuIcon />
          </IconButton>
        ) : (
          <IconButton onClick={onToggleCollapse} sx={{ color: 'white', display: { xs: 'none', sm: 'flex' } }}>
            <ChevronLeftIcon />
          </IconButton>
        )}
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto', py: 1 }}>
        <List sx={{ px: 1 }}>
          {navItems.map((item, index) => {
            const isParentActive = item.children ? item.children.some(c => location.pathname === c.path || location.pathname.startsWith(c.path + '/')) : location.pathname.startsWith(item.path);
            const isActive = !item.expandable && location.pathname.startsWith(item.path);

            return (
              <React.Fragment key={index}>
                <ListItem disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton 
                    onClick={() => handleNavClick(item)}
                    sx={{
                      minHeight: 44,
                      borderRadius: 1,
                      justifyContent: collapsed ? 'center' : 'initial',
                      px: 2,
                      bgcolor: isActive ? 'primary.50' : 'transparent',
                      color: isActive ? 'primary.main' : 'text.primary',
                      '&:hover': {
                        bgcolor: isActive ? 'primary.100' : 'action.hover',
                      }
                    }}
                  >
                    <ListItemIcon sx={{ 
                      minWidth: 0, 
                      mr: collapsed ? 0 : 2, 
                      justifyContent: 'center',
                      color: isActive || isParentActive ? 'primary.main' : 'text.secondary'
                    }}>
                      {item.icon}
                    </ListItemIcon>
                    {!collapsed && <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: isActive || isParentActive ? 600 : 500 }} />}
                    {!collapsed && item.expandable && (item.open ? <ExpandLess /> : <ExpandMore />)}
                  </ListItemButton>
                </ListItem>
                
                {!collapsed && item.expandable && (
                  <Collapse in={item.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding sx={{ pl: 3, pr: 1, mb: 1 }}>
                      {item.children.map((child, cIndex) => {
                        const isChildActive = location.pathname === child.path || (child.path !== item.path && location.pathname.startsWith(child.path));
                        return (
                          <ListItemButton 
                            key={cIndex} 
                            onClick={() => { navigate(child.path); if(isMobile) onClose(); }}
                            sx={{
                              borderRadius: 1,
                              py: 0.75,
                              mb: 0.5,
                              bgcolor: isChildActive ? 'action.selected' : 'transparent',
                              color: isChildActive ? 'primary.main' : 'text.secondary',
                            }}
                          >
                            <ListItemText primary={child.text} primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: isChildActive ? 600 : 400 }} />
                          </ListItemButton>
                        );
                      })}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            );
          })}
        </List>
      </Box>

      <Divider />
      {!collapsed && (
        <Box sx={{ p: 2 }}>
          <Typography variant="body2" fontWeight="bold">Kavitha Mani</Typography>
          <Typography variant="caption" color="text.secondary">Super Admin</Typography>
        </Box>
      )}
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { sm: collapsed ? COLLAPSED_WIDTH : SIDEBAR_WIDTH }, flexShrink: { sm: 0 }, transition: 'width 0.2s' }}>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? open : true}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: isMobile ? SIDEBAR_WIDTH : (collapsed ? COLLAPSED_WIDTH : SIDEBAR_WIDTH),
            transition: 'width 0.2s',
            overflowX: 'hidden'
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
