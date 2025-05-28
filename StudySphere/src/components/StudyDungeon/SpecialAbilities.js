import React from 'react';
import { Box, Button, Typography, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const AbilityContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  background: 'rgba(0, 0, 0, 0.3)',
  borderRadius: theme.spacing(1),
  backdropFilter: 'blur(10px)',
}));

const AbilityButton = styled(Button)(({ theme, cooldown }) => ({
  position: 'relative',
  background: cooldown ? 'rgba(255, 255, 255, 0.1)' : 'rgba(76, 170, 255, 0.2)',
  color: '#fff',
  padding: theme.spacing(1, 2),
  '&:hover': {
    background: cooldown ? 'rgba(255, 255, 255, 0.1)' : 'rgba(76, 170, 255, 0.3)',
  },
  '&:disabled': {
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'rgba(255, 255, 255, 0.5)',
  },
}));

const CooldownOverlay = styled(Box)(({ theme, cooldown }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  fontSize: '0.8rem',
}));

const SpecialAbilities = ({ onAbilityUse, cooldowns, playerLevel }) => {
  const abilities = [
    {
      name: 'Focus Strike',
      description: 'Deal 1.5x damage with perfect accuracy',
      damage: 1.5,
      cooldown: 3,
      levelRequired: 1,
    },
    {
      name: 'Study Shield',
      description: 'Block the next attack and heal 20 HP',
      cooldown: 4,
      levelRequired: 2,
    },
    {
      name: 'Knowledge Burst',
      description: 'Deal 2x damage to all enemies',
      damage: 2,
      cooldown: 5,
      levelRequired: 3,
    },
  ];

  return (
    <AbilityContainer>
      <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>
        Special Abilities
      </Typography>
      {abilities.map((ability) => (
        <Tooltip
          key={ability.name}
          title={
            playerLevel < ability.levelRequired
              ? `Requires Level ${ability.levelRequired}`
              : ability.description
          }
        >
          <span>
            <AbilityButton
              variant="contained"
              onClick={() => onAbilityUse(ability)}
              disabled={cooldowns[ability.name] > 0 || playerLevel < ability.levelRequired}
              cooldown={cooldowns[ability.name] > 0}
            >
              {ability.name}
              {cooldowns[ability.name] > 0 && (
                <CooldownOverlay>
                  {cooldowns[ability.name]}s
                </CooldownOverlay>
              )}
            </AbilityButton>
          </span>
        </Tooltip>
      ))}
    </AbilityContainer>
  );
};

export default SpecialAbilities; 