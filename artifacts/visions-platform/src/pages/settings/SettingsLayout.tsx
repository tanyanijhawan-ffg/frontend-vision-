import React from 'react';
import { Box, Paper, Tabs, Tab, Typography } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';

const SettingsLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine current tab from URL
  const currentPath = location.pathname.split('/').pop() || 'profile';
  const tabs = ['profile', 'organization', 'notifications', 'theme'];
  const tabValue = tabs.indexOf(currentPath) !== -1 ? tabs.indexOf(currentPath) : 0;

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    navigate(`/settings/${tabs[newValue]}`);
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <PageHeader 
        title="Platform Settings" 
        subtitle="Manage your profile, organization details, and system preferences"
      />

      <Paper sx={{ mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Profile Settings" />
          <Tab label="Organization" />
          <Tab label="Notifications" />
          <Tab label="Theme & Display" />
        </Tabs>
      </Paper>

      <Box sx={{ pb: 6 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default SettingsLayout;
