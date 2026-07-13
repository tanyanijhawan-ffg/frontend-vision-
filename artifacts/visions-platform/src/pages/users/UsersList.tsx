import React, { useState } from 'react';
import { Box, Paper, Avatar, Typography, Chip, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

import PageHeader from '../../components/PageHeader';
import DataTableToolbar from '../../components/DataTableToolbar';
import StatusChip from '../../components/StatusChip';
import { users } from '../../data/mockData';

const UsersList: React.FC = () => {
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Facilitator' });

  const handleOpen = () => setDialogOpen(true);
  const handleClose = () => setDialogOpen(false);

  const columns: GridColDef[] = [
    { 
      field: 'name', 
      headerName: 'User', 
      flex: 1, 
      minWidth: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.875rem' }}>
            {params.value.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight={500}>{params.value}</Typography>
            <Typography variant="caption" color="text.secondary">{params.row.email}</Typography>
          </Box>
        </Box>
      )
    },
    { 
      field: 'role', 
      headerName: 'Role', 
      width: 150,
      renderCell: (params) => {
        let color: any = 'default';
        if(params.value === 'Super Admin') color = 'secondary';
        if(params.value === 'Regional Admin') color = 'primary';
        if(params.value === 'Facilitator') color = 'success';
        return <Chip label={params.value} size="small" color={color} variant="outlined" />;
      }
    },
    { field: 'region', headerName: 'Assigned Region', flex: 1, minWidth: 150 },
    { field: 'centre', headerName: 'Assigned Centre', flex: 1, minWidth: 150 },
    { field: 'lastLogin', headerName: 'Last Login', width: 160 },
    { field: 'status', headerName: 'Status', width: 100, renderCell: (params) => <StatusChip status={params.value} /> },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 80,
      sortable: false,
      renderCell: () => (
        <IconButton size="small" color="primary">
          <EditIcon fontSize="small" />
        </IconButton>
      )
    }
  ];

  const filteredData = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <PageHeader 
        title="User Management" 
        subtitle="Manage platform access and role permissions"
        action={{ label: "Add User", icon: <AddIcon />, onClick: handleOpen }}
      />

      <Paper sx={{ width: '100%', mb: 2 }}>
        <DataTableToolbar searchQuery={search} onSearchChange={setSearch} placeholder="Search users by name, email..." />
        <DataGrid
          rows={filteredData}
          columns={columns}
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
          pageSizeOptions={[10, 25]}
          disableRowSelectionOnClick
          autoHeight
          rowHeight={60}
          sx={{ border: 'none' }}
        />
      </Paper>

      <Dialog open={dialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, py: 1 }}>
            <TextField label="Full Name" fullWidth required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <TextField label="Email Address" type="email" fullWidth required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            <TextField label="Password" type="password" fullWidth required />
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select value={formData.role} label="Role" onChange={e => setFormData({...formData, role: e.target.value})}>
                <MenuItem value="Super Admin">Super Admin</MenuItem>
                <MenuItem value="Regional Admin">Regional Admin</MenuItem>
                <MenuItem value="Facilitator">Facilitator</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} variant="contained">Create User</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UsersList;
