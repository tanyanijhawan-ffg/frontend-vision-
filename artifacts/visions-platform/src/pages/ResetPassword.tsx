import React, { useState } from 'react';
import { Box, Card, Typography, TextField, Button, InputAdornment, IconButton, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  
  // Calculate fake password strength (0-100)
  const strength = Math.min(100, password.length * 10 + (/[A-Z]/.test(password) ? 20 : 0) + (/[0-9]/.test(password) ? 20 : 0));
  
  let strengthColor = 'error.main';
  if (strength > 40) strengthColor = 'warning.main';
  if (strength > 75) strengthColor = 'success.main';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      bgcolor: 'background.default',
      p: 2
    }}>
      <Card sx={{ p: { xs: 3, sm: 5 }, borderRadius: 2, width: '100%', maxWidth: 440, boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Create new password
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please enter your new password below.
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="New Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            margin="normal"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 1 }}
          />

          {password && (
            <Box sx={{ mb: 3 }}>
              <LinearProgress 
                variant="determinate" 
                value={strength} 
                sx={{ 
                  height: 6, 
                  borderRadius: 3,
                  bgcolor: 'grey.200',
                  '& .MuiLinearProgress-bar': { bgcolor: strengthColor }
                }} 
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                {strength < 40 ? 'Weak' : strength < 80 ? 'Moderate' : 'Strong'}
              </Typography>
            </Box>
          )}
          {!password && <Box sx={{ mb: 3, height: 26 }} />}

          <TextField
            fullWidth
            label="Confirm Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            margin="normal"
            required
            sx={{ mb: 4 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ py: 1.5 }}
          >
            Reset Password
          </Button>
        </form>
      </Card>
    </Box>
  );
};

export default ResetPassword;
