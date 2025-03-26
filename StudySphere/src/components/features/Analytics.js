import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  LinearProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TimerIcon from '@mui/icons-material/Timer';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useAuth } from '../../contexts/AuthContext';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'linear-gradient(45deg, #132F4C 30%, #173d5d 90%)',
  border: '1px solid rgba(76, 170, 255, 0.3)',
  boxShadow: '0 0 15px rgba(76, 170, 255, 0.2)',
}));

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  background: 'linear-gradient(45deg, #1a365d 30%, #1e4976 90%)',
  border: '1px solid rgba(76, 170, 255, 0.2)',
  height: '100%',
}));

const GlowingText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  textShadow: '0 0 10px rgba(76, 170, 255, 0.5)',
}));

// Mock data
const mockData = {
  weeklyProgress: [
    { day: 'Mon', hours: 2.5, exp: 150 },
    { day: 'Tue', hours: 3, exp: 180 },
    { day: 'Wed', hours: 1.5, exp: 90 },
    { day: 'Thu', hours: 4, exp: 240 },
    { day: 'Fri', hours: 2, exp: 120 },
    { day: 'Sat', hours: 3.5, exp: 210 },
    { day: 'Sun', hours: 2.5, exp: 150 },
  ],
  monthlyProgress: [
    { week: 'Week 1', hours: 15, exp: 900 },
    { week: 'Week 2', hours: 18, exp: 1080 },
    { week: 'Week 3', hours: 12, exp: 720 },
    { week: 'Week 4', hours: 20, exp: 1200 },
  ],
  subjectDistribution: [
    { name: 'Mathematics', value: 35, time: '14h' },
    { name: 'Physics', value: 25, time: '10h' },
    { name: 'Chemistry', value: 20, time: '8h' },
    { name: 'Biology', value: 15, time: '6h' },
    { name: 'Computer Science', value: 5, time: '2h' },
  ],
  skillProgress: [
    { skill: 'Focus', current: 75, target: 100, improvement: '+15%' },
    { skill: 'Consistency', current: 60, target: 100, improvement: '+10%' },
    { skill: 'Problem Solving', current: 85, target: 100, improvement: '+20%' },
    { skill: 'Time Management', current: 70, target: 100, improvement: '+12%' },
  ],
  achievements: [
    { name: 'Study Streak: 7 Days', date: '2024-03-25', exp: 100 },
    { name: 'Math Master', date: '2024-03-24', exp: 200 },
    { name: 'Focus Champion', date: '2024-03-23', exp: 150 },
  ],
};

const COLORS = ['#4CAAFF', '#FF6B6B', '#4ECB71', '#FFA94D', '#845EF7'];

const Analytics = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('hours');

  const totalHours = mockData.weeklyProgress.reduce((acc, day) => acc + day.hours, 0);
  const totalExp = mockData.weeklyProgress.reduce((acc, day) => acc + day.exp, 0);
  const averageHoursPerDay = (totalHours / 7).toFixed(1);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <GlowingText variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <AssessmentIcon sx={{ fontSize: 40 }} />
          Study Analytics
        </GlowingText>
        <Typography variant="subtitle1" color="text.secondary">
          Track your progress and optimize your study habits
        </Typography>
      </Box>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TimerIcon sx={{ color: '#4CAAFF', mr: 1 }} />
              <Typography variant="h6" sx={{ color: '#4CAAFF' }}>
                Total Study Time
              </Typography>
            </Box>
            <Typography variant="h4">{totalHours}h</Typography>
            <Typography variant="body2" sx={{ color: 'success.main' }}>
              Avg. {averageHoursPerDay}h per day
            </Typography>
          </StatCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TrendingUpIcon sx={{ color: '#4CAAFF', mr: 1 }} />
              <Typography variant="h6" sx={{ color: '#4CAAFF' }}>
                EXP Gained
              </Typography>
            </Box>
            <Typography variant="h4">{totalExp}</Typography>
            <Typography variant="body2" sx={{ color: 'success.main' }}>
              +{mockData.weeklyProgress[6].exp} today
            </Typography>
          </StatCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <EmojiEventsIcon sx={{ color: '#4CAAFF', mr: 1 }} />
              <Typography variant="h6" sx={{ color: '#4CAAFF' }}>
                Achievements
              </Typography>
            </Box>
            <Typography variant="h4">{mockData.achievements.length}</Typography>
            <Typography variant="body2" sx={{ color: 'success.main' }}>
              Latest: {mockData.achievements[0].name}
            </Typography>
          </StatCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <AssessmentIcon sx={{ color: '#4CAAFF', mr: 1 }} />
              <Typography variant="h6" sx={{ color: '#4CAAFF' }}>
                Focus Score
              </Typography>
            </Box>
            <Typography variant="h4">85%</Typography>
            <Typography variant="body2" sx={{ color: 'success.main' }}>
              +5% from last week
            </Typography>
          </StatCard>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        {/* Progress Chart */}
        <Grid item xs={12} md={8}>
          <StyledPaper>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ color: '#4CAAFF' }}>
                Study Progress
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    sx={{ color: '#fff', bgcolor: 'rgba(76, 170, 255, 0.1)' }}
                  >
                    <MenuItem value="week">This Week</MenuItem>
                    <MenuItem value="month">This Month</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select
                    value={selectedMetric}
                    onChange={(e) => setSelectedMetric(e.target.value)}
                    sx={{ color: '#fff', bgcolor: 'rgba(76, 170, 255, 0.1)' }}
                  >
                    <MenuItem value="hours">Study Hours</MenuItem>
                    <MenuItem value="exp">EXP Gained</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={timeRange === 'week' ? mockData.weeklyProgress : mockData.monthlyProgress}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey={timeRange === 'week' ? 'day' : 'week'}
                  stroke="#fff"
                />
                <YAxis stroke="#fff" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#132F4C',
                    border: '1px solid rgba(76, 170, 255, 0.3)',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey={selectedMetric}
                  stroke="#4CAAFF"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </StyledPaper>
        </Grid>

        {/* Subject Distribution */}
        <Grid item xs={12} md={4}>
          <StyledPaper sx={{ height: '100%' }}>
            <Typography variant="h6" sx={{ color: '#4CAAFF', mb: 2 }}>
              Subject Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockData.subjectDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name} (${value}%)`}
                >
                  {mockData.subjectDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#132F4C',
                    border: '1px solid rgba(76, 170, 255, 0.3)',
                  }}
                  formatter={(value, name, props) => [
                    `${value}% (${props.payload.time})`,
                    name
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </StyledPaper>
        </Grid>

        {/* Skill Progress */}
        <Grid item xs={12}>
          <StyledPaper>
            <Typography variant="h6" sx={{ color: '#4CAAFF', mb: 3 }}>
              Skill Progress
            </Typography>
            <Grid container spacing={2}>
              {mockData.skillProgress.map((skill) => (
                <Grid item xs={12} sm={6} key={skill.skill}>
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body1" sx={{ color: '#fff' }}>
                        {skill.skill}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {skill.current}/{skill.target}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'success.main' }}>
                          {skill.improvement}
                        </Typography>
                      </Box>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(skill.current / skill.target) * 100}
                      sx={{
                        height: 8,
                        borderRadius: 5,
                        bgcolor: 'rgba(76, 170, 255, 0.2)',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 5,
                          background: 'linear-gradient(45deg, #4CAAFF 30%, #60B6FF 90%)',
                        },
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </StyledPaper>
        </Grid>

        {/* Recent Achievements */}
        <Grid item xs={12}>
          <StyledPaper>
            <Typography variant="h6" sx={{ color: '#4CAAFF', mb: 3 }}>
              Recent Achievements
            </Typography>
            <Grid container spacing={2}>
              {mockData.achievements.map((achievement, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper
                    sx={{
                      p: 2,
                      background: 'rgba(76, 170, 255, 0.1)',
                      border: '1px solid rgba(76, 170, 255, 0.2)',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <EmojiEventsIcon sx={{ color: '#FFD700', mr: 1 }} />
                      <Typography variant="h6" sx={{ color: '#fff' }}>
                        {achievement.name}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Earned on {new Date(achievement.date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#4CAAFF' }}>
                      +{achievement.exp} EXP
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Analytics;
