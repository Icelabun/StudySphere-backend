import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { styled, keyframes } from '@mui/material/styles';

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const PlayerContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '200px',
  height: '200px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

const PlayerSprite = styled(Box)(({ theme }) => ({
  width: '150px',
  height: '150px',
  backgroundImage: 'url(/images/player-character.png)',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  animation: `${pulseAnimation} 2s infinite`,
  filter: 'drop-shadow(0 0 10px rgba(76, 170, 255, 0.5))',
}));

const PlayerName = styled(Typography)(({ theme }) => ({
  color: '#fff',
  textShadow: '0 0 10px rgba(76, 170, 255, 0.8)',
  marginTop: theme.spacing(1),
  fontWeight: 'bold',
}));

const StatBar = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '4px',
  background: 'rgba(255, 255, 255, 0.2)',
  borderRadius: '2px',
  marginTop: 1,
}));

const StatFill = styled(Box)(({ theme, percentage, color }) => ({
  width: `${percentage}%`,
  height: '100%',
  background: color,
  borderRadius: '2px',
  transition: 'width 0.3s ease-in-out',
}));

const Player = ({ name, hp, maxHp, xp, level }) => {
  const hpPercentage = (hp / maxHp) * 100;
  const xpPercentage = (xp / (level * 100)) * 100;

  return (
    <PlayerContainer>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <PlayerSprite />
      </motion.div>
      <PlayerName variant="h6">{name}</PlayerName>
      <Box sx={{ width: '100%', mt: 1 }}>
        <Typography variant="caption" sx={{ color: '#fff' }}>
          HP: {hp}/{maxHp}
        </Typography>
        <StatBar>
          <StatFill percentage={hpPercentage} color="#4CAF50" />
        </StatBar>
      </Box>
      <Box sx={{ width: '100%', mt: 1 }}>
        <Typography variant="caption" sx={{ color: '#fff' }}>
          XP: {xp}/{level * 100}
        </Typography>
        <StatBar>
          <StatFill percentage={xpPercentage} color="#2196F3" />
        </StatBar>
      </Box>
      <Typography variant="caption" sx={{ color: '#fff', mt: 1 }}>
        Level: {level}
      </Typography>
    </PlayerContainer>
  );
};

export default Player; 