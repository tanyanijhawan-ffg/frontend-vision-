import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, Card, Typography, Avatar, Grid, Tabs, Tab, Paper, Divider,
  Chip, List, ListItem, ListItemText, ListItemIcon, Button
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import PageHeader from '../../components/PageHeader';
import StatusChip from '../../components/StatusChip';
import { students } from '../../data/mockData';

const subjectScores = [
  { subject: 'Tamil', q1: 65, q2: 70, q3: 75 },
  { subject: 'English', q1: 50, q2: 55, q3: 68 },
  { subject: 'Math', q1: 45, q2: 60, q3: 65 },
  { subject: 'Science', q1: 70, q2: 72, q3: 78 },
  { subject: 'Social', q1: 75, q2: 80, q3: 82 },
];

const StudentProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  // In a real app, fetch student by id. Using first mock student as fallback.
  const student = students.find(s => s.id === id) || students[0];

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/students')} sx={{ mb: 2 }}>
        Back to Students
      </Button>

      {/* Hero Card */}
      <Card sx={{ p: 4, mb: 3, display: 'flex', flexWrap: 'wrap', gap: 4, alignItems: 'center', background: 'linear-gradient(to right, #ffffff, #f8f9fa)' }}>
        <Avatar sx={{ width: 100, height: 100, bgcolor: 'primary.main', fontSize: '2rem' }}>
          {student.name.charAt(0)}
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <Typography variant="h4" fontWeight="bold">{student.name}</Typography>
            <StatusChip status={student.status} />
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            ID: {student.id} • Class {student.class} • {student.centre}
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">Age / Gender</Typography>
              <Typography variant="body2" fontWeight="bold">{student.age} yrs / {student.gender}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">Attendance</Typography>
              <Typography variant="body2" fontWeight="bold" color={student.attendancePercent < 75 ? 'error.main' : 'success.main'}>
                {student.attendancePercent}%
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">Avg Score</Typography>
              <Typography variant="body2" fontWeight="bold" color="primary.main">{student.academicScore}%</Typography>
            </Box>
          </Box>
        </Box>
        <Button variant="outlined" startIcon={<SchoolIcon />} onClick={() => navigate(`/academics/${student.id}`)}>
          Full Academic Profile
        </Button>
      </Card>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)}>
          <Tab label="Overview" />
          <Tab label="Academic Progress" />
          <Tab label="Attendance Details" />
        </Tabs>
      </Box>

      {/* Tab 0: Overview */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" sx={{ mb: 2, fontSize: '1.1rem' }}>Personal & Family</Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}><Typography variant="body2" color="text.secondary">Date of Birth</Typography></Grid>
                <Grid item xs={8}><Typography variant="body2" fontWeight={500}>14 May 2012</Typography></Grid>
                
                <Grid item xs={4}><Typography variant="body2" color="text.secondary">School</Typography></Grid>
                <Grid item xs={8}><Typography variant="body2" fontWeight={500}>Govt Higher Secondary, Madurai</Typography></Grid>
                
                <Grid item xs={12}><Divider sx={{ my: 1 }} /></Grid>

                <Grid item xs={4}><Typography variant="body2" color="text.secondary">Father's Name</Typography></Grid>
                <Grid item xs={8}><Typography variant="body2" fontWeight={500}>Ramesh K</Typography></Grid>
                
                <Grid item xs={4}><Typography variant="body2" color="text.secondary">Occupation</Typography></Grid>
                <Grid item xs={8}><Typography variant="body2" fontWeight={500}>Daily Wage Labourer</Typography></Grid>
                
                <Grid item xs={4}><Typography variant="body2" color="text.secondary">Contact</Typography></Grid>
                <Grid item xs={8}><Typography variant="body2" fontWeight={500}>+91 98765 43210</Typography></Grid>
              </Grid>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <WarningAmberIcon color="warning" />
                <Typography variant="h6" sx={{ fontSize: '1.1rem' }}>Vulnerability Profile</Typography>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                {student.vulnerabilities.length > 0 ? (
                  student.vulnerabilities.map((v, i) => (
                    <Chip key={i} label={v} color="warning" sx={{ mr: 1, mb: 1 }} />
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">No identified vulnerabilities.</Typography>
                )}
              </Box>

              <Typography variant="subtitle2" gutterBottom>Socio-Economic Summary</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}><Typography variant="body2" color="text.secondary">Monthly Income</Typography></Grid>
                <Grid item xs={6}><Typography variant="body2" fontWeight={500}>&lt; ₹5,000</Typography></Grid>
                
                <Grid item xs={6}><Typography variant="body2" color="text.secondary">House Type</Typography></Grid>
                <Grid item xs={6}><Typography variant="body2" fontWeight={500}>Hut / Temporary</Typography></Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Tab 1: Academic */}
      {tabValue === 1 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, fontSize: '1.1rem' }}>Subject Performance Trend</Typography>
          <Box sx={{ height: 350, width: '100%', mb: 4 }}>
            <ResponsiveContainer>
              <BarChart data={subjectScores} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="subject" axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} />
                <RechartsTooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="q1" name="Quarter 1" fill="#90CAF9" radius={[4,4,0,0]} />
                <Bar dataKey="q2" name="Quarter 2" fill="#42A5F5" radius={[4,4,0,0]} />
                <Bar dataKey="q3" name="Quarter 3" fill="#1565C0" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      )}

      {/* Tab 2: Attendance */}
      {tabValue === 2 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, fontSize: '1.1rem' }}>Recent Attendance (Last 10 Sessions)</Typography>
          <List>
            {[...Array(5)].map((_, i) => (
              <React.Fragment key={i}>
                <ListItem>
                  <ListItemIcon>
                    <EventIcon color={i === 2 ? "error" : "success"} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={`1${5-i} May 2024`} 
                    secondary={i === 2 ? "Absent - Fever reported" : "Present - Active participation"} 
                  />
                  <Chip label={i === 2 ? "Absent" : "Present"} size="small" color={i === 2 ? "error" : "success"} />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default StudentProfile;
