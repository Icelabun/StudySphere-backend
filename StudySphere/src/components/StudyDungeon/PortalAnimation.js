import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { styled, keyframes } from '@mui/material/styles';

const portalGlow = keyframes`
  0% {
    box-shadow: 0 0 20px #4CAAFF, 0 0 40px #4CAAFF;
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 40px #4CAAFF, 0 0 80px #4CAAFF;
    transform: scale(1.05);
  }
  100% {
    box-shadow: 0 0 20px #4CAAFF, 0 0 40px #4CAAFF;
    transform: scale(1);
  }
`;

const PortalContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'rgba(0, 0, 0, 0.8)',
  zIndex: 1000,
}));

const PortalRing = styled(Box)(({ theme }) => ({
  width: '200px',
  height: '200px',
  borderRadius: '50%',
  border: '4px solid #4CAAFF',
  animation: `${portalGlow} 2s infinite`,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-20px',
    left: '-20px',
    right: '-20px',
    bottom: '-20px',
    borderRadius: '50%',
    border: '2px solid rgba(76, 170, 255, 0.3)',
    animation: `${portalGlow} 2s infinite 0.5s`,
  },
}));

const PortalAnimation = ({ onComplete }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <PortalContainer>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <PortalRing />
      </motion.div>
    </PortalContainer>
  );
};

export default PortalAnimation; 