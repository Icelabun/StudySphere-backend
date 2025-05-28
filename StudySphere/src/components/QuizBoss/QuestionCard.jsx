import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: '600px',
  width: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
}));

const OptionButton = styled(Button)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  textAlign: 'left',
  justifyContent: 'flex-start',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
}));

const QuestionCard = ({ question, onAnswer }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <StyledPaper elevation={3}>
        <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
          {question.question}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {question.options.map((option, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <OptionButton
                variant="contained"
                onClick={() => onAnswer(index)}
                sx={{
                  '&:hover': {
                    transform: 'translateX(10px)',
                    transition: 'transform 0.2s ease-in-out',
                  },
                }}
              >
                {option}
              </OptionButton>
            </motion.div>
          ))}
        </Box>
      </StyledPaper>
    </motion.div>
  );
};

export default QuestionCard; 