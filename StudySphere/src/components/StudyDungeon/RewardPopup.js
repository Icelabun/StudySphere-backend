import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/material/styles';
import confetti from 'canvas-confetti';

const PopupContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: theme.spacing(4),
  backgroundColor: 'rgba(0, 0, 0, 0.9)',
  borderRadius: theme.spacing(2),
  color: theme.palette.common.white,
  textAlign: 'center',
  zIndex: 1100,
  boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
  border: '2px solid',
  borderImage: 'linear-gradient(45deg, #4CAF50, #81C784) 1',
}));

const RewardPopup = ({ isOpen, onClose, xpEarned, streakBonus, achievements }) => {
  useEffect(() => {
    if (isOpen) {
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

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
        >
          <PopupContainer>
            <Typography variant="h3" gutterBottom sx={{ color: '#4CAF50' }}>
              Quest Complete! 🎉
            </Typography>
            <Typography variant="h5" gutterBottom>
              XP Earned: +{xpEarned}
            </Typography>
            {streakBonus > 0 && (
              <Typography variant="h6" color="warning.main" gutterBottom>
                Streak Bonus: +{streakBonus} XP
              </Typography>
            )}
            {achievements && achievements.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  New Achievements:
                </Typography>
                {achievements.map((achievement, index) => (
                  <Typography key={index} variant="body1" color="primary.light">
                    🏆 {achievement}
                  </Typography>
                ))}
              </Box>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={onClose}
              sx={{ mt: 3 }}
            >
              Continue
            </Button>
          </PopupContainer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RewardPopup; 