import React from 'react';
import { Card, Box, Typography, Avatar } from '@mui/material';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
  trend?: string;
  trendPositive?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  color = 'primary.main',
  trend,
  trendPositive = true
}) => {
  return (
    <Card sx={{ p: 2.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="body2" color="text.secondary" fontWeight={500}>
          {title}
        </Typography>
        <Avatar sx={{ bgcolor: `${color}15`, color: color, width: 36, height: 36 }}>
          {icon}
        </Avatar>
      </Box>
      <Box sx={{ mt: 'auto' }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5 }}>
          {value}
        </Typography>
        {trend && (
          <Typography variant="caption" sx={{ color: trendPositive ? 'success.main' : 'error.main', fontWeight: 500 }}>
            {trendPositive ? '+' : ''}{trend}
          </Typography>
        )}
      </Box>
    </Card>
  );
};

export default StatCard;
