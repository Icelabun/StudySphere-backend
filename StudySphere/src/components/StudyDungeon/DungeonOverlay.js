import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

const OverlayContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(2),
  zIndex: 1000,
  pointerEvents: 'none',
}));

const XPBar = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  '& .MuiLinearProgress-bar': {
    borderRadius: 4,
    backgroundImage: 'linear-gradient(45deg, #4CAF50 30%, #81C784 90%)',
  },
}));

const StreakIndicator = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
}));

const StreakIcon = styled(Box)(({ theme }) => ({
  color: theme.palette.warning.main,
  display: 'flex',
  alignItems: 'center',
}));

const DungeonOverlay = ({ xp, level, streak, nextLevelXP }) => {
  const xpProgress = (xp / nextLevelXP) * 100;

  return (
    <OverlayContainer>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="h6" color="white" sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            Level {level}
          </Typography>
          <Typography variant="body2" color="white" sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            {xp} / {nextLevelXP} XP
          </Typography>
        </Box>
        <XPBar variant="determinate" value={xpProgress} />
        <StreakIndicator>
          <StreakIcon>
            <Typography variant="h6" color="warning.main">
              🔥
            </Typography>
          </StreakIcon>
          <Typography variant="body2" color="white" sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            {streak} Day Streak
          </Typography>
        </StreakIndicator>
      </motion.div>
    </OverlayContainer>
  );
};

export default DungeonOverlay; 