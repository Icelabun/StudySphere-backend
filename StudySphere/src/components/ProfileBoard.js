import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useStats } from '../contexts/StatsContext';
import axiosInstance from '../utils/axiosInstance';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
  Alert,
  CircularProgress,
  IconButton,
  Divider,
  Paper,
  LinearProgress,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  EmojiEvents as TrophyIcon,
  Timer as TimerIcon,
  School as SchoolIcon,
  Star as StarIcon,
} from '@mui/icons-material';

const StatCard = ({ title, value, icon, color }) => (
  <Paper
    elevation={2}
    sx={{
      p: 2,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      bgcolor: 'background.paper',
      borderRadius: 2,
    }}
  >
    <Box sx={{ color: `${color}.main`, mb: 1 }}>{icon}</Box>
    <Typography variant="h6" component="div" gutterBottom>
      {value}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {title}
    </Typography>
  </Paper>
);

const AchievementCard = ({ title, description, progress, icon }) => (
  <Paper
    elevation={1}
    sx={{
      p: 2,
      mb: 2,
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      bgcolor: 'background.paper',
      borderRadius: 2,
    }}
  >
    <Box sx={{ color: 'primary.main' }}>{icon}</Box>
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="subtitle1" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {description}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ height: 8, borderRadius: 4 }}
      />
    </Box>
  </Paper>
);

const ProfileBoard = () => {
  const { user, updateUser } = useAuth();
  const { stats } = useStats();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        username: user.username || '',
        email: user.email || '',
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error('New passwords do not match');
        }
        if (!formData.currentPassword) {
          throw new Error('Current password is required to set a new password');
        }
      }

      const response = await axiosInstance.put('/api/user/profile', {
        username: formData.username,
        email: formData.email,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      updateUser(response.data.user);
      setSuccess('Profile updated successfully');
      setIsEditing(false);
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Grid container spacing={3}>
        {/* Profile Section */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                <Avatar
                  sx={{ width: 120, height: 120, mb: 2 }}
                  alt={user.username}
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=random`}
                />
                <Typography variant="h5" gutterBottom>
                  {user.username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
                <IconButton
                  onClick={() => setIsEditing(true)}
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  <EditIcon />
                </IconButton>
              </Box>

              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

              {isEditing && (
                <Box component="form" onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    margin="normal"
                  />
                  <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                    Change Password
                  </Typography>
                  <TextField
                    fullWidth
                    label="Current Password"
                    name="currentPassword"
                    type="password"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="New Password"
                    name="newPassword"
                    type="password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    margin="normal"
                  />
                  <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={loading}
                      startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => setIsEditing(false)}
                      startIcon={<CancelIcon />}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Stats Section */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Study Statistics
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <StatCard
                title="Total Study Time"
                value={`${stats?.totalStudyTime || 0}h`}
                icon={<TimerIcon fontSize="large" />}
                color="primary"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <StatCard
                title="Completed Sessions"
                value={stats?.completedSessions || 0}
                icon={<SchoolIcon fontSize="large" />}
                color="secondary"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <StatCard
                title="Achievement Points"
                value={stats?.achievementPoints || 0}
                icon={<StarIcon fontSize="large" />}
                color="success"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                Recent Achievements
              </Typography>
              <AchievementCard
                title="Study Streak"
                description="Maintain a 7-day study streak"
                progress={70}
                icon={<TrophyIcon />}
              />
              <AchievementCard
                title="Quick Learner"
                description="Complete 5 study sessions in one day"
                progress={40}
                icon={<SchoolIcon />}
              />
              <AchievementCard
                title="Night Owl"
                description="Study for 2 hours after 10 PM"
                progress={90}
                icon={<TimerIcon />}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileBoard; 