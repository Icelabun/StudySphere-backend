import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  LinearProgress,
  Card,
  CardContent,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarIcon from '@mui/icons-material/Star';
import LockIcon from '@mui/icons-material/Lock';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { useAuth } from '../../contexts/AuthContext';

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'rgba(19, 47, 76, 0.5)',
  border: '1px solid rgba(76, 170, 255, 0.2)',
  marginBottom: theme.spacing(2),
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 20px rgba(76, 170, 255, 0.3)',
  },
}));

const AchievementAvatar = styled(Avatar)(({ theme, achieved }) => ({
  backgroundColor: achieved ? theme.palette.primary.main : 'rgba(255, 255, 255, 0.1)',
  width: 60,
  height: 60,
  marginRight: theme.spacing(2),
}));

const mockAchievements = {
  recent: [
    {
      id: 1,
      title: 'First Steps',
      description: 'Complete your first study session',
      icon: <StarIcon />,
      achieved: true,
      date: '2024-03-25',
      exp: 100,
      progress: 100,
    },
    {
      id: 2,
      title: 'Study Streak: 7 Days',
      description: 'Study for 7 consecutive days',
      icon: <WhatshotIcon />,
      achieved: true,
      date: '2024-03-24',
      exp: 200,
      progress: 100,
    },
  ],
  categories: [
    {
      name: 'Study Habits',
      achievements: [
        {
          id: 3,
          title: 'Early Bird',
          description: 'Complete 5 study sessions before 9 AM',
          icon: <StarIcon />,
          achieved: true,
          progress: 100,
          exp: 150,
        },
        {
          id: 4,
          title: 'Night Owl',
          description: 'Complete 5 study sessions after 8 PM',
          icon: <StarIcon />,
          achieved: false,
          progress: 60,
          exp: 150,
        },
      ],
    },
    {
      name: 'Subject Mastery',
      achievements: [
        {
          id: 5,
          title: 'Math Master',
          description: 'Score 90%+ in 5 math quizzes',
          icon: <StarIcon />,
          achieved: true,
          progress: 100,
          exp: 300,
        },
        {
          id: 6,
          title: 'Science Explorer',
          description: 'Complete all science modules',
          icon: <StarIcon />,
          achieved: false,
          progress: 75,
          exp: 300,
        },
      ],
    },
    {
      name: 'Social',
      achievements: [
        {
          id: 7,
          title: 'Team Player',
          description: 'Join 3 study groups',
          icon: <StarIcon />,
          achieved: false,
          progress: 33,
          exp: 200,
        },
        {
          id: 8,
          title: 'Mentor',
          description: 'Help 5 other students with their studies',
          icon: <StarIcon />,
          achieved: false,
          progress: 40,
          exp: 250,
        },
      ],
    },
  ],
};

const Achievements = () => {
  const { user } = useAuth();
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);

  const totalAchievements = mockAchievements.categories.reduce(
    (acc, category) => acc + category.achievements.length,
    0
  );
  
  const completedAchievements = mockAchievements.categories.reduce(
    (acc, category) => acc + category.achievements.filter(a => a.achieved).length,
    0
  );

  const totalExp = mockAchievements.categories.reduce(
    (acc, category) => acc + category.achievements.reduce((sum, a) => sum + (a.achieved ? a.exp : 0), 0),
    0
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Header Stats */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <EmojiEventsIcon sx={{ fontSize: 40 }} />
          Achievements
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  Progress
                </Typography>
                <Typography variant="h4" gutterBottom>
                  {completedAchievements}/{totalAchievements}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(completedAchievements / totalAchievements) * 100}
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
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  Total EXP Earned
                </Typography>
                <Typography variant="h4">
                  {totalExp}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  From achievements
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  Latest Achievement
                </Typography>
                <Typography variant="h6">
                  {mockAchievements.recent[0].title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Earned {mockAchievements.recent[0].date}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>
      </Box>

      {/* Recent Achievements */}
      <Typography variant="h5" color="primary" gutterBottom sx={{ mt: 4 }}>
        Recent Achievements
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {mockAchievements.recent.map((achievement) => (
          <Grid item xs={12} sm={6} key={achievement.id}>
            <StyledCard
              onClick={() => {
                setSelectedAchievement(achievement);
                setOpenDetails(true);
              }}
              sx={{ cursor: 'pointer' }}
            >
              <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <AchievementAvatar achieved={achievement.achieved}>
                  {achievement.icon}
                </AchievementAvatar>
                <Box>
                  <Typography variant="h6" color="primary">
                    {achievement.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {achievement.description}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#4CAAFF', mt: 1 }}>
                    +{achievement.exp} EXP
                  </Typography>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      {/* Achievement Categories */}
      {mockAchievements.categories.map((category) => (
        <Box key={category.name} sx={{ mb: 4 }}>
          <Typography variant="h5" color="primary" gutterBottom sx={{ mt: 4 }}>
            {category.name}
          </Typography>
          <Grid container spacing={2}>
            {category.achievements.map((achievement) => (
              <Grid item xs={12} sm={6} key={achievement.id}>
                <StyledCard
                  onClick={() => {
                    setSelectedAchievement(achievement);
                    setOpenDetails(true);
                  }}
                  sx={{ cursor: 'pointer' }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <AchievementAvatar achieved={achievement.achieved}>
                        {achievement.achieved ? achievement.icon : <LockIcon />}
                      </AchievementAvatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" color={achievement.achieved ? 'primary' : 'text.secondary'}>
                          {achievement.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {achievement.description}
                        </Typography>
                      </Box>
                      <Chip
                        label={`${achievement.exp} EXP`}
                        color="primary"
                        variant={achievement.achieved ? 'filled' : 'outlined'}
                        size="small"
                      />
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={achievement.progress}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: 'rgba(76, 170, 255, 0.2)',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 3,
                          background: achievement.achieved
                            ? 'linear-gradient(45deg, #4CAAFF 30%, #60B6FF 90%)'
                            : 'rgba(255, 255, 255, 0.2)',
                        },
                      }}
                    />
                    <Typography variant="body2" color="text.secondary" align="right" sx={{ mt: 1 }}>
                      {achievement.progress}% Complete
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}

      {/* Achievement Details Dialog */}
      <Dialog
        open={openDetails}
        onClose={() => setOpenDetails(false)}
        maxWidth="sm"
        fullWidth
      >
        {selectedAchievement && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AchievementAvatar achieved={selectedAchievement.achieved}>
                  {selectedAchievement.achieved ? selectedAchievement.icon : <LockIcon />}
                </AchievementAvatar>
                <Typography variant="h6">
                  {selectedAchievement.title}
                </Typography>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1" paragraph>
                {selectedAchievement.description}
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Progress
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={selectedAchievement.progress}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: 'rgba(76, 170, 255, 0.2)',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 4,
                      background: selectedAchievement.achieved
                        ? 'linear-gradient(45deg, #4CAAFF 30%, #60B6FF 90%)'
                        : 'rgba(255, 255, 255, 0.2)',
                    },
                  }}
                />
                <Typography variant="body2" color="text.secondary" align="right" sx={{ mt: 1 }}>
                  {selectedAchievement.progress}% Complete
                </Typography>
              </Box>
              <Typography variant="body2" color="primary">
                Reward: {selectedAchievement.exp} EXP
              </Typography>
              {selectedAchievement.achieved && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Achieved on: {selectedAchievement.date}
                </Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDetails(false)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default Achievements;
