import React, { useState } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/material/styles';

const QuestionContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'rgba(0, 0, 0, 0.9)',
  border: '2px solid #ff4655',
  borderRadius: '0',
  color: '#fff',
  maxWidth: '600px',
  width: '100%',
  fontFamily: '"Press Start 2P", cursive',
}));

const AnswerButton = styled(Button)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2),
  marginTop: theme.spacing(1),
  background: '#1a1a1a',
  color: '#fff',
  border: '2px solid #ff4655',
  borderRadius: '0',
  fontFamily: '"Press Start 2P", cursive',
  fontSize: '0.8rem',
  textTransform: 'none',
  '&:hover': {
    background: '#ff4655',
    transform: 'scale(1.02)',
    transition: 'all 0.2s ease-in-out',
  },
  '&:disabled': {
    background: '#1a1a1a',
    color: '#666',
    border: '2px solid #666',
  }
}));

const FeedbackMessage = styled(motion.div)(({ theme, isCorrect }) => ({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: isCorrect ? 'rgba(76, 175, 80, 0.9)' : 'rgba(255, 70, 85, 0.9)',
  color: '#fff',
  padding: theme.spacing(2, 4),
  borderRadius: '0',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  textShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
  zIndex: 1000,
  fontFamily: '"Press Start 2P", cursive',
  border: '2px solid #fff',
}));

const QuestionText = styled(Typography)(({ theme }) => ({
  color: '#ff4655',
  fontSize: '1rem',
  marginBottom: theme.spacing(3),
  textAlign: 'center',
  lineHeight: 1.5,
  textShadow: '0 0 5px rgba(255, 70, 85, 0.5)',
}));

const QuestionBox = ({ question, onAnswer, isDisabled }) => {
  const [showFeedback, setShowFeedback] = useState(null);

  const handleAnswer = (answer) => {
    if (isDisabled) return;
    
    const isCorrect = answer === question.correctAnswer;
    setShowFeedback(isCorrect);
    
    setTimeout(() => {
      setShowFeedback(null);
      onAnswer(isCorrect);
    }, 1000);
  };

  return (
    <QuestionContainer elevation={3}>
      <QuestionText variant="h5">
        {question.text}
      </QuestionText>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {question.options.map((option, index) => (
          <AnswerButton
            key={index}
            variant="contained"
            onClick={() => handleAnswer(option)}
            disabled={isDisabled}
          >
            {option}
          </AnswerButton>
        ))}
      </Box>

      <AnimatePresence>
        {showFeedback !== null && (
          <FeedbackMessage
            isCorrect={showFeedback}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            {showFeedback ? 'CRITICAL HIT!' : 'MISSED!'}
          </FeedbackMessage>
        )}
      </AnimatePresence>
    </QuestionContainer>
  );
};

export default QuestionBox; 