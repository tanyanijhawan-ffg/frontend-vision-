import React from 'react';
import { Box, Grid, Paper, Typography, Button } from '@mui/material';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import PageHeader from '../../components/PageHeader';
import StatCard from '../../components/StatCard';
import StatusChip from '../../components/StatusChip';
import { students } from '../../data/mockData';

const performanceData = [
  { range: '90-100%', count: 120 },
  { range: '80-89%', count: 340 },
  { range: '70-79%', count: 410 },
  { range: '60-69%', count: 220 },
  { range: '< 60%', count: 157 },
];

const trendData = [
  { term: 'Q1', Tamil: 65, English: 58, Math: 62, Science: 68, Social: 70 },
  { term: 'Q2', Tamil: 68, English: 60, Math: 65, Science: 70, Social: 72 },
  { term: 'Q3', Tamil: 72, English: 64, Math: 68, Science: 74, Social: 75 },
];

const mockAssessments = [
  { id: 1, student: 'Priya Ramesh', type: 'Quarterly Q3', tamil: 85, english: 78, math: 80, science: 88, social: 90, total: 84.2, grade: 'A', date: '2024-04-10' },
  { id: 2, student: 'Karthik Selvam', type: 'Quarterly Q3', tamil: 60, english: 55, math: 50, science: 65, social: 62, total: 58.4, grade: 'C', date: '2024-04-10' },
  { id: 3, student: 'Anitha Devi', type: 'Quarterly Q3', tamil: 75, english: 68, math: 70, science: 72, social: 75, total: 72.0, grade: 'B', date: '2024-04-11' },
];

const AcademicDashboard: React.FC = () => {
  const columns: GridColDef[] = [
    { field: 'student', headerName: 'Student Name', flex: 1, minWidth: 150 },
    { field: 'type', headerName: 'Assessment', width: 130 },
    { field: 'tamil', headerName: 'Tam', width: 70, align: 'center', headerAlign: 'center' },
    { field: 'english', headerName: 'Eng', width: 70, align: 'center', headerAlign: 'center' },
    { field: 'math', headerName: 'Mat', width: 70, align: 'center', headerAlign: 'center' },
    { field: 'science', headerName: 'Sci', width: 70, align: 'center', headerAlign: 'center' },
    { field: 'social', headerName: 'Soc', width: 70, align: 'center', headerAlign: 'center' },
    { 
      field: 'total', 
      headerName: 'Total %', 
      width: 90, 
      align: 'center', 
      headerAlign: 'center',
      renderCell: (params) => <Typography variant="body2" fontWeight="bold">{params.value}%</Typography>
    },
    { 
      field: 'grade', 
      headerName: 'Grade', 
      width: 90,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        let color = 'default';
        if(params.value === 'A') color = 'success.main';
        if(params.value === 'B') color = 'primary.main';
        if(params.value === 'C') color = 'warning.main';
        if(params.value === 'D') color = 'error.main';
        return <Typography variant="body2" fontWeight="bold" sx={{ color }}>{params.value}</Typography>;
      }
    },
    { field: 'date', headerName: 'Date', width: 110 },
  ];

  return (
    <Box>
      <PageHeader 
        title="Academic Dashboard" 
        subtitle="Monitor student performance and assessment results"
        action={{ label: "Enter Scores", to: "/academics/entry" }}
      />

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={6} sm={3}><StatCard title="Average Score" value="72%" icon={null} color="#1565C0" trend="Current Term" /></Grid>
        <Grid item xs={6} sm={3}><StatCard title="Top Performers" value="234" icon={null} color="#2E7D32" trend="Score > 85%" /></Grid>
        <Grid item xs={6} sm={3}><StatCard title="Needs Intervention" value="89" icon={null} color="#C62828" trend="Score < 50%" trendPositive={false} /></Grid>
        <Grid item xs={6} sm={3}><StatCard title="Assessments Done" value="456" icon={null} color="#6A1B9A" trend="This Month" /></Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: 350, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" sx={{ mb: 2, fontSize: '1rem' }}>Score Distribution</Typography>
            <Box sx={{ flexGrow: 1, minHeight: 0 }}>
              <ResponsiveContainer>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="range" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <RechartsTooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
                  <Bar dataKey="count" fill="#42A5F5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: 350, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" sx={{ mb: 2, fontSize: '1rem' }}>Subject Trend Overview</Typography>
            <Box sx={{ flexGrow: 1, minHeight: 0 }}>
              <ResponsiveContainer>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="term" axisLine={false} tickLine={false} />
                  <YAxis domain={[40, 100]} axisLine={false} tickLine={false} />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="Math" stroke="#E53935" strokeWidth={2} />
                  <Line type="monotone" dataKey="Science" stroke="#43A047" strokeWidth={2} />
                  <Line type="monotone" dataKey="English" stroke="#1E88E5" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ width: '100%', mb: 2, p: 0 }}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontSize: '1rem' }}>Recent Assessments</Typography>
          <Button size="small">Export List</Button>
        </Box>
        <DataGrid
          rows={mockAssessments}
          columns={columns}
          autoHeight
          hideFooter
          sx={{ border: 'none' }}
        />
      </Paper>
    </Box>
  );
};

export default AcademicDashboard;
