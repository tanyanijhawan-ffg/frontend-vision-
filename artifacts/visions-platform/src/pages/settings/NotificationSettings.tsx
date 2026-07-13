import React, { useState } from 'react';
import { Box, Paper, Typography, Switch, List, ListItem, ListItemText, Divider, ListSubheader, Snackbar, Alert } from '@mui/material';

const NotificationSettings: React.FC = () => {
  const [toastOpen, setToastOpen] = useState(false);
  const [settings, setSettings] = useState({
    emailMaster: true,
    emailDailyAttd: false,
    emailWeeklyAcad: true,
    emailNewStudent: true,
    emailLowAttd: true,
    emailAssessment: true,
    emailHighRisk: true,
    
    smsMaster: false,
    smsAttdAlert: false,
    smsAssessment: false
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key] });
    setToastOpen(true);
  };

  return (
    <Box>
      <Paper sx={{ mb: 4 }}>
        <List subheader={<ListSubheader sx={{ bgcolor: 'transparent', pt: 2, fontSize: '1.1rem', fontWeight: 'bold' }}>Email Notifications</ListSubheader>}>
          <ListItem sx={{ py: 2 }}>
            <ListItemText 
              primary="Enable Email Notifications" 
              secondary="Master toggle for all email alerts"
              primaryTypographyProps={{ fontWeight: 'bold' }}
            />
            <Switch 
              checked={settings.emailMaster} 
              onChange={() => handleToggle('emailMaster')} 
              color="primary"
            />
          </ListItem>
          <Divider />
          
          <Box sx={{ opacity: settings.emailMaster ? 1 : 0.5, pointerEvents: settings.emailMaster ? 'auto' : 'none' }}>
            <ListItem>
              <ListItemText primary="Daily Attendance Summary" secondary="Receive a digest of attendance across your assigned centres at 6 PM daily." />
              <Switch checked={settings.emailDailyAttd} onChange={() => handleToggle('emailDailyAttd')} color="primary" />
            </ListItem>
            <Divider variant="middle" />
            
            <ListItem>
              <ListItemText primary="Weekly Academic Report" secondary="Receive performance trends every Monday morning." />
              <Switch checked={settings.emailWeeklyAcad} onChange={() => handleToggle('emailWeeklyAcad')} color="primary" />
            </ListItem>
            <Divider variant="middle" />
            
            <ListItem>
              <ListItemText primary="New Student Registration" secondary="Alert when a new student is added to your region." />
              <Switch checked={settings.emailNewStudent} onChange={() => handleToggle('emailNewStudent')} color="primary" />
            </ListItem>
            <Divider variant="middle" />
            
            <ListItem>
              <ListItemText primary="Low Attendance Alert" secondary="Immediate alert when a student's attendance drops below 75%." />
              <Switch checked={settings.emailLowAttd} onChange={() => handleToggle('emailLowAttd')} color="warning" />
            </ListItem>
            <Divider variant="middle" />
            
            <ListItem>
              <ListItemText primary="High Risk Student Alert" secondary="Immediate alert when a student's vulnerability score exceeds threshold." />
              <Switch checked={settings.emailHighRisk} onChange={() => handleToggle('emailHighRisk')} color="error" />
            </ListItem>
          </Box>
        </List>
      </Paper>

      <Paper>
        <List subheader={<ListSubheader sx={{ bgcolor: 'transparent', pt: 2, fontSize: '1.1rem', fontWeight: 'bold' }}>SMS Notifications</ListSubheader>}>
          <ListItem sx={{ py: 2 }}>
            <ListItemText 
              primary="Enable SMS Notifications" 
              secondary="Master toggle for SMS alerts (Standard carrier rates apply)"
              primaryTypographyProps={{ fontWeight: 'bold' }}
            />
            <Switch 
              checked={settings.smsMaster} 
              onChange={() => handleToggle('smsMaster')} 
              color="primary"
            />
          </ListItem>
          <Divider />
          
          <Box sx={{ opacity: settings.smsMaster ? 1 : 0.5, pointerEvents: settings.smsMaster ? 'auto' : 'none' }}>
            <ListItem>
              <ListItemText primary="Critical Attendance Alerts" secondary="SMS when a student is absent for 3 consecutive days." />
              <Switch checked={settings.smsAttdAlert} onChange={() => handleToggle('smsAttdAlert')} color="primary" />
            </ListItem>
            <Divider variant="middle" />
            
            <ListItem>
              <ListItemText primary="Assessment Reminders" secondary="SMS reminders 2 days before assessment marks entry deadline." />
              <Switch checked={settings.smsAssessment} onChange={() => handleToggle('smsAssessment')} color="primary" />
            </ListItem>
          </Box>
        </List>
      </Paper>

      <Snackbar open={toastOpen} autoHideDuration={2000} onClose={() => setToastOpen(false)}>
        <Alert severity="success" sx={{ width: '100%' }}>Preferences saved</Alert>
      </Snackbar>
    </Box>
  );
};

export default NotificationSettings;
