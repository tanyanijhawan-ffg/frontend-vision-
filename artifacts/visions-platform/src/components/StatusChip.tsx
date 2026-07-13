import React from 'react';
import { Chip } from '@mui/material';

interface StatusChipProps {
  status: string;
  size?: 'small' | 'medium';
}

const getStatusColor = (status: string) => {
  const s = status.toLowerCase();
  if (s === 'active' || s === 'present' || s === 'completed' || s === 'good') {
    return { color: '#1B5E20', bgcolor: '#E8F5E9', border: '#C8E6C9' };
  }
  if (s === 'inactive' || s === 'absent' || s === 'dropout' || s === 'risk') {
    return { color: '#B71C1C', bgcolor: '#FFEBEE', border: '#FFCDD2' };
  }
  if (s === 'warning' || s === 'late' || s === 'pending') {
    return { color: '#E65100', bgcolor: '#FFF3E0', border: '#FFE0B2' };
  }
  return { color: '#000000', bgcolor: '#F5F5F5', border: '#E0E0E0' };
};

const StatusChip: React.FC<StatusChipProps> = ({ status, size = 'small' }) => {
  const colors = getStatusColor(status);
  
  return (
    <Chip
      label={status}
      size={size}
      sx={{
        color: colors.color,
        bgcolor: colors.bgcolor,
        borderColor: colors.border,
        fontWeight: 600,
        fontSize: size === 'small' ? '0.7rem' : '0.8125rem',
        height: size === 'small' ? 24 : 32,
      }}
      variant="outlined"
    />
  );
};

export default StatusChip;
