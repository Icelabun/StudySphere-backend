import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

const AttackContainer = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
  zIndex: 1000,
});

const AttackEffect = styled(motion.div)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  height: '100%',
  background: 'radial-gradient(circle, rgba(255,0,0,0.2) 0%, rgba(255,0,0,0) 70%)',
});

const BossAttackAnimation = () => {
  useEffect(() => {
    const audio = new Audio('/sounds/boss-attack.mp3');
    audio.play().catch(error => console.log('Audio playback failed:', error));
  }, []);

  return (
    <AttackContainer>
      <AttackEffect
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 2, opacity: 1 }}
        exit={{ scale: 3, opacity: 0 }}
        transition={{ duration: 0.5 }}
      />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: '-100%' }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '200px',
          height: '200px',
          background: 'url(/images/effects/fireball.png) no-repeat center center',
          backgroundSize: 'contain',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </AttackContainer>
  );
};

export default BossAttackAnimation; 