import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import confetti from 'canvas-confetti';

const VictoryContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
  background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
  color: theme.palette.common.white,
  zIndex: 1100,
}));

const VictoryContent = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(4),
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: theme.spacing(2),
  backdropFilter: 'blur(10px)',
}));

const VictoryScreen = ({ score, boss }) => {
  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 1000,
        particleCount,
        origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    const audio = new Audio('/sounds/victory.mp3');
    audio.play().catch(error => console.log('Audio playback failed:', error));

    return () => clearInterval(interval);
  }, []);

  return (
    <VictoryContainer>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <VictoryContent>
          <Typography variant="h2" gutterBottom sx={{ color: '#4CAF50' }}>
            Victory! 🎉
          </Typography>
          <Typography variant="h4" gutterBottom>
            You defeated {boss.name}!
          </Typography>
          <Typography variant="h5" gutterBottom>
            Score: {score}
          </Typography>
          <Typography variant="h6" gutterBottom>
            XP Earned: {score * 2}
          </Typography>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => window.location.reload()}
              sx={{ mt: 4 }}
            >
              Battle Another Boss
            </Button>
          </motion.div>
        </VictoryContent>
      </motion.div>
    </VictoryContainer>
  );
};

export default VictoryScreen; 