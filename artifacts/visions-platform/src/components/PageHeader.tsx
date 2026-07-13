import React from 'react';
import { Box, Typography, Button, Breadcrumbs, Link as MuiLink } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    to?: string;
  };
  breadcrumbs?: Array<{ label: string; to?: string }>;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, action, breadcrumbs }) => {
  return (
    <Box sx={{ mb: 3 }}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 1 }}>
          {breadcrumbs.map((bc, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return isLast || !bc.to ? (
              <Typography key={idx} color="text.primary" variant="body2">
                {bc.label}
              </Typography>
            ) : (
              <MuiLink key={idx} component={Link} to={bc.to} underline="hover" color="inherit" variant="body2">
                {bc.label}
              </MuiLink>
            );
          })}
        </Breadcrumbs>
      )}
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h5" color="text.primary" fontWeight="bold">
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {subtitle}
            </Typography>
          )}
        </Box>
        
        {action && (
          <Box>
            {action.to ? (
              <Button 
                variant="contained" 
                startIcon={action.icon}
                component={Link}
                to={action.to}
              >
                {action.label}
              </Button>
            ) : (
              <Button 
                variant="contained" 
                startIcon={action.icon}
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PageHeader;
