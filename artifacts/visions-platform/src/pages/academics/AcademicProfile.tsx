import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Card, Typography, Avatar, Tabs, Tab, Paper, Grid, Divider, List, ListItem, ListItemText } from '@mui/material';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import PageHeader from '../../components/PageHeader';
import { students } from '../../data/mockData';

const radarData = [
  { subject: 'Tamil', score: 85, fullMark: 100 },
  { subject: 'English', score: 78, fullMark: 100 },
  { subject: 'Math', score: 80, fullMark: 100 },
  { subject: 'Science', score: 88, fullMark: 100 },
  { subject: 'Social', score: 90, fullMark: 100 },
];

const trendData = [
  { term: 'Q1', Tamil: 75, English: 65, Math: 70, Science: 75, Social: 80 },
  { term: 'Q2', Tamil: 80, English: 72, Math: 75, Science: 82, Social: 85 },
  { term: 'Q3', Tamil: 85, English: 78, Math: 80, Science: 88, Social: 90 },
];

const AcademicProfile: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const [tabValue, setTabValue] = useState(0);

  const student = students.find(s => s.id === studentId) || students[0];

  return (
    <Box>
      <PageHeader 
        title="Academic Profile" 
        breadcrumbs={[
          { label: 'Academics', to: '/academics' }, 
          { label: student.name }
        ]} 
      />

      <Card sx={{ p: 3, mb: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
        <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main' }}>{student.name.charAt(0)}</Avatar>
        <Box>
          <Typography variant="h5" fontWeight="bold">{student.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {student.id} • Class {student.class} • {student.centre}
          </Typography>
        </Box>
      </Card>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)}>
          <Tab label="Subject Performance" />
          <Tab label="Trend Analysis" />
          <Tab label="Diagnostic History" />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: 400, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2, alignSelf: 'flex-start' }}>Current Strengths (Q3)</Typography>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                  <Radar name={student.name} dataKey="score" stroke="#1565C0" fill="#1565C0" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: 400, overflowY: 'auto' }}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>Subject Breakdown</Typography>
              <List disablePadding>
                {radarData.map((d, i) => (
                  <React.Fragment key={d.subject}>
                    <ListItem sx={{ py: 1.5, px: 0 }}>
                      <ListItemText 
                        primary={d.subject} 
                        secondary={<Typography variant="body2" color={d.score < 50 ? 'error' : 'text.secondary'}>{d.score}%</Typography>} 
                      />
                      <Box sx={{ width: '60%', bgcolor: 'grey.200', height: 8, borderRadius: 4, overflow: 'hidden' }}>
                        <Box sx={{ width: `${d.score}%`, bgcolor: d.score < 50 ? 'error.main' : d.score < 75 ? 'warning.main' : 'success.main', height: '100%' }} />
                      </Box>
                    </ListItem>
                    {i < radarData.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      )}

      {tabValue === 1 && (
        <Paper sx={{ p: 3, height: 400 }}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>Longitudinal Progress</Typography>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="term" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="Tamil" stroke="#8884d8" />
              <Line type="monotone" dataKey="English" stroke="#82ca9d" />
              <Line type="monotone" dataKey="Math" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      )}

      {tabValue === 2 && (
        <Paper sx={{ p: 3 }}>
          <List>
            <ListItem alignItems="flex-start" sx={{ pb: 3 }}>
              <ListItemText 
                primary="Quarterly Q3 Assessment - Apr 10, 2024"
                secondary={
                  <React.Fragment>
                    <Typography variant="body2" sx={{ mt: 1, display: 'block' }}><strong>Understanding:</strong> Understands Clearly</Typography>
                    <Typography variant="body2" sx={{ display: 'block' }}><strong>Application:</strong> Applies Concepts Independently</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontStyle: 'italic' }}>
                      "Priya has shown excellent improvement in Science. She asks thoughtful questions during experiments."
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider component="li" />
            <ListItem alignItems="flex-start" sx={{ pt: 3 }}>
              <ListItemText 
                primary="Quarterly Q2 Assessment - Jan 15, 2024"
                secondary={
                  <React.Fragment>
                    <Typography variant="body2" sx={{ mt: 1, display: 'block' }}><strong>Understanding:</strong> Needs Repetition</Typography>
                    <Typography variant="body2" sx={{ display: 'block' }}><strong>Application:</strong> Memorises Only</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontStyle: 'italic' }}>
                      "Struggling slightly with complex Math word problems. Will focus on conceptual understanding next term."
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default AcademicProfile;
