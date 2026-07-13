import React, { useState } from 'react';
import { 
  Box, Paper, Stepper, Step, StepLabel, Button, Typography, Grid, TextField, 
  RadioGroup, FormControlLabel, Radio, FormControl, InputLabel, Select, MenuItem,
  Chip, Checkbox, FormGroup, Snackbar, Alert,
  LinearProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import PageHeader from '../../components/PageHeader';
import { regions, districts, centres } from '../../data/mockData';

const steps = [
  'Identification',
  'Education',
  'Family Details',
  'Socio-Economic',
  'Vulnerabilities',
  'Motivation',
  'Aspirations',
  'Assignment'
];

const StudentRegistration: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [toastOpen, setToastOpen] = useState(false);

  // Vulnerability Chips
  const vulOptions = [
    "First Generation Learner", "Single Parent Family", "Orphan (one parent)", "Orphan (both parents)",
    "Migrant Family", "Child Labour Risk", "Disability (Physical)", "Disability (Mental)",
    "Chronic Illness", "Extreme Poverty", "Domestic Violence Exposure", "Early Marriage Risk",
    "Substance Abuse in Family", "Trafficking Risk"
  ];
  const [selectedVuls, setSelectedVuls] = useState<string[]>([]);
  const riskScore = selectedVuls.length * 2; // Fake calculation

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      setToastOpen(true);
      setTimeout(() => navigate('/students'), 1500);
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const toggleVul = (v: string) => {
    setSelectedVuls(prev => prev.includes(v) ? prev.filter(item => item !== v) : [...prev, v]);
  };

  // Renders different content based on step
  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField label="Student ID (Auto-generated)" fullWidth disabled defaultValue="VGE-2024-042" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Full Name" fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Nickname" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset">
                <Typography variant="caption" color="text.secondary">Gender *</Typography>
                <RadioGroup row defaultValue="Female">
                  <FormControlLabel value="Female" control={<Radio />} label="Female" />
                  <FormControlLabel value="Male" control={<Radio />} label="Male" />
                  <FormControlLabel value="Other" control={<Radio />} label="Other" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Date of Birth *" slotProps={{ textField: { fullWidth: true } }} />
              </LocalizationProvider>
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField label="School Name" fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>School Type</InputLabel>
                <Select label="School Type" defaultValue="Govt">
                  <MenuItem value="Govt">Government</MenuItem>
                  <MenuItem value="Private">Private</MenuItem>
                  <MenuItem value="Aided">Government Aided</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Class / Grade</InputLabel>
                <Select label="Class / Grade" defaultValue="6">
                  {[...Array(12)].map((_, i) => <MenuItem key={i+1} value={(i+1).toString()}>Class {i+1}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Medium of Instruction</InputLabel>
                <Select label="Medium of Instruction" defaultValue="Tamil">
                  <MenuItem value="Tamil">Tamil</MenuItem>
                  <MenuItem value="English">English</MenuItem>
                  <MenuItem value="Telugu">Telugu</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}><TextField label="Father's Name" fullWidth /></Grid>
            <Grid item xs={12} sm={4}><TextField label="Mother's Name" fullWidth /></Grid>
            <Grid item xs={12} sm={4}><TextField label="Primary Phone" fullWidth /></Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Parent Occupation</InputLabel>
                <Select label="Parent Occupation" defaultValue="Labourer">
                  <MenuItem value="Agriculture">Agriculture</MenuItem>
                  <MenuItem value="Labourer">Daily Wage Labourer</MenuItem>
                  <MenuItem value="Business">Small Business</MenuItem>
                  <MenuItem value="Private">Private Service</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Parent Education</InputLabel>
                <Select label="Parent Education" defaultValue="Primary">
                  <MenuItem value="Illiterate">Illiterate</MenuItem>
                  <MenuItem value="Primary">Primary</MenuItem>
                  <MenuItem value="Secondary">Secondary</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );
      case 3: // Socio-Economic
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}><TextField label="Caste" fullWidth /></Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Monthly Income</InputLabel>
                <Select label="Monthly Income" defaultValue="<5000">
                  <MenuItem value="<5000">Below ₹5,000</MenuItem>
                  <MenuItem value="5000-10000">₹5,000 - ₹10,000</MenuItem>
                  <MenuItem value="10000-20000">₹10,000 - ₹20,000</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>House Type</InputLabel>
                <Select label="House Type" defaultValue="Semi-Permanent">
                  <MenuItem value="Permanent">Permanent (Concrete)</MenuItem>
                  <MenuItem value="Semi-Permanent">Semi-Permanent</MenuItem>
                  <MenuItem value="Hut">Hut / Temporary</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset">
                <Typography variant="caption" color="text.secondary">Electricity at Home</Typography>
                <RadioGroup row defaultValue="Yes"><FormControlLabel value="Yes" control={<Radio/>} label="Yes"/><FormControlLabel value="No" control={<Radio/>} label="No"/></RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        );
      case 4: // Vulnerabilities
        return (
          <Box>
            <Typography variant="subtitle2" gutterBottom>Select all identifying factors that apply:</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
              {vulOptions.map(v => (
                <Chip 
                  key={v} label={v} 
                  onClick={() => toggleVul(v)}
                  color={selectedVuls.includes(v) ? "primary" : "default"}
                  variant={selectedVuls.includes(v) ? "filled" : "outlined"}
                />
              ))}
            </Box>
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
              <Typography variant="subtitle2">Calculated Risk Score</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <LinearProgress 
                    variant="determinate" value={Math.min(100, riskScore * 10)} 
                    color={riskScore > 6 ? 'error' : riskScore > 3 ? 'warning' : 'success'} 
                    sx={{ height: 8, borderRadius: 4 }} 
                  />
                </Box>
                <Typography fontWeight="bold">{riskScore}/10</Typography>
              </Box>
            </Box>
          </Box>
        );
      case 5: // Motivation
        return (
          <Box>
            <FormGroup>
              <Grid container>
                {['Improve Academic Performance', 'Develop Social Skills', 'Safe Learning Space', 'Parents Decision'].map(r => (
                  <Grid item xs={12} sm={6} key={r}><FormControlLabel control={<Checkbox />} label={r} /></Grid>
                ))}
              </Grid>
            </FormGroup>
            <TextField label="Detailed Motivation Narrative" multiline rows={4} fullWidth sx={{ mt: 3 }} />
          </Box>
        );
      case 6: // Aspirations
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}><TextField label="Future Career Goal" fullWidth /></Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Primary Interest</InputLabel>
                <Select label="Primary Interest" defaultValue="Sports">
                  <MenuItem value="Sports">Sports</MenuItem>
                  <MenuItem value="Arts">Arts & Craft</MenuItem>
                  <MenuItem value="Science">Science & Tech</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}><TextField label="Facilitator's Initial Notes" multiline rows={3} fullWidth /></Grid>
          </Grid>
        );
      case 7: // Assignment
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Assign Region</InputLabel>
                <Select label="Assign Region" defaultValue={regions[0].id}>
                  {regions.map(r => <MenuItem key={r.id} value={r.id}>{r.name}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Assign District</InputLabel>
                <Select label="Assign District" defaultValue={districts[0].id}>
                  {districts.map(d => <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Assign Centre</InputLabel>
                <Select label="Assign Centre" defaultValue={centres[0].id}>
                  {centres.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Enrollment Date" defaultValue={dayjs()} slotProps={{ textField: { fullWidth: true } }} />
              </LocalizationProvider>
            </Grid>
          </Grid>
        );
      default: return null;
    }
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <PageHeader 
        title="Student Registration" 
        breadcrumbs={[{ label: 'Students', to: '/students' }, { label: 'Register' }]}
      />

      <Paper sx={{ p: 4 }}>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 6, display: { xs: 'none', md: 'flex' } }}>
          {steps.map((label) => (
            <Step key={label}><StepLabel>{label}</StepLabel></Step>
          ))}
        </Stepper>
        
        {/* Mobile stepper display */}
        <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 3 }}>
          <Typography variant="subtitle2" color="primary">Step {activeStep + 1} of {steps.length}</Typography>
          <Typography variant="h6">{steps[activeStep]}</Typography>
          <LinearProgress variant="determinate" value={((activeStep + 1) / steps.length) * 100} sx={{ mt: 1 }} />
        </Box>

        <Box sx={{ minHeight: 300 }}>
          {renderStepContent(activeStep)}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 6, pt: 2, borderTop: 1, borderColor: 'divider' }}>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          <Button variant="contained" onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Submit Registration' : 'Next Step'}
          </Button>
        </Box>
      </Paper>

      <Snackbar open={toastOpen} autoHideDuration={3000}>
        <Alert severity="success" sx={{ width: '100%' }}>Student registered successfully!</Alert>
      </Snackbar>
    </Box>
  );
};

export default StudentRegistration;
