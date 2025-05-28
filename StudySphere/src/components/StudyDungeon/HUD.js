import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

const HUDContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: theme.spacing(2),
  left: theme.spacing(2),
  right: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  background: 'rgba(0, 0, 0, 0.8)',
  border: '2px solid #ff4655',
  borderRadius: '0',
  zIndex: 100,
  fontFamily: '"Press Start 2P", cursive',
}));

const HealthBar = styled(Box)(({ theme }) => ({
  width: '200px',
  height: '24px',
  background: '#1a1a1a',
  border: '2px solid #fff',
  borderRadius: '0',
  overflow: 'hidden',
  position: 'relative',
}));

const HealthFill = styled(motion.div)(({ theme, color }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  background: color,
  boxShadow: `0 0 10px ${color}`,
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
  }
}));

const StatContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  color: '#ff4655',
  fontSize: '0.7rem',
  textTransform: 'uppercase',
  letterSpacing: '1px',
}));

const StatValue = styled(Typography)(({ theme }) => ({
  color: '#fff',
  fontSize: '0.8rem',
  fontWeight: 'bold',
  textShadow: '0 0 5px rgba(255, 70, 85, 0.8)',
}));

const HUD = ({ playerHP, monsterHP, playerMaxHP, monsterMaxHP, xp, level }) => {
  const playerHPPercentage = (playerHP / playerMaxHP) * 100;
  const monsterHPPercentage = (monsterHP / monsterMaxHP) * 100;

  return (
    <HUDContainer>
      <StatContainer>
        <StatLabel>PLAYER</StatLabel>
        <HealthBar>
          <HealthFill
            color="#4CAF50"
            initial={{ width: '100%' }}
            animate={{ width: `${playerHPPercentage}%` }}
            transition={{ duration: 0.2 }}
          />
        </HealthBar>
        <StatValue>{playerHP}/{playerMaxHP}</StatValue>
      </StatContainer>

      <StatContainer>
        <StatLabel>LEVEL {level}</StatLabel>
        <StatValue>XP: {xp}</StatValue>
      </StatContainer>

      <StatContainer>
        <StatLabel>MONSTER</StatLabel>
        <HealthBar>
          <HealthFill
            color="#ff4655"
            initial={{ width: '100%' }}
            animate={{ width: `${monsterHPPercentage}%` }}
            transition={{ duration: 0.2 }}
          />
        </HealthBar>
        <StatValue>{monsterHP}/{monsterMaxHP}</StatValue>
      </StatContainer>
    </HUDContainer>
  );
};

export default HUD; 