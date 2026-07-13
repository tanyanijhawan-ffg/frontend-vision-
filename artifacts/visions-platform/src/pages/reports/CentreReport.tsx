import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import PageHeader from '../../components/PageHeader';
import StatusChip from '../../components/StatusChip';
import { centres } from '../../data/mockData';

const CentreReport: React.FC = () => {
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Centre Name', flex: 1 },
    { field: 'type', headerName: 'Type', width: 100 },
    { field: 'region', headerName: 'Region', flex: 1 },
    { field: 'district', headerName: 'District', flex: 1 },
    { field: 'students', headerName: 'Total Students', width: 120, type: 'number' },
    { field: 'attendance', headerName: 'Avg Attd %', width: 100, type: 'number' },
    { field: 'avgScore', headerName: 'Avg Score %', width: 100, type: 'number' },
    { field: 'highRisk', headerName: 'High Risk', width: 90, type: 'number' },
    { field: 'status', headerName: 'Status', width: 100, renderCell: (params) => <StatusChip status={params.value} /> },
  ];

  return (
    <Box>
      <PageHeader 
        title="Centre Performance Report" 
        breadcrumbs={[{ label: 'Reports', to: '/reports' }, { label: 'Centres' }]} 
        action={{ label: "Export PDF", icon: <PictureAsPdfIcon /> }}
      />

      <Paper sx={{ width: '100%' }}>
        <DataGrid
          rows={centres}
          columns={columns}
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 25 } } }}
          pageSizeOptions={[25, 50]}
          disableRowSelectionOnClick
          autoHeight
        />
      </Paper>
    </Box>
  );
};

export default CentreReport;
