import React from 'react';
import { Box, Grid, Paper, Typography, List, ListItem, ListItemAvatar, ListItemText, Avatar, Button, Divider } from '@mui/material';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import MapIcon from '@mui/icons-material/Map';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SchoolIcon from '@mui/icons-material/School';
import WarningIcon from '@mui/icons-material/Warning';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EventNoteIcon from '@mui/icons-material/EventNote';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import AssessmentIcon from '@mui/icons-material/Assessment';

import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import StatusChip from '../components/StatusChip';
import { students, activities } from '../data/mockData';

// Chart Data
const enrollmentData = [
  { name: 'Jan', students: 800 },
  { name: 'Feb', students: 850 },
  { name: 'Mar', students: 890 },
  { name: 'Apr', students: 920 },
  { name: 'May', students: 980 },
  { name: 'Jun', students: 1050 },
  { name: 'Jul', students: 1120 },
  { name: 'Aug', students: 1180 },
  { name: 'Sep', students: 1210 },
  { name: 'Oct', students: 1230 },
  { name: 'Nov', students: 1240 },
  { name: 'Dec', students: 1247 },
];

const attendanceData = [
  { name: 'Week 1', percent: 88 },
  { name: 'Week 2', percent: 85 },
  { name: 'Week 3', percent: 82 },
  { name: 'Week 4', percent: 79 },
  { name: 'Week 5', percent: 85 },
  { name: 'Week 6', percent: 89 },
  { name: 'Week 7', percent: 91 },
  { name: 'Week 8', percent: 84 },
];

const subjectData = [
  { subject: 'Tamil', score: 68 },
  { subject: 'English', score: 71 },
  { subject: 'Math', score: 65 },
  { subject: 'Science', score: 74 },
  { subject: 'Social', score: 78 },
];

const regionData = [
  { name: 'TN South', value: 312 },
  { name: 'TN North', value: 289 },
  { name: 'Karnataka', value: 198 },
  { name: 'Andhra P.', value: 256 },
  { name: 'Kerala', value: 192 },
];

const Dashboard: React.FC = () => {
  return (
    <Box>
      <PageHeader title="Dashboard" subtitle="Overview of platform metrics" />

      {/* Stats Grid */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={6} sm={4} md={3}>
          <StatCard title="Total Students" value="1,247" icon={<PeopleIcon />} color="#1565C0" trend="5.2% this month" />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <StatCard title="Active Centres" value="34" icon={<BusinessIcon />} color="#2E7D32" trend="2 added" />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <StatCard title="Regions" value="5" icon={<MapIcon />} color="#6A1B9A" trendPositive={true} />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <StatCard title="Districts" value="18" icon={<LocationOnIcon />} color="#E65100" />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <StatCard title="Attendance Today" value="84%" icon={<TrendingUpIcon />} color="#00695C" trend="1.2% vs yesterday" />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <StatCard title="Avg Academic Score" value="72%" icon={<SchoolIcon />} color="#283593" trend="4% vs last term" />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <StatCard title="High Risk Students" value="87" icon={<WarningIcon />} color="#C62828" trend="12 needs attention" trendPositive={false} />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <StatCard title="New Registrations" value="43" icon={<PersonAddIcon />} color="#00838F" trend="This week" />
        </Grid>
      </Grid>

      {/* Charts Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: 350, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" sx={{ mb: 2, fontSize: '1rem' }}>Student Growth Trend</Typography>
            <Box sx={{ flexGrow: 1, minHeight: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={enrollmentData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                  <YAxis tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="students" stroke="#1565C0" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: 350, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" sx={{ mb: 2, fontSize: '1rem' }}>Attendance Trend (8 Weeks)</Typography>
            <Box sx={{ flexGrow: 1, minHeight: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={attendanceData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                  <defs>
                    <linearGradient id="colorPercent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2E7D32" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                  <YAxis domain={[50, 100]} tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                  <RechartsTooltip />
                  <Area type="monotone" dataKey="percent" stroke="#2E7D32" fillOpacity={1} fill="url(#colorPercent)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: 350, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" sx={{ mb: 2, fontSize: '1rem' }}>Academic Performance by Subject</Typography>
            <Box sx={{ flexGrow: 1, minHeight: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectData} margin={{ top: 20, right: 20, bottom: 5, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="subject" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                  <YAxis domain={[0, 100]} tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                  <RechartsTooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} />
                  <Bar dataKey="score" fill="#FF8F00" radius={[4, 4, 0, 0]} maxBarSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: 350, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" sx={{ mb: 2, fontSize: '1rem' }}>Students by Region</Typography>
            <Box sx={{ flexGrow: 1, minHeight: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionData} margin={{ top: 20, right: 20, bottom: 5, left: -20 }} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                  <YAxis dataKey="name" type="category" tick={{fontSize: 12}} width={80} tickLine={false} axisLine={false} />
                  <RechartsTooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} />
                  <Bar dataKey="value" fill="#1976D2" radius={[0, 4, 4, 0]} maxBarSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Bottom Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 0, overflow: 'hidden' }}>
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ fontSize: '1rem' }}>Recent Enrollments</Typography>
              <Button size="small">View All</Button>
            </Box>
            <Box sx={{ overflowX: 'auto' }}>
              <Box sx={{ minWidth: 600 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr 2fr 1fr 1fr', p: 2, bgcolor: 'grey.50', borderBottom: 1, borderColor: 'divider' }}>
                  <Typography variant="caption" fontWeight="bold" color="text.secondary">ID</Typography>
                  <Typography variant="caption" fontWeight="bold" color="text.secondary">Name</Typography>
                  <Typography variant="caption" fontWeight="bold" color="text.secondary">Centre</Typography>
                  <Typography variant="caption" fontWeight="bold" color="text.secondary">Date</Typography>
                  <Typography variant="caption" fontWeight="bold" color="text.secondary">Status</Typography>
                </Box>
                {students.slice(0, 5).map((student) => (
                  <Box key={student.id} sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr 2fr 1fr 1fr', p: 2, borderBottom: 1, borderColor: 'divider', alignItems: 'center' }}>
                    <Typography variant="body2">{student.id.split('-')[2]}</Typography>
                    <Typography variant="body2" fontWeight={500}>{student.name}</Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>{student.centre}</Typography>
                    <Typography variant="body2" color="text.secondary">{student.date}</Typography>
                    <Box><StatusChip status={student.status} /></Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 0 }}>
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="h6" sx={{ fontSize: '1rem' }}>Recent Activity</Typography>
            </Box>
            <List sx={{ p: 0 }}>
              {activities.map((activity, index) => (
                <React.Fragment key={activity.id}>
                  <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.50', color: 'primary.main' }}>
                        {activity.icon === 'attendance' ? <EventNoteIcon /> : 
                         activity.icon === 'student' ? <PersonAddIcon /> :
                         activity.icon === 'assessment' ? <SchoolIcon /> :
                         activity.icon === 'report' ? <AssessmentIcon /> :
                         activity.icon === 'centre' ? <BusinessIcon /> : <WarningIcon />}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={activity.text}
                      secondary={activity.time}
                      primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                      secondaryTypographyProps={{ variant: 'caption', mt: 0.5 }}
                    />
                  </ListItem>
                  {index < activities.length - 1 && <Divider component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
