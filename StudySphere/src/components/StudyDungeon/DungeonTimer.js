import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { useStudyDungeon } from '../../contexts/StudyDungeonContext';

const TimerContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  color: theme.palette.common.white,
}));

const TimerProgress = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}));

const TimerButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5, 4),
  fontSize: '1.2rem',
  textTransform: 'none',
}));

const FOCUS_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

const DungeonTimer = ({ onSessionComplete }) => {
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [progress, setProgress] = useState(100);
  const { addExperience } = useStudyDungeon();

  const playSound = useCallback((type) => {
    const audio = new Audio(`/sounds/${type}.mp3`);
    audio.play().catch(error => console.log('Audio playback failed:', error));
  }, []);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;
          const totalTime = isBreak ? BREAK_TIME : FOCUS_TIME;
          setProgress((newTime / totalTime) * 100);
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      playSound(isBreak ? 'break-end' : 'session-end');
      if (!isBreak) {
        setIsBreak(true);
        setTimeLeft(BREAK_TIME);
        setProgress(100);
      } else {
        setIsBreak(false);
        setTimeLeft(FOCUS_TIME);
        setProgress(100);
        onSessionComplete();
      }
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, isBreak, onSessionComplete, playSound]);

  const toggleTimer = () => {
    if (!isRunning) {
      playSound('session-start');
    }
    setIsRunning(!isRunning);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <TimerContainer>
        <Typography variant="h4" gutterBottom>
          {isBreak ? 'Break Time' : 'Focus Session'}
        </Typography>
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <TimerProgress
            variant="determinate"
            value={progress}
            size={200}
            thickness={4}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h2" component="div" color="text.primary">
              {formatTime(timeLeft)}
            </Typography>
          </Box>
        </Box>
        <TimerButton
          variant="contained"
          color={isRunning ? 'secondary' : 'primary'}
          onClick={toggleTimer}
          size="large"
        >
          {isRunning ? 'Pause Quest' : 'Start Quest'}
        </TimerButton>
      </TimerContainer>
    </motion.div>
  );
};

export default DungeonTimer; 