import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Avatar,
  Box,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { useStats } from '../../contexts/StatsContext';

const Profile = () => {
  const { stats } = useStats();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3} columns={{ xs: 12, md: 12 }}>
        {/* Hunter Status */}
        <Grid gridColumn={{ xs: 'span 12', md: 'span 4' }}>
          <Paper sx={{ p: 3, textAlign: 'center', background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)' }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                margin: '0 auto',
                mb: 2,
                border: '3px solid #ffd700',
              }}
            >
              H
            </Avatar>
            <Typography variant="h5" gutterBottom sx={{ color: '#fff' }}>
              Student Name
            </Typography>
            <Typography variant="h6" sx={{ color: '#ffd700', mb: 2 }}>
              {stats.rank}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ color: '#fff' }}>
                Level {stats.level}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(stats.exp / stats.nextLevelExp) * 100}
                sx={{
                  mt: 1,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#ffd700',
                  },
                }}
              />
              <Typography variant="body2" sx={{ color: '#fff', mt: 1 }}>
                {`${stats.exp} / ${stats.nextLevelExp} EXP`}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Stats */}
        <Grid gridColumn={{ xs: 'span 12', md: 'span 4' }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Attributes
            </Typography>
            <List>
              {Object.entries(stats.attributes).map(([attr, value]) => (
                <ListItem key={attr} sx={{ py: 1 }}>
                  <ListItemText
                    primary={attr.charAt(0).toUpperCase() + attr.slice(1)}
                    secondary={
                      <LinearProgress
                        variant="determinate"
                        value={value * 5}
                        sx={{
                          mt: 1,
                          height: 8,
                          borderRadius: 4,
                        }}
                      />
                    }
                  />
                  <Typography variant="body1" sx={{ ml: 2 }}>
                    {value}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Skills */}
        <Grid gridColumn={{ xs: 'span 12', md: 'span 4' }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Skills
            </Typography>
            <List>
              {stats.skills.map((skill, index) => (
                <React.Fragment key={skill.name}>
                  <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Typography variant="subtitle1" sx={{ color: '#1a237e' }}>
                      {`${skill.name} [Lv.${skill.level}]`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {skill.description}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#666' }}>
                      Cooldown: {skill.cooldown}
                    </Typography>
                  </ListItem>
                  {index < stats.skills.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Achievement Stats */}
        <Grid gridColumn={{ xs: 'span 12', md: 'span 12' }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Student Achievements
            </Typography>
            <Grid container spacing={3} columns={{ xs: 12, md: 12 }}>
              <Grid gridColumn={{ xs: 'span 6', md: 'span 3' }}>
                <Box textAlign="center">
                  <Typography variant="h4" color="primary">
                    {stats.dungeonsClearedCount}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Study Dungeons Cleared
                  </Typography>
                </Box>
              </Grid>
              <Grid gridColumn={{ xs: 'span 6', md: 'span 3' }}>
                <Box textAlign="center">
                  <Typography variant="h4" color="primary">
                    {stats.questsCompleted}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quests Completed
                  </Typography>
                </Box>
              </Grid>
              <Grid gridColumn={{ xs: 'span 6', md: 'span 3' }}>
                <Box textAlign="center">
                  <Typography variant="h4" color="primary">
                    {stats.skills.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Skills Acquired
                  </Typography>
                </Box>
              </Grid>
              <Grid gridColumn={{ xs: 'span 6', md: 'span 3' }}>
                <Box textAlign="center">
                  <Typography variant="h4" color="primary">
                    {stats.achievements.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Achievements Unlocked
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
