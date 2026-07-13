import React from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface DataTableToolbarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  placeholder?: string;
  children?: React.ReactNode;
}

const DataTableToolbar: React.FC<DataTableToolbarProps> = ({ 
  searchQuery, 
  onSearchChange, 
  placeholder = "Search...",
  children 
}) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center', mb: 2, p: 2, pb: 0 }}>
      <TextField
        variant="outlined"
        size="small"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ minWidth: 250, bgcolor: 'background.paper' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', ml: 'auto' }}>
        {children}
      </Box>
    </Box>
  );
};

export default DataTableToolbar;
