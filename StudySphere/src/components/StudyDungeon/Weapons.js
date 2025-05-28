import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const WeaponContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const WeaponSlot = styled(Box)(({ theme, isActive }) => ({
  width: '60px',
  height: '60px',
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

const WeaponIcon = styled('img')({
  width: '40px',
  height: '40px',
  objectFit: 'contain',
});

const WeaponInfo = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '100%',
  left: '50%',
  transform: 'translateX(-50%)',
  background: 'rgba(0, 0, 0, 0.9)',
  border: '2px solid #ff4655',
  padding: theme.spacing(1),
  color: '#fff',
  fontFamily: '"Press Start 2P", cursive',
  fontSize: '0.7rem',
  whiteSpace: 'nowrap',
  display: 'none',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    border: '8px solid transparent',
    borderTopColor: '#ff4655',
  }
}));

export const weapons = {
  sword: {
    name: 'STUDY SWORD',
    damage: 20,
    icon: '/images/weapons/sword.png',
    effect: 'High damage, single target'
  },
  bow: {
    name: 'KNOWLEDGE BOW',
    damage: 15,
    icon: '/images/weapons/bow.png',
    effect: 'Medium damage, ranged'
  },
  shield: {
    name: 'WISDOM SHIELD',
    damage: 10,
    icon: '/images/weapons/shield.png',
    effect: 'Low damage, blocks attacks'
  }
};

const Weapons = ({ activeWeapon, onWeaponSelect }) => {
  return (
    <WeaponContainer>
      {Object.entries(weapons).map(([key, weapon]) => (
        <WeaponSlot
          key={key}
          isActive={activeWeapon === key}
          onClick={() => onWeaponSelect(key)}
        >
          <WeaponIcon src={weapon.icon} alt={weapon.name} />
          <WeaponInfo>
            {weapon.name}
            <br />
            DMG: {weapon.damage}
            <br />
            {weapon.effect}
          </WeaponInfo>
        </WeaponSlot>
      ))}
    </WeaponContainer>
  );
};

export default Weapons; 