import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Grid, Avatar, IconButton, FormControl, InputLabel, Select, MenuItem, Snackbar, Alert } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import LanguageIcon from '@mui/icons-material/Language';

const OrgSettings: React.FC = () => {
  const [toastOpen, setToastOpen] = useState(false);

  const handleSave = () => {
    setToastOpen(true);
  };

  return (
    <Box>
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>Organization Profile</Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 3 }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar variant="rounded" sx={{ width: 100, height: 100, bgcolor: 'primary.50', color: 'primary.main' }}>
              <LanguageIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <IconButton 
              sx={{ position: 'absolute', bottom: -10, right: -10, bgcolor: 'background.paper', boxShadow: 1, '&:hover': { bgcolor: 'grey.100' } }}
              size="small"
            >
              <PhotoCameraIcon fontSize="small" color="primary" />
            </IconButton>
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">Organization Logo</Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>This logo will appear on the sidebar and all exported reports.</Typography>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField label="Organization Name" fullWidth defaultValue="Visions Global Empowerment India" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Registration Number" fullWidth defaultValue="NGO-12345-TN-2010" />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Tagline / Slogan" fullWidth defaultValue="Empowering Communities, Transforming Lives" />
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>Contact & Address</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField label="Registered Address" fullWidth defaultValue="123, Main Street, Anna Nagar" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField label="City" fullWidth defaultValue="Madurai" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField label="State" fullWidth defaultValue="Tamil Nadu" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField label="PIN Code" fullWidth defaultValue="625020" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField label="Country" fullWidth defaultValue="India" disabled />
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <TextField label="Primary Email" fullWidth defaultValue="contact@visionsglobal.org" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Primary Phone" fullWidth defaultValue="+91 452 2534567" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Website" fullWidth defaultValue="https://visionsglobal.org" />
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 4 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>System Defaults</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Fiscal Year Start Month</InputLabel>
              <Select label="Fiscal Year Start Month" defaultValue="April">
                <MenuItem value="January">January</MenuItem>
                <MenuItem value="April">April</MenuItem>
                <MenuItem value="July">July</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" size="large" onClick={handleSave}>Save Organization Settings</Button>
        </Box>
      </Paper>

      <Snackbar open={toastOpen} autoHideDuration={3000} onClose={() => setToastOpen(false)}>
        <Alert severity="success" sx={{ width: '100%' }}>Organization settings updated successfully!</Alert>
      </Snackbar>
    </Box>
  );
};

export default OrgSettings;
