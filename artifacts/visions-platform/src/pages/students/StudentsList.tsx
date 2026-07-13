import React, { useState } from 'react';
import { Box, Paper, Avatar, LinearProgress, Typography, FormControl, InputLabel, Select, MenuItem, Chip, Tooltip } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import DataTableToolbar from '../../components/DataTableToolbar';
import StatusChip from '../../components/StatusChip';
import { students, regions, centres } from '../../data/mockData';

const StudentsList: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterRegion, setFilterRegion] = useState('All');
  const [filterCentre, setFilterCentre] = useState('All');

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 140 },
    { 
      field: 'name', 
      headerName: 'Student', 
      flex: 1, 
      minWidth: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.light', color: 'primary.dark', fontSize: '0.875rem' }}>
            {params.value.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight={500}>{params.value}</Typography>
            <Typography variant="caption" color="text.secondary">{params.row.gender} • {params.row.age} yrs • Class {params.row.class}</Typography>
          </Box>
        </Box>
      )
    },
    { field: 'centre', headerName: 'Centre', flex: 1, minWidth: 150 },
    { 
      field: 'attendancePercent', 
      headerName: 'Attendance', 
      width: 130,
      renderCell: (params) => {
        const value = params.value;
        const color = value < 75 ? 'error' : value < 85 ? 'warning' : 'success';
        return (
          <Box sx={{ width: '100%', pr: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="caption" fontWeight="bold">{value}%</Typography>
            </Box>
            <LinearProgress variant="determinate" value={value} color={color as any} sx={{ height: 6, borderRadius: 3 }} />
          </Box>
        );
      }
    },
    { 
      field: 'academicScore', 
      headerName: 'Avg Score', 
      width: 100,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        const value = params.value;
        const color = value < 50 ? 'error.main' : value < 75 ? 'warning.main' : 'success.main';
        return <Typography variant="body2" fontWeight="bold" sx={{ color }}>{value}%</Typography>;
      }
    },
    { 
      field: 'vulnerabilities', 
      headerName: 'Vulnerabilities', 
      width: 200,
      renderCell: (params) => {
        const vuls = params.value as string[];
        if (!vuls || vuls.length === 0) return <Typography variant="caption" color="text.secondary">-</Typography>;
        return (
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', alignItems: 'center', height: '100%' }}>
            {vuls.slice(0, 1).map((v, i) => (
              <Tooltip key={i} title={v}>
                <Chip label={v} size="small" sx={{ maxWidth: 120, fontSize: '0.65rem', height: 20 }} />
              </Tooltip>
            ))}
            {vuls.length > 1 && (
              <Tooltip title={vuls.slice(1).join(', ')}>
                <Chip label={`+${vuls.length - 1}`} size="small" variant="outlined" sx={{ fontSize: '0.65rem', height: 20 }} />
              </Tooltip>
            )}
          </Box>
        );
      }
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 100,
      renderCell: (params) => <StatusChip status={params.value} />
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton size="small" onClick={() => navigate(`/students/${params.row.id}`)} color="primary">
            <VisibilityIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="default">
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>
      )
    }
  ];

  const filteredData = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || 
                          s.id.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = filterRegion === 'All' || s.region === regions.find(r => r.id === filterRegion)?.name;
    const matchesCentre = filterCentre === 'All' || s.centre === centres.find(c => c.id === filterCentre)?.name;
    
    return matchesSearch && matchesRegion && matchesCentre;
  });

  return (
    <Box>
      <PageHeader 
        title="Student Management" 
        subtitle="View and manage all registered beneficiaries"
        action={{ label: "Register Student", icon: <AddIcon />, to: "/students/new" }}
      />

      <Paper sx={{ width: '100%', mb: 2 }}>
        <DataTableToolbar searchQuery={search} onSearchChange={setSearch} placeholder="Search ID, name...">
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Region</InputLabel>
            <Select value={filterRegion} label="Region" onChange={(e) => setFilterRegion(e.target.value)}>
              <MenuItem value="All">All Regions</MenuItem>
              {regions.map(r => <MenuItem key={r.id} value={r.id}>{r.name}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Centre</InputLabel>
            <Select value={filterCentre} label="Centre" onChange={(e) => setFilterCentre(e.target.value)}>
              <MenuItem value="All">All Centres</MenuItem>
              {centres.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
            </Select>
          </FormControl>
        </DataTableToolbar>
        
        <DataGrid
          rows={filteredData}
          columns={columns}
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
          pageSizeOptions={[10, 25, 50]}
          disableRowSelectionOnClick
          onRowClick={(params) => navigate(`/students/${params.row.id}`)}
          autoHeight
          rowHeight={64}
          sx={{ 
            border: 'none',
            '& .MuiDataGrid-row': { cursor: 'pointer' }
          }}
        />
      </Paper>
    </Box>
  );
};

export default StudentsList;
