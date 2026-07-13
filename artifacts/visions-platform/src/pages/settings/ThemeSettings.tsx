import React, { useState } from 'react';
import { Box, Paper, Typography, Grid, Card, CardActionArea, CardContent, Switch, FormControlLabel, Slider, Snackbar, Alert } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const themes = [
  { id: 'blue', name: 'Professional Blue', primary: '#1565C0', secondary: '#2E7D32', active: true },
  { id: 'emerald', name: 'Emerald Green', primary: '#00695C', secondary: '#0277BD', active: false },
  { id: 'purple', name: 'Deep Purple', primary: '#6A1B9A', secondary: '#00838F', active: false },
];

const ThemeSettings: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState('blue');
  const [toastOpen, setToastOpen] = useState(false);

  const handleThemeSelect = (id: string) => {
    setActiveTheme(id);
    setToastOpen(true);
    // In a real app, this would update the MUI ThemeProvider context
  };

  return (
    <Box>
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>Color Scheme</Typography>
        <Grid container spacing={3}>
          {themes.map(theme => (
            <Grid item xs={12} sm={4} key={theme.id}>
              <Card 
                sx={{ 
                  border: activeTheme === theme.id ? 2 : 1, 
                  borderColor: activeTheme === theme.id ? theme.primary : 'divider',
                  position: 'relative'
                }}
              >
                <CardActionArea onClick={() => handleThemeSelect(theme.id)} sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', height: 60, mb: 2, borderRadius: 1, overflow: 'hidden' }}>
                    <Box sx={{ flex: 1, bgcolor: theme.primary }} />
                    <Box sx={{ flex: 1, bgcolor: theme.secondary }} />
                  </Box>
                  <Typography variant="subtitle1" fontWeight={activeTheme === theme.id ? 'bold' : 'normal'} align="center">
                    {theme.name}
                  </Typography>
                  {activeTheme === theme.id && (
                    <CheckCircleIcon sx={{ position: 'absolute', top: 8, right: 8, color: theme.primary }} />
                  )}
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Paper sx={{ p: 4 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>Display Preferences</Typography>
        
        <Box sx={{ mb: 5, maxWidth: 400 }}>
          <Typography id="font-size-slider" gutterBottom>
            Application Font Size
          </Typography>
          <Slider
            aria-labelledby="font-size-slider"
            defaultValue={2}
            step={1}
            marks={[
              { value: 1, label: 'Small' },
              { value: 2, label: 'Medium' },
              { value: 3, label: 'Large' }
            ]}
            min={1}
            max={3}
            onChangeCommitted={() => setToastOpen(true)}
          />
        </Box>

        <Box>
          <FormControlLabel
            control={<Switch defaultChecked onChange={() => setToastOpen(true)} color="primary" />}
            label={
              <Box>
                <Typography variant="body1">Compact Sidebar Mode</Typography>
                <Typography variant="body2" color="text.secondary">Default to icon-only sidebar on desktop</Typography>
              </Box>
            }
            sx={{ alignItems: 'flex-start' }}
          />
        </Box>
      </Paper>

      <Snackbar open={toastOpen} autoHideDuration={2000} onClose={() => setToastOpen(false)}>
        <Alert severity="success" sx={{ width: '100%' }}>Display preferences updated</Alert>
      </Snackbar>
    </Box>
  );
};

export default ThemeSettings;
