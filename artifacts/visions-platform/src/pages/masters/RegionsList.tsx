import React, { useState } from 'react';
import { 
  Box, Paper, Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, TextField, Select, MenuItem, FormControl, InputLabel, Switch, FormControlLabel 
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import PageHeader from '../../components/PageHeader';
import DataTableToolbar from '../../components/DataTableToolbar';
import StatusChip from '../../components/StatusChip';
import ConfirmDialog from '../../components/ConfirmDialog';
import { regions as initialRegions } from '../../data/mockData';

const RegionsList: React.FC = () => {
  const [regions, setRegions] = useState(initialRegions);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    state: '',
    status: 'Active'
  });

  const handleOpenDialog = (region?: any) => {
    if (region) {
      setEditingId(region.id);
      setFormData({
        name: region.name,
        state: region.state,
        status: region.status
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', state: '', status: 'Active' });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => setDialogOpen(false);

  const handleSave = () => {
    if (editingId) {
      setRegions(regions.map(r => r.id === editingId ? { ...r, ...formData } : r));
    } else {
      const newRegion = {
        id: `REG-00${regions.length + 1}`,
        ...formData,
        districts: 0,
        centres: 0,
        students: 0
      };
      setRegions([...regions, newRegion]);
    }
    handleCloseDialog();
  };

  const handleDelete = () => {
    if (deleteId) {
      setRegions(regions.filter(r => r.id !== deleteId));
      setDeleteId(null);
    }
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Region Name', flex: 1, minWidth: 150 },
    { field: 'state', headerName: 'State', flex: 1, minWidth: 130 },
    { field: 'districts', headerName: 'Total Districts', width: 130, type: 'number', align: 'center', headerAlign: 'center' },
    { field: 'centres', headerName: 'Total Centres', width: 130, type: 'number', align: 'center', headerAlign: 'center' },
    { field: 'students', headerName: 'Total Students', width: 130, type: 'number', align: 'center', headerAlign: 'center' },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 120,
      renderCell: (params: GridRenderCellParams) => <StatusChip status={params.value} />
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <IconButton size="small" onClick={() => handleOpenDialog(params.row)} color="primary">
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => setDeleteId(params.row.id)} color="error">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      )
    }
  ];

  const filteredData = regions.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase()) || 
    r.state.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <PageHeader 
        title="Region Management" 
        subtitle="Manage geographical operating regions"
        action={{ label: "Add Region", icon: <AddIcon />, onClick: () => handleOpenDialog() }}
      />

      <Paper sx={{ width: '100%', mb: 2 }}>
        <DataTableToolbar searchQuery={search} onSearchChange={setSearch} placeholder="Search regions..." />
        <DataGrid
          rows={filteredData}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 10 } },
          }}
          pageSizeOptions={[10, 25, 50]}
          disableRowSelectionOnClick
          loading={loading}
          autoHeight
          sx={{ border: 'none', '& .MuiDataGrid-cell:focus': { outline: 'none' } }}
        />
      </Paper>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? 'Edit Region' : 'Add New Region'}</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, py: 1 }}>
            <TextField
              label="Region Name"
              fullWidth
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <FormControl fullWidth required>
              <InputLabel>State</InputLabel>
              <Select
                value={formData.state}
                label="State"
                onChange={(e) => setFormData({...formData, state: e.target.value})}
              >
                <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
                <MenuItem value="Karnataka">Karnataka</MenuItem>
                <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
                <MenuItem value="Kerala">Kerala</MenuItem>
                <MenuItem value="Telangana">Telangana</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Switch 
                  checked={formData.status === 'Active'} 
                  onChange={(e) => setFormData({...formData, status: e.target.checked ? 'Active' : 'Inactive'})}
                  color="primary"
                />
              }
              label="Active Status"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" disabled={!formData.name || !formData.state}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={Boolean(deleteId)}
        title="Delete Region"
        content="Are you sure you want to delete this region? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </Box>
  );
};

export default RegionsList;
