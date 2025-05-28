import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { styled, keyframes } from '@mui/material/styles';

const floatAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const MonsterContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '200px',
  height: '200px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

const MonsterSprite = styled(Box)(({ theme, type }) => ({
  width: '150px',
  height: '150px',
  backgroundImage: type === 'boss' 
    ? 'url(/images/boss-monster.png)'
    : 'url(/images/starter-monster.png)',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  animation: `${floatAnimation} 3s infinite`,
  filter: 'drop-shadow(0 0 10px rgba(76, 170, 255, 0.5))',
}));

const MonsterName = styled(Typography)(({ theme }) => ({
  color: '#fff',
  textShadow: '0 0 10px rgba(76, 170, 255, 0.8)',
  marginTop: theme.spacing(1),
  fontWeight: 'bold',
}));

const Monster = ({ type, hp, maxHp }) => {
  const monsterName = type === 'boss' ? 'Boss Monster' : 'Starter Monster';
  const hpPercentage = (hp / maxHp) * 100;

  return (
    <MonsterContainer>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <MonsterSprite type={type} />
      </motion.div>
      <MonsterName variant="h6">{monsterName}</MonsterName>
      <Box
        sx={{
          width: '100%',
          height: '4px',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '2px',
          marginTop: 1,
        }}
      >
        <Box
          sx={{
            width: `${hpPercentage}%`,
            height: '100%',
            background: hpPercentage > 50 ? '#4CAF50' : '#f44336',
            borderRadius: '2px',
            transition: 'width 0.3s ease-in-out',
          }}
        />
      </Box>
    </MonsterContainer>
  );
};

export default Monster; 