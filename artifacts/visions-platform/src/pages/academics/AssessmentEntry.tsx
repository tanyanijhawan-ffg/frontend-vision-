import React, { useState } from 'react';
import { 
  Box, Paper, Typography, Grid, TextField, Button, Autocomplete, 
  Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  RadioGroup, FormControlLabel, Radio, FormControl, Snackbar, Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import { students } from '../../data/mockData';

const subjects = [
  { id: 'tam', name: 'Tamil', max: 100 },
  { id: 'eng', name: 'English', max: 100 },
  { id: 'mat', name: 'Mathematics', max: 100 },
  { id: 'sci', name: 'Science', max: 100 },
  { id: 'soc', name: 'Social Science', max: 100 },
];

const AssessmentEntry: React.FC = () => {
  const navigate = useNavigate();
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [assessmentType, setAssessmentType] = useState(0);
  const [scores, setScores] = useState<Record<string, string>>({});
  const [toastOpen, setToastOpen] = useState(false);

  const handleScoreChange = (subId: string, val: string) => {
    // Only allow numbers
    if (val !== '' && !/^\d+$/.test(val)) return;
    const num = parseInt(val, 10);
    if (num > 100) return; // Prevent > 100
    
    setScores(prev => ({ ...prev, [subId]: val }));
  };

  const calculateTotal = () => {
    let total = 0;
    let count = 0;
    Object.values(scores).forEach(s => {
      if (s) {
        total += parseInt(s, 10);
        count++;
      }
    });
    return { total, percent: count === 5 ? (total / 5).toFixed(1) : 0 };
  };

  const getGrade = (percent: number) => {
    if (percent >= 90) return 'A';
    if (percent >= 75) return 'B';
    if (percent >= 60) return 'C';
    if (percent >= 40) return 'D';
    return 'E';
  };

  const { total, percent } = calculateTotal();

  const handleSave = () => {
    setToastOpen(true);
    setTimeout(() => navigate('/academics'), 1500);
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      <PageHeader title="Enter Assessment Scores" breadcrumbs={[{ label: 'Academics', to: '/academics' }, { label: 'Entry' }]} />

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <Autocomplete
              options={students}
              getOptionLabel={(option) => `${option.id} - ${option.name} (${option.centre})`}
              onChange={(_, newValue) => setSelectedStudent(newValue)}
              renderInput={(params) => <TextField {...params} label="Search Student" variant="outlined" size="small" />}
            />
          </Grid>
        </Grid>
      </Paper>

      {selectedStudent && (
        <Box>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={assessmentType} onChange={(_, v) => setAssessmentType(v)}>
              <Tab label="Quarterly Q1" />
              <Tab label="Quarterly Q2" />
              <Tab label="Quarterly Q3" />
              <Tab label="Half-Yearly" />
              <Tab label="Annual" />
            </Tabs>
          </Box>

          <Paper sx={{ mb: 3, overflow: 'hidden' }}>
            <Box sx={{ p: 2, bgcolor: 'primary.50', borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="subtitle1" fontWeight="bold">Subject Scores</Typography>
            </Box>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Subject</TableCell>
                    <TableCell align="center">Max Marks</TableCell>
                    <TableCell align="center">Marks Obtained</TableCell>
                    <TableCell align="center">Percentage</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subjects.map(sub => {
                    const scoreStr = scores[sub.id] || '';
                    const scoreNum = scoreStr ? parseInt(scoreStr, 10) : 0;
                    return (
                      <TableRow key={sub.id}>
                        <TableCell><Typography variant="body2" fontWeight={500}>{sub.name}</Typography></TableCell>
                        <TableCell align="center">{sub.max}</TableCell>
                        <TableCell align="center">
                          <TextField 
                            size="small" 
                            value={scoreStr}
                            onChange={(e) => handleScoreChange(sub.id, e.target.value)}
                            inputProps={{ style: { textAlign: 'center' } }}
                            sx={{ width: 80 }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          {scoreStr ? `${scoreNum}%` : '-'}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  <TableRow sx={{ bgcolor: 'grey.50' }}>
                    <TableCell colSpan={2}><Typography variant="subtitle2" align="right">Total & Grade:</Typography></TableCell>
                    <TableCell align="center"><Typography variant="subtitle2">{total} / 500</Typography></TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle2" color={Number(percent) < 50 ? 'error' : 'primary'}>
                        {Number(percent) > 0 ? `${percent}% (Grade ${getGrade(Number(percent))})` : '-'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <Paper sx={{ mb: 4 }}>
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="subtitle1" fontWeight="bold">Diagnostic Observations</Typography>
            </Box>
            <Box sx={{ p: 3 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <FormControl component="fieldset" fullWidth>
                    <Typography variant="caption" color="text.secondary" gutterBottom>Understanding Level</Typography>
                    <RadioGroup defaultValue="understands">
                      <FormControlLabel value="understands" control={<Radio size="small"/>} label={<Typography variant="body2">Understands Clearly</Typography>} />
                      <FormControlLabel value="needs_rep" control={<Radio size="small"/>} label={<Typography variant="body2">Needs Repetition</Typography>} />
                      <FormControlLabel value="does_not" control={<Radio size="small"/>} label={<Typography variant="body2">Does Not Understand</Typography>} />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl component="fieldset" fullWidth>
                    <Typography variant="caption" color="text.secondary" gutterBottom>Application Ability</Typography>
                    <RadioGroup defaultValue="applies">
                      <FormControlLabel value="applies" control={<Radio size="small"/>} label={<Typography variant="body2">Applies Concepts Independently</Typography>} />
                      <FormControlLabel value="memorises" control={<Radio size="small"/>} label={<Typography variant="body2">Memorises Only</Typography>} />
                      <FormControlLabel value="cannot" control={<Radio size="small"/>} label={<Typography variant="body2">Cannot Apply</Typography>} />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    label="Narrative Observation" 
                    multiline rows={4} fullWidth 
                    placeholder="Enter detailed notes on student's academic progress, challenges, and recommended interventions..."
                  />
                </Grid>
              </Grid>
            </Box>
          </Paper>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
            <Button variant="contained" size="large" onClick={handleSave} disabled={Object.keys(scores).length === 0}>
              Save Assessment Record
            </Button>
          </Box>
        </Box>
      )}

      <Snackbar open={toastOpen} autoHideDuration={3000}>
        <Alert severity="success" sx={{ width: '100%' }}>Assessment saved successfully!</Alert>
      </Snackbar>
    </Box>
  );
};

export default AssessmentEntry;
