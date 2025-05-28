import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  InputAdornment,
  IconButton,
  LinearProgress,
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import axiosInstance from '../../utils/axiosInstance';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    grade: '',
    qualifications: '',
    expertise: [],
    subjects: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  // Password strength checker
  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  // Validate email format
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear field-specific error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Check password strength
    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.username) {
      errors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (!isLogin && passwordStrength < 3) {
      errors.password = 'Password is too weak. Please include uppercase, lowercase, numbers, and special characters';
    }

    if (!isLogin && !userType) {
      errors.userType = 'Please select a user type';
    }

    if (!isLogin && userType === 'student' && !formData.grade) {
      errors.grade = 'Grade is required for students';
    }

    if (!isLogin && userType === 'teacher' && !formData.qualifications) {
      errors.qualifications = 'Qualifications are required for teachers';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin 
        ? {
            email: formData.email,
            password: formData.password,
          }
        : {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            userType,
            ...(userType === 'student' 
              ? { grade: formData.grade, subjects: formData.subjects }
              : { qualifications: formData.qualifications, expertise: formData.expertise }
            ),
          };

      const response = await axiosInstance.post(endpoint, payload);

      if (response.data.token) {
        await login(response.data.token, response.data.user);
        // Redirect based on user type and profile completion
        if (response.data.user.profileCompleted) {
          const dashboardPath = response.data.user.userType === 'teacher' ? '/teacher-dashboard' : '/student-dashboard';
          navigate(dashboardPath);
        } else {
          navigate('/character-creation');
        }
      } else {
        setError('Authentication successful but no token received');
      }
    } catch (error) {
      console.error('Auth error:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred during authentication';
      setError(errorMessage);
      
      // Handle specific error cases
      if (error.response?.status === 401) {
        setError('Invalid email or password');
      } else if (error.response?.status === 409) {
        setError('An account with this email already exists');
      } else if (error.response?.status === 400) {
        setError('Please check your input and try again');
      }
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return '#ff1744';
      case 2:
        return '#ff9100';
      case 3:
        return '#ffd600';
      case 4:
        return '#00e676';
      case 5:
        return '#00c853';
      default:
        return '#ff1744';
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return 'Very Weak';
      case 2:
        return 'Weak';
      case 3:
        return 'Medium';
      case 4:
        return 'Strong';
      case 5:
        return 'Very Strong';
      default:
        return 'Very Weak';
    }
  };

  const renderUserTypeSelection = () => (
    <Box sx={{ mb: 3, width: '100%' }}>
      <FormControl component="fieldset" sx={{ width: '100%' }}>
        <FormLabel component="legend" sx={{ 
          color: '#4CAAFF',
          fontSize: '1.1rem',
          mb: 2,
          '&.Mui-focused': {
            color: '#4CAAFF',
          }
        }}>
          Choose Your Role
        </FormLabel>
        <RadioGroup
          row
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Card
            sx={{
              flex: 1,
              cursor: 'pointer',
              border: userType === 'student' ? '2px solid #4CAAFF' : '1px solid rgba(76, 170, 255, 0.2)',
              '&:hover': {
                border: '2px solid #4CAAFF',
                boxShadow: '0 0 15px rgba(76, 170, 255, 0.3)',
              },
            }}
            onClick={() => setUserType('student')}
          >
            <CardContent sx={{ p: 2 }}>
              <FormControlLabel
                value="student"
                control={<Radio sx={{ color: '#4CAAFF' }} />}
                label={
                  <Box>
                    <Typography variant="h6" sx={{ color: '#fff' }}>
                      Student
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Access study materials, track progress, and join classes
                    </Typography>
                  </Box>
                }
                sx={{ width: '100%', m: 0 }}
              />
            </CardContent>
          </Card>

          <Card
            sx={{
              flex: 1,
              cursor: 'pointer',
              border: userType === 'teacher' ? '2px solid #4CAAFF' : '1px solid rgba(76, 170, 255, 0.2)',
              '&:hover': {
                border: '2px solid #4CAAFF',
                boxShadow: '0 0 15px rgba(76, 170, 255, 0.3)',
              },
            }}
            onClick={() => setUserType('teacher')}
          >
            <CardContent sx={{ p: 2 }}>
              <FormControlLabel
                value="teacher"
                control={<Radio sx={{ color: '#4CAAFF' }} />}
                label={
                  <Box>
                    <Typography variant="h6" sx={{ color: '#fff' }}>
                      Teacher
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Create and manage courses, track student progress
                    </Typography>
                  </Box>
                }
                sx={{ width: '100%', m: 0 }}
              />
            </CardContent>
          </Card>
        </RadioGroup>
      </FormControl>
    </Box>
  );

  const renderStudentFields = () => (
    <>
      <TextField
        fullWidth
        label="Grade"
        name="grade"
        value={formData.grade}
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Subjects (comma separated)"
        name="subjects"
        value={formData.subjects.join(', ')}
        onChange={(e) => setFormData(prev => ({
          ...prev,
          subjects: e.target.value.split(',').map(s => s.trim())
        }))}
        margin="normal"
        helperText="Enter subjects you want to study, separated by commas"
      />
    </>
  );

  const renderTeacherFields = () => (
    <>
      <TextField
        fullWidth
        label="Qualifications"
        name="qualifications"
        value={formData.qualifications}
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Expertise (comma separated)"
        name="expertise"
        value={formData.expertise.join(', ')}
        onChange={(e) => setFormData(prev => ({
          ...prev,
          expertise: e.target.value.split(',').map(s => s.trim())
        }))}
        margin="normal"
        helperText="Enter your areas of expertise, separated by commas"
      />
    </>
  );

  return (
    <Container component="main" maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          mt: 8,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: 'rgba(19, 47, 76, 0.8)',
          border: '1px solid rgba(76, 170, 255, 0.2)',
          borderRadius: '16px',
          boxShadow: '0 0 20px rgba(76, 170, 255, 0.1)',
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{
            mb: 3,
            color: '#4CAAFF',
            textShadow: '0 0 10px rgba(76, 170, 255, 0.5)',
          }}
        >
          {isLogin ? 'Welcome Back!' : 'Join StudySphere'}
        </Typography>

        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              width: '100%', 
              mb: 2,
              backgroundColor: 'rgba(211, 47, 47, 0.1)',
              color: '#ff6b6b',
              '& .MuiAlert-icon': {
                color: '#ff6b6b'
              }
            }}
          >
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          {!isLogin && renderUserTypeSelection()}
          {fieldErrors.userType && (
            <Typography color="error" variant="caption" sx={{ display: 'block', mt: 1 }}>
              {fieldErrors.userType}
            </Typography>
          )}

          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            margin="normal"
            required
            error={!!fieldErrors.username}
            helperText={fieldErrors.username}
            InputProps={{
              endAdornment: formData.username && !fieldErrors.username && (
                <InputAdornment position="end">
                  <CheckCircleIcon color="success" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
            error={!!fieldErrors.email}
            helperText={fieldErrors.email}
            InputProps={{
              endAdornment: formData.email && !fieldErrors.email && (
                <InputAdornment position="end">
                  <CheckCircleIcon color="success" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
            error={!!fieldErrors.password}
            helperText={fieldErrors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {!isLogin && formData.password && (
            <Box sx={{ mt: 1, mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Typography variant="caption" sx={{ mr: 1 }}>
                  Password Strength:
                </Typography>
                <Typography variant="caption" sx={{ color: getPasswordStrengthColor() }}>
                  {getPasswordStrengthText()}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(passwordStrength / 5) * 100}
                sx={{
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: getPasswordStrengthColor(),
                  },
                }}
              />
            </Box>
          )}

          {!isLogin && userType === 'student' && renderStudentFields()}
          {!isLogin && userType === 'teacher' && renderTeacherFields()}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              background: 'linear-gradient(45deg, #4CAAFF 30%, #4CAAFF 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #3A8BD6 30%, #3A8BD6 90%)',
              },
            }}
            disabled={loading || (!isLogin && !userType)}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              isLogin ? 'Sign In' : 'Sign Up'
            )}
          </Button>

          <Divider sx={{ my: 2, borderColor: 'rgba(76, 170, 255, 0.2)' }} />

          <Button
            fullWidth
            variant="text"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setUserType('');
              setFieldErrors({});
              setPasswordStrength(0);
              setFormData({
                username: '',
                email: '',
                password: '',
                grade: '',
                qualifications: '',
                expertise: [],
                subjects: []
              });
            }}
            sx={{
              color: '#4CAAFF',
              '&:hover': {
                backgroundColor: 'rgba(76, 170, 255, 0.1)',
              },
            }}
          >
            {isLogin
              ? "Don't have an account? Sign Up"
              : 'Already have an account? Sign In'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AuthForm;