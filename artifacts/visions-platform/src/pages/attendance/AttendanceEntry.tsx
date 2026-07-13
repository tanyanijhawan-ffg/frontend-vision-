import React, { useState } from 'react';
import { 
  Box, Paper, Typography, FormControl, InputLabel, Select, MenuItem, Button, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  RadioGroup, FormControlLabel, Radio, TextField, Snackbar, Alert, Collapse, IconButton
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useNavigate } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import { centres, students } from '../../data/mockData';

const Row = ({ student }: { student: any }) => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('Present');

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' }, bgcolor: status === 'Absent' ? 'error.50' : 'inherit' }}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Typography variant="body2" fontWeight={500}>{student.name}</Typography>
          <Typography variant="caption" color="text.secondary">{student.id}</Typography>
        </TableCell>
        <TableCell>
          <RadioGroup row value={status} onChange={(e) => setStatus(e.target.value)}>
            <FormControlLabel value="Present" control={<Radio size="small" color="success" />} label={<Typography variant="body2">Present</Typography>} />
            <FormControlLabel value="Absent" control={<Radio size="small" color="error" />} label={<Typography variant="body2">Absent</Typography>} />
            <FormControlLabel value="Late" control={<Radio size="small" color="warning" />} label={<Typography variant="body2">Late</Typography>} />
          </RadioGroup>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="subtitle2" gutterBottom>Session Observations (Optional)</Typography>
              <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', mb: 2 }}>
                <FormControl component="fieldset">
                  <Typography variant="caption" color="text.secondary">Attention Level</Typography>
                  <RadioGroup row>
                    <FormControlLabel value="focused" control={<Radio size="small"/>} label={<Typography variant="body2">Focused</Typography>} />
                    <FormControlLabel value="distracted" control={<Radio size="small"/>} label={<Typography variant="body2">Distracted</Typography>} />
                  </RadioGroup>
                </FormControl>
                <FormControl component="fieldset">
                  <Typography variant="caption" color="text.secondary">Behaviour</Typography>
                  <RadioGroup row>
                    <FormControlLabel value="cooperative" control={<Radio size="small"/>} label={<Typography variant="body2">Cooperative</Typography>} />
                    <FormControlLabel value="disruptive" control={<Radio size="small"/>} label={<Typography variant="body2">Disruptive</Typography>} />
                  </RadioGroup>
                </FormControl>
              </Box>
              <TextField fullWidth size="small" label="Remarks / Reason for Absence" />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const AttendanceEntry: React.FC = () => {
  const navigate = useNavigate();
  const [centre, setCentre] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  const centreStudents = students.filter(s => s.centre === centres.find(c => c.id === centre)?.name);

  const handleSave = () => {
    setToastOpen(true);
    setTimeout(() => navigate('/attendance'), 1500);
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      <PageHeader title="Mark Daily Attendance" breadcrumbs={[{ label: 'Attendance', to: '/attendance' }, { label: 'Entry' }]} />

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Session Date" defaultValue={dayjs()} slotProps={{ textField: { size: 'small' } }} />
          </LocalizationProvider>
          <FormControl size="small" sx={{ minWidth: 250 }}>
            <InputLabel>Select Centre</InputLabel>
            <Select value={centre} label="Select Centre" onChange={(e) => setCentre(e.target.value)}>
              {centres.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
            </Select>
          </FormControl>
          <Button variant="contained" disabled={!centre} onClick={() => setLoaded(true)}>
            Load Roster
          </Button>
        </Box>
      </Paper>

      {loaded && (
        <Paper sx={{ overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: '60vh' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell width="50" />
                  <TableCell>Student</TableCell>
                  <TableCell>Attendance Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {centreStudents.length > 0 ? centreStudents.map((student) => (
                  <Row key={student.id} student={student} />
                )) : (
                  <TableRow><TableCell colSpan={3} align="center">No students found for this centre.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          
          <Box sx={{ p: 2, bgcolor: 'grey.100', borderTop: 1, borderColor: 'divider', display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" size="large" onClick={handleSave} disabled={centreStudents.length === 0}>
              Save All Attendance
            </Button>
          </Box>
        </Paper>
      )}

      <Snackbar open={toastOpen} autoHideDuration={3000}>
        <Alert severity="success" sx={{ width: '100%' }}>Attendance saved successfully!</Alert>
      </Snackbar>
    </Box>
  );
};

export default AttendanceEntry;
