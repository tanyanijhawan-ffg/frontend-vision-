import React, { useState } from 'react';
import { Box, Paper, FormControl, InputLabel, Select, MenuItem, Button, Grid, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import GridOnIcon from '@mui/icons-material/GridOn';

import PageHeader from '../../components/PageHeader';
import { students, regions, centres } from '../../data/mockData';

const StudentReport: React.FC = () => {
  const [region, setRegion] = useState('All');
  const [centre, setCentre] = useState('All');

  const filteredStudents = students.filter(s => {
    const matchesRegion = region === 'All' || s.region === regions.find(r => r.id === region)?.name;
    const matchesCentre = centre === 'All' || s.centre === centres.find(c => c.id === centre)?.name;
    return matchesRegion && matchesCentre;
  });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 130 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'gender', headerName: 'Gender', width: 80 },
    { field: 'age', headerName: 'Age', width: 70 },
    { field: 'class', headerName: 'Class', width: 80 },
    { field: 'centre', headerName: 'Centre', flex: 1 },
    { field: 'attendancePercent', headerName: 'Attd %', width: 90 },
    { field: 'academicScore', headerName: 'Score %', width: 90 },
  ];

  return (
    <Box>
      <PageHeader 
        title="Student Report" 
        breadcrumbs={[{ label: 'Reports', to: '/reports' }, { label: 'Students' }]} 
      />

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <FormControl size="small" fullWidth>
              <InputLabel>Region Filter</InputLabel>
              <Select value={region} label="Region Filter" onChange={(e) => setRegion(e.target.value)}>
                <MenuItem value="All">All Regions</MenuItem>
                {regions.map(r => <MenuItem key={r.id} value={r.id}>{r.name}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl size="small" fullWidth>
              <InputLabel>Centre Filter</InputLabel>
              <Select value={centre} label="Centre Filter" onChange={(e) => setCentre(e.target.value)}>
                <MenuItem value="All">All Centres</MenuItem>
                {centres.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
            <Button variant="outlined" startIcon={<PictureAsPdfIcon />}>PDF</Button>
            <Button variant="outlined" startIcon={<GridOnIcon />} color="success">Excel</Button>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
        <Typography variant="body2">Total Results: <strong>{filteredStudents.length}</strong></Typography>
        <Typography variant="body2">Avg Attendance: <strong>86%</strong></Typography>
        <Typography variant="body2">Avg Score: <strong>72%</strong></Typography>
      </Box>

      <Paper sx={{ width: '100%' }}>
        <DataGrid
          rows={filteredStudents}
          columns={columns}
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 25 } } }}
          pageSizeOptions={[25, 50, 100]}
          disableRowSelectionOnClick
          autoHeight
        />
      </Paper>
    </Box>
  );
};

export default StudentReport;
