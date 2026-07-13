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
import { districts as initialDistricts, regions } from '../../data/mockData';

const DistrictsList: React.FC = () => {
  const [districts, setDistricts] = useState(initialDistricts);
  const [search, setSearch] = useState('');
  const [filterRegion, setFilterRegion] = useState('All');
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    regionId: '',
    status: 'Active'
  });

  const handleOpenDialog = (district?: any) => {
    if (district) {
      setEditingId(district.id);
      setFormData({
        name: district.name,
        regionId: district.regionId,
        status: district.status
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', regionId: '', status: 'Active' });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => setDialogOpen(false);

  const handleSave = () => {
    const regionName = regions.find(r => r.id === formData.regionId)?.name || '';
    
    if (editingId) {
      setDistricts(districts.map(d => d.id === editingId ? { ...d, ...formData, region: regionName } : d));
    } else {
      const newDistrict = {
        id: `DIST-0${districts.length + 1}`,
        ...formData,
        region: regionName,
        centres: 0,
        students: 0
      };
      setDistricts([...districts, newDistrict]);
    }
    handleCloseDialog();
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'District Name', flex: 1, minWidth: 150 },
    { field: 'region', headerName: 'Region', flex: 1, minWidth: 150 },
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

  const filteredData = districts.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = filterRegion === 'All' || d.regionId === filterRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <Box>
      <PageHeader 
        title="District Management" 
        subtitle="Manage districts within regions"
        action={{ label: "Add District", icon: <AddIcon />, onClick: () => handleOpenDialog() }}
      />

      <Paper sx={{ width: '100%', mb: 2 }}>
        <DataTableToolbar searchQuery={search} onSearchChange={setSearch} placeholder="Search districts...">
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Filter by Region</InputLabel>
            <Select
              value={filterRegion}
              label="Filter by Region"
              onChange={(e) => setFilterRegion(e.target.value)}
            >
              <MenuItem value="All">All Regions</MenuItem>
              {regions.map(r => (
                <MenuItem key={r.id} value={r.id}>{r.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DataTableToolbar>
        
        <DataGrid
          rows={filteredData}
          columns={columns}
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
          pageSizeOptions={[10, 25, 50]}
          disableRowSelectionOnClick
          autoHeight
          sx={{ border: 'none' }}
        />
      </Paper>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? 'Edit District' : 'Add New District'}</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, py: 1 }}>
            <TextField
              label="District Name"
              fullWidth
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <FormControl fullWidth required>
              <InputLabel>Region</InputLabel>
              <Select
                value={formData.regionId}
                label="Region"
                onChange={(e) => setFormData({...formData, regionId: e.target.value})}
              >
                {regions.map(r => (
                  <MenuItem key={r.id} value={r.id}>{r.name}</MenuItem>
                ))}
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
          <Button onClick={handleSave} variant="contained" disabled={!formData.name || !formData.regionId}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={Boolean(deleteId)}
        title="Delete District"
        content="Are you sure you want to delete this district?"
        onConfirm={() => {
          setDistricts(districts.filter(d => d.id !== deleteId));
          setDeleteId(null);
        }}
        onCancel={() => setDeleteId(null)}
      />
    </Box>
  );
};

export default DistrictsList;
