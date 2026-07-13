import React from 'react';
import { Box, Grid, Card, CardContent, Typography, Avatar, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import MapIcon from '@mui/icons-material/Map';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import PageHeader from '../../components/PageHeader';

const reportTypes = [
  { 
    id: 'students', 
    title: 'Student Report', 
    desc: 'Individual student academic, attendance, and vulnerability data.', 
    icon: <PersonIcon />, 
    color: '#1565C0',
    path: '/reports/students'
  },
  { 
    id: 'centres', 
    title: 'Centre Report', 
    desc: 'Centre-wise performance summary and operational metrics.', 
    icon: <BusinessIcon />, 
    color: '#2E7D32',
    path: '/reports/centres'
  },
  { 
    id: 'districts', 
    title: 'District Report', 
    desc: 'Aggregated data at the district level for regional oversight.', 
    icon: <LocationOnIcon />, 
    color: '#E65100',
    path: '/reports/districts'
  },
  { 
    id: 'regions', 
    title: 'Region Report', 
    desc: 'High-level comparison of regions across the entire platform.', 
    icon: <MapIcon />, 
    color: '#6A1B9A',
    path: '/reports/regions'
  },
];

const ReportsHub: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <PageHeader 
        title="Reports Hub" 
        subtitle="Generate and export comprehensive data reports"
      />

      <Grid container spacing={3}>
        {reportTypes.map((report) => (
          <Grid item xs={12} sm={6} key={report.id}>
            <Card sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 3 } }}>
              <CardActionArea onClick={() => navigate(report.path)} sx={{ height: '100%', p: 1 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: `${report.color}15`, color: report.color, width: 48, height: 48, mr: 2 }}>
                      {report.icon}
                    </Avatar>
                    <Typography variant="h6">{report.title}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ minHeight: 40 }}>
                    {report.desc}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <Box sx={{ mt: 6, p: 4, bgcolor: 'grey.50', borderRadius: 2, border: '1px dashed', borderColor: 'divider', textAlign: 'center' }}>
        <Avatar sx={{ m: '0 auto', mb: 2, bgcolor: 'error.50', color: 'error.main' }}>
          <PictureAsPdfIcon />
        </Avatar>
        <Typography variant="h6" gutterBottom>Custom PDF Export</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 500, mx: 'auto' }}>
          Need a specific format? Use the individual report pages to filter data exactly as you need it, then click Export PDF or Excel on those pages.
        </Typography>
      </Box>
    </Box>
  );
};

export default ReportsHub;
