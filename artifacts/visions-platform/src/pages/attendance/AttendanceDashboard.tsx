import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import PageHeader from '../../components/PageHeader';
import StatCard from '../../components/StatCard';
import StatusChip from '../../components/StatusChip';
import { regions, centres } from '../../data/mockData';

const trendData = [
  { day: 'Mon', percent: 85 }, { day: 'Tue', percent: 88 }, { day: 'Wed', percent: 82 },
  { day: 'Thu', percent: 89 }, { day: 'Fri', percent: 91 }, { day: 'Sat', percent: 75 }
];

const mockRecords = [
  { id: 1, student: 'Priya Ramesh', centre: 'Madurai Centre A', date: '2024-05-15', status: 'Present', behaviour: 'Attentive', remarks: '' },
  { id: 2, student: 'Karthik Selvam', centre: 'Chennai North', date: '2024-05-15', status: 'Absent', behaviour: '-', remarks: 'Fever' },
  { id: 3, student: 'Anitha Devi', centre: 'Dindigul Centre', date: '2024-05-15', status: 'Late', behaviour: 'Distracted', remarks: 'Transport issue' },
  { id: 4, student: 'Murugan Pillai', centre: 'Bangalore Hub', date: '2024-05-15', status: 'Present', behaviour: 'Active', remarks: '' },
  { id: 5, student: 'Lakshmi V.', centre: 'Nellore Centre', date: '2024-05-15', status: 'Present', behaviour: 'Quiet', remarks: '' },
];

const AttendanceDashboard: React.FC = () => {
  const [date, setDate] = useState(dayjs());
  const [region, setRegion] = useState('All');
  
  const columns: GridColDef[] = [
    { field: 'student', headerName: 'Student', flex: 1 },
    { field: 'centre', headerName: 'Centre', flex: 1 },
    { field: 'date', headerName: 'Date', width: 130 },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 120,
      renderCell: (params) => <StatusChip status={params.value} />
    },
    { field: 'behaviour', headerName: 'Behaviour', flex: 1 },
    { field: 'remarks', headerName: 'Remarks', flex: 1 },
  ];

  return (
    <Box>
      <PageHeader 
        title="Attendance Dashboard" 
        subtitle="Monitor daily attendance across all centres"
        action={{ label: "Mark Attendance", to: "/attendance/entry" }}
      />

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={6} sm={3}><StatCard title="Present Today" value="892" icon={null} color="#2E7D32" /></Grid>
        <Grid item xs={6} sm={3}><StatCard title="Absent Today" value="142" icon={null} color="#C62828" trendPositive={false} trend="12 higher than avg" /></Grid>
        <Grid item xs={6} sm={3}><StatCard title="Total Attendance %" value="86.3%" icon={null} color="#1565C0" /></Grid>
        <Grid item xs={6} sm={3}><StatCard title="Consecutive Absences" value="34" icon={null} color="#E65100" /></Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: 350, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" sx={{ mb: 2, fontSize: '1rem' }}>7-Day Trend</Typography>
            <Box sx={{ flexGrow: 1, minHeight: 0 }}>
              <ResponsiveContainer>
                <AreaChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="percent" stroke="#1565C0" fill="#E3F2FD" />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                  label="Date" 
                  value={date} 
                  onChange={(v) => setDate(v || dayjs())} 
                  slotProps={{ textField: { size: 'small', sx: { width: 150 } } }}
                />
              </LocalizationProvider>
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Region</InputLabel>
                <Select value={region} label="Region" onChange={(e) => setRegion(e.target.value)}>
                  <MenuItem value="All">All Regions</MenuItem>
                  {regions.map(r => <MenuItem key={r.id} value={r.id}>{r.name}</MenuItem>)}
                </Select>
              </FormControl>
              <Button variant="outlined" size="small" sx={{ ml: 'auto' }}>Export PDF</Button>
            </Box>
            
            <DataGrid
              rows={mockRecords}
              columns={columns}
              autoHeight
              hideFooter
              sx={{ border: 'none' }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AttendanceDashboard;
