import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Grid, Avatar, Divider, IconButton, Snackbar, Alert } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const ProfileSettings: React.FC = () => {
  const [toastOpen, setToastOpen] = useState(false);

  const handleSave = () => {
    setToastOpen(true);
  };

  return (
    <Box>
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>Personal Information</Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 3 }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main', fontSize: '2rem' }}>KM</Avatar>
            <IconButton 
              sx={{ position: 'absolute', bottom: -5, right: -5, bgcolor: 'background.paper', boxShadow: 1, '&:hover': { bgcolor: 'grey.100' } }}
              size="small"
            >
              <PhotoCameraIcon fontSize="small" color="primary" />
            </IconButton>
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">Profile Picture</Typography>
            <Typography variant="body2" color="text.secondary">JPG, GIF or PNG. Max size of 800K</Typography>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField label="Full Name" fullWidth defaultValue="Kavitha Mani" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Designation" fullWidth defaultValue="Super Admin" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Email Address" fullWidth defaultValue="kavitha@visionsglobal.org" disabled helperText="Contact support to change your email" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Phone Number" fullWidth defaultValue="+91 98765 43210" />
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={handleSave}>Save Changes</Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 4 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>Change Password</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField label="Current Password" type="password" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="New Password" type="password" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Confirm New Password" type="password" fullWidth />
          </Grid>
        </Grid>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary" onClick={handleSave}>Update Password</Button>
        </Box>
      </Paper>

      <Snackbar open={toastOpen} autoHideDuration={3000} onClose={() => setToastOpen(false)}>
        <Alert severity="success" sx={{ width: '100%' }}>Profile updated successfully!</Alert>
      </Snackbar>
    </Box>
  );
};

export default ProfileSettings;
