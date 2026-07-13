import React from 'react';
import { Box, Paper } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import PageHeader from '../../components/PageHeader';
import StatusChip from '../../components/StatusChip';
import { districts } from '../../data/mockData';

const DistrictReport: React.FC = () => {
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'District Name', flex: 1 },
    { field: 'region', headerName: 'Region', flex: 1 },
    { field: 'centres', headerName: 'Total Centres', width: 130, type: 'number' },
    { field: 'students', headerName: 'Total Students', width: 130, type: 'number' },
    // Mocking averages for report view
    { field: 'attendance', headerName: 'Avg Attd %', width: 120, type: 'number', valueGetter: () => Math.floor(Math.random() * 15) + 80 },
    { field: 'score', headerName: 'Avg Score %', width: 120, type: 'number', valueGetter: () => Math.floor(Math.random() * 20) + 65 },
    { field: 'status', headerName: 'Status', width: 100, renderCell: (params) => <StatusChip status={params.value} /> },
  ];

  return (
    <Box>
      <PageHeader 
        title="District Aggregate Report" 
        breadcrumbs={[{ label: 'Reports', to: '/reports' }, { label: 'Districts' }]} 
        action={{ label: "Export PDF", icon: <PictureAsPdfIcon /> }}
      />
      <Paper sx={{ width: '100%' }}>
        <DataGrid rows={districts} columns={columns} autoHeight hideFooter />
      </Paper>
    </Box>
  );
};

export default DistrictReport;
