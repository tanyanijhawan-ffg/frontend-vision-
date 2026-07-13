import React from 'react';
import { Box, Paper } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import PageHeader from '../../components/PageHeader';
import StatusChip from '../../components/StatusChip';
import { regions } from '../../data/mockData';

const RegionReport: React.FC = () => {
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Region Name', flex: 1 },
    { field: 'state', headerName: 'State', flex: 1 },
    { field: 'districts', headerName: 'Districts', width: 100, type: 'number' },
    { field: 'centres', headerName: 'Centres', width: 100, type: 'number' },
    { field: 'students', headerName: 'Students', width: 100, type: 'number' },
    { field: 'attendance', headerName: 'Attd %', width: 100, type: 'number', valueGetter: () => Math.floor(Math.random() * 10) + 85 },
    { field: 'score', headerName: 'Score %', width: 100, type: 'number', valueGetter: () => Math.floor(Math.random() * 15) + 70 },
    { field: 'status', headerName: 'Status', width: 100, renderCell: (params) => <StatusChip status={params.value} /> },
  ];

  return (
    <Box>
      <PageHeader 
        title="Regional Comparison Report" 
        breadcrumbs={[{ label: 'Reports', to: '/reports' }, { label: 'Regions' }]} 
        action={{ label: "Export PDF", icon: <PictureAsPdfIcon /> }}
      />
      <Paper sx={{ width: '100%' }}>
        <DataGrid rows={regions} columns={columns} autoHeight hideFooter />
      </Paper>
    </Box>
  );
};

export default RegionReport;
