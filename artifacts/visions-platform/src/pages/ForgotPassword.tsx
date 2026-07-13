import React from 'react';
import { Box, Card, Typography, TextField, Button, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending email
    setTimeout(() => {
      navigate('/reset-password');
    }, 1000);
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
            Reset your password
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Enter the email address associated with your account and we'll send you a link to reset your password.
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            margin="normal"
            required
            type="email"
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ py: 1.5, mb: 3 }}
          >
            Send Reset Link
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <MuiLink component={Link} to="/login" variant="body2" color="text.secondary" underline="hover" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
              <ArrowBackIcon fontSize="small" /> Back to login
            </MuiLink>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default ForgotPassword;
