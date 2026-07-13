import React, { useState } from 'react';
import { Box, Card, Typography, TextField, Button, Checkbox, FormControlLabel, Link as MuiLink, InputAdornment, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Left Side - Brand */}
      <Box sx={{ 
        flex: 4, 
        display: { xs: 'none', md: 'flex' }, 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 6,
        background: 'linear-gradient(135deg, #0D47A1 0%, #1565C0 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative elements */}
        <Box sx={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <Box sx={{ position: 'absolute', bottom: -50, left: -50, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

        <Box sx={{ zIndex: 1, textAlign: 'center' }}>
          <Typography variant="h2" fontWeight="bold" sx={{ mb: 2, letterSpacing: -1 }}>
            Visions LEP
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9, maxWidth: 400, mx: 'auto', fontWeight: 300, lineHeight: 1.5 }}>
            Empowering Communities, Transforming Lives
          </Typography>
        </Box>
      </Box>

      {/* Right Side - Form */}
      <Box sx={{ 
        flex: 6, 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: { xs: 3, sm: 6 },
        bgcolor: 'background.default'
      }}>
        <Box sx={{ width: '100%', maxWidth: 480 }}>
          {/* Mobile Logo */}
          <Box sx={{ display: { md: 'none' }, mb: 4, textAlign: 'center' }}>
            <Typography variant="h4" color="primary.main" fontWeight="bold">
              Visions LEP
            </Typography>
          </Box>

          <Card sx={{ p: { xs: 3, sm: 5 }, borderRadius: 2, boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Welcome back
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Please enter your details to access the platform.
              </Typography>
            </Box>

            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                margin="normal"
                required
                defaultValue="admin@visionsglobal.org"
                sx={{ mb: 3 }}
              />
              
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                margin="normal"
                required
                defaultValue="password123"
                sx={{ mb: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <FormControlLabel
                  control={<Checkbox color="primary" defaultChecked />}
                  label={<Typography variant="body2">Remember me</Typography>}
                />
                <MuiLink component={Link} to="/forgot-password" variant="body2" color="primary.main" underline="hover" fontWeight={500}>
                  Forgot Password?
                </MuiLink>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ py: 1.5, fontSize: '1rem' }}
              >
                Sign In
              </Button>
            </form>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
