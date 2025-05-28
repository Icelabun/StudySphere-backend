import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  LinearProgress,
} from '@mui/material';

const Dashboard = () => {
  const progress = {
    dailyGoal: 75,
    weeklyProgress: 60,
    monthlyAchievements: 85,
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3} columns={{ xs: 12, md: 12 }}>
        {/* Daily Progress */}
        <Grid gridColumn={{ xs: 'span 12', md: 'span 4' }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Daily Goal
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={progress.dailyGoal}
                  sx={{ height: 10, borderRadius: 5 }}
                />
              </Box>
              <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2">{`${progress.dailyGoal}%`}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Weekly Progress */}
        <Grid gridColumn={{ xs: 'span 12', md: 'span 4' }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Weekly Progress
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={progress.weeklyProgress}
                  sx={{ height: 10, borderRadius: 5 }}
                />
              </Box>
              <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2">{`${progress.weeklyProgress}%`}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Monthly Achievements */}
        <Grid gridColumn={{ xs: 'span 12', md: 'span 4' }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Monthly Achievements
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={progress.monthlyAchievements}
                  sx={{ height: 10, borderRadius: 5 }}
                />
              </Box>
              <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2">{`${progress.monthlyAchievements}%`}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Recent Activity */}
        <Grid gridColumn={{ xs: 'span 12', md: 'span 12' }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Completed Python Basics Course
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Created 2 new flashcard sets
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Participated in 3 forum discussions
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
