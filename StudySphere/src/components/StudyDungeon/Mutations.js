import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const MutationContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  right: theme.spacing(2),
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  zIndex: 100,
}));

const MutationSlot = styled(Box)(({ theme, isActive }) => ({
  width: '50px',
  height: '50px',
  background: isActive ? '#ff4655' : '#1a1a1a',
  border: '2px solid #fff',
  borderRadius: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)',
    background: isActive ? '#ff6b77' : '#ff4655',
  }
}));

const MutationIcon = styled('img')({
  width: '30px',
  height: '30px',
  objectFit: 'contain',
});

const MutationInfo = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: '100%',
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'rgba(0, 0, 0, 0.9)',
  border: '2px solid #ff4655',
  padding: theme.spacing(1),
  color: '#fff',
  fontFamily: '"Press Start 2P", cursive',
  fontSize: '0.7rem',
  whiteSpace: 'nowrap',
  marginRight: theme.spacing(1),
  display: 'none',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    right: '-8px',
    transform: 'translateY(-50%)',
    border: '8px solid transparent',
    borderLeftColor: '#ff4655',
  }
}));

export const mutations = {
  quickLearner: {
    name: 'QUICK LEARNER',
    icon: '/images/mutations/quick.png',
    effect: 'Answer questions 20% faster',
    cost: 100
  },
  criticalThinker: {
    name: 'CRITICAL THINKER',
    icon: '/images/mutations/critical.png',
    effect: '15% chance for double damage',
    cost: 150
  },
  knowledgeShield: {
    name: 'KNOWLEDGE SHIELD',
    icon: '/images/mutations/shield.png',
    effect: 'Take 25% less damage',
    cost: 200
  },
  studyMaster: {
    name: 'STUDY MASTER',
    icon: '/images/mutations/master.png',
    effect: 'XP gain increased by 50%',
    cost: 300
  }
};

const Mutations = ({ activeMutations, onMutationSelect, xp }) => {
  return (
    <MutationContainer>
      {Object.entries(mutations).map(([key, mutation]) => {
        const isActive = activeMutations.includes(key);
        const canAfford = xp >= mutation.cost;
        
        return (
          <MutationSlot
            key={key}
            isActive={isActive}
            onClick={() => canAfford && onMutationSelect(key)}
            sx={{
              opacity: canAfford ? 1 : 0.5,
              cursor: canAfford ? 'pointer' : 'not-allowed'
            }}
          >
            <MutationIcon src={mutation.icon} alt={mutation.name} />
            <MutationInfo>
              {mutation.name}
              <br />
              {mutation.effect}
              <br />
              COST: {mutation.cost} XP
            </MutationInfo>
          </MutationSlot>
        );
      })}
    </MutationContainer>
  );
};

export default Mutations; 