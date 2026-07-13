import React, { useState } from 'react';
import { 
  Box, Paper, Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, TextField, Select, MenuItem, FormControl, InputLabel, Switch, FormControlLabel,
  Grid
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';

import PageHeader from '../../components/PageHeader';
import DataTableToolbar from '../../components/DataTableToolbar';
import StatusChip from '../../components/StatusChip';
import ConfirmDialog from '../../components/ConfirmDialog';
import { centres as initialCentres, regions, districts } from '../../data/mockData';

const CentresList: React.FC = () => {
  const [centresList, setCentresList] = useState(initialCentres);
  const [search, setSearch] = useState('');
  const [filterRegion, setFilterRegion] = useState('All');
  const [filterDistrict, setFilterDistrict] = useState('All');
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    regionId: '',
    districtId: '',
    village: '',
    facilitator: '',
    startDate: dayjs(),
    status: 'Active'
  });

  const handleOpenDialog = (centre?: any) => {
    if (centre) {
      setEditingId(centre.id);
      // Map string names back to IDs for the form
      const rId = regions.find(r => r.name === centre.region)?.id || '';
      const dId = districts.find(d => d.name === centre.district)?.id || '';
      
      setFormData({
        name: centre.name,
        type: centre.type,
        regionId: rId,
        districtId: dId,
        village: centre.village,
        facilitator: centre.facilitator,
        startDate: dayjs(centre.startDate),
        status: centre.status
      });
    } else {
      setEditingId(null);
      setFormData({ 
        name: '', type: '', regionId: '', districtId: '', 
        village: '', facilitator: '', startDate: dayjs(), status: 'Active' 
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => setDialogOpen(false);

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Centre Name', flex: 1, minWidth: 180 },
    { 
      field: 'type', 
      headerName: 'Type', 
      width: 120,
      renderCell: (params) => (
        <Chip 
          label={params.value} 
          size="small" 
          color={params.value === 'Urban' ? 'primary' : params.value === 'Rural' ? 'success' : 'default'} 
          variant="outlined" 
        />
      )
    },
    { field: 'region', headerName: 'Region', flex: 1, minWidth: 150 },
    { field: 'district', headerName: 'District', flex: 1, minWidth: 130 },
    { field: 'facilitator', headerName: 'Facilitator', flex: 1, minWidth: 150 },
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
          <IconButton size="small" onClick={() => handleOpenDialog(params.row)} color="primary">
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>
      )
    }
  ];

  const filteredData = centresList.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                          c.facilitator.toLowerCase().includes(search.toLowerCase());
    const cRegionId = regions.find(r => r.name === c.region)?.id;
    const matchesRegion = filterRegion === 'All' || cRegionId === filterRegion;
    return matchesSearch && matchesRegion;
  });

  const availableDistricts = filterRegion === 'All' 
    ? districts 
    : districts.filter(d => d.regionId === filterRegion);

  const formAvailableDistricts = formData.regionId 
    ? districts.filter(d => d.regionId === formData.regionId)
    : [];

  return (
    <Box>
      <PageHeader 
        title="Centre Management" 
        subtitle="Manage learning centres and facilitators"
        action={{ label: "Add Centre", icon: <AddIcon />, onClick: () => handleOpenDialog() }}
      />

      <Paper sx={{ width: '100%', mb: 2 }}>
        <DataTableToolbar searchQuery={search} onSearchChange={setSearch} placeholder="Search centres, facilitators...">
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Region</InputLabel>
            <Select
              value={filterRegion}
              label="Region"
              onChange={(e) => {
                setFilterRegion(e.target.value);
                setFilterDistrict('All');
              }}
            >
              <MenuItem value="All">All Regions</MenuItem>
              {regions.map(r => <MenuItem key={r.id} value={r.id}>{r.name}</MenuItem>)}
            </Select>
          </FormControl>
          
          <FormControl size="small" sx={{ minWidth: 150 }} disabled={filterRegion === 'All'}>
            <InputLabel>District</InputLabel>
            <Select
              value={filterDistrict}
              label="District"
              onChange={(e) => setFilterDistrict(e.target.value)}
            >
              <MenuItem value="All">All Districts</MenuItem>
              {availableDistricts.map(d => <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>)}
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

      {/* Add/Edit Dialog - Wider with 2 columns */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{editingId ? 'Edit Centre' : 'Add New Centre'}</DialogTitle>
        <DialogContent dividers>
          <Box component="form" sx={{ py: 1 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Centre Name"
                  fullWidth required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Centre Type</InputLabel>
                  <Select
                    value={formData.type}
                    label="Centre Type"
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  >
                    <MenuItem value="Urban">Urban</MenuItem>
                    <MenuItem value="Semi-Urban">Semi-Urban</MenuItem>
                    <MenuItem value="Rural">Rural</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Region</InputLabel>
                  <Select
                    value={formData.regionId}
                    label="Region"
                    onChange={(e) => {
                      setFormData({...formData, regionId: e.target.value, districtId: ''});
                    }}
                  >
                    {regions.map(r => <MenuItem key={r.id} value={r.id}>{r.name}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required disabled={!formData.regionId}>
                  <InputLabel>District</InputLabel>
                  <Select
                    value={formData.districtId}
                    label="District"
                    onChange={(e) => setFormData({...formData, districtId: e.target.value})}
                  >
                    {formAvailableDistricts.map(d => <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Village / Area"
                  fullWidth required
                  value={formData.village}
                  onChange={(e) => setFormData({...formData, village: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Facilitator Name"
                  fullWidth required
                  value={formData.facilitator}
                  onChange={(e) => setFormData({...formData, facilitator: e.target.value})}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Start Date"
                    value={formData.startDate}
                    onChange={(newValue) => setFormData({...formData, startDate: newValue || dayjs()})}
                    slotProps={{ textField: { fullWidth: true, required: true } }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
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
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleCloseDialog}>Save Centre</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CentresList;
