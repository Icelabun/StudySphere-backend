import React, { useState, useEffect } from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/material/styles';
import QuestionCard from './QuestionCard';
import BossAttackAnimation from './BossAttackAnimation';
import VictoryScreen from './VictoryScreen';

const BossContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
  background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
  color: theme.palette.common.white,
}));

const BossImage = styled('img')({
  width: '300px',
  height: '300px',
  objectFit: 'contain',
  marginBottom: '2rem',
});

const BossHPBar = styled(LinearProgress)(({ theme }) => ({
  width: '100%',
  maxWidth: '600px',
  height: '20px',
  borderRadius: '10px',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  '& .MuiLinearProgress-bar': {
    borderRadius: '10px',
    backgroundImage: 'linear-gradient(45deg, #f44336 30%, #ff5252 90%)',
  },
}));

const mockBosses = [
  {
    id: 1,
    name: 'The Math Dragon',
    image: '/assets/bosses/math-dragon.png',
    hp: 100,
    difficulty: 'easy',
    questions: [
      {
        question: 'What is the derivative of x²?',
        options: ['2x', 'x²', '2', 'x'],
        correct: 0,
      },
      {
        question: 'Solve for x: 2x + 5 = 13',
        options: ['x = 4', 'x = 6', 'x = 8', 'x = 3'],
        correct: 0,
      },
      {
        question: 'What is the value of π (pi) to two decimal places?',
        options: ['3.14', '3.16', '3.12', '3.18'],
        correct: 0,
      },
    ],
  },
  // Add more bosses here
];

const QuizBoss = () => {
  const [currentBoss, setCurrentBoss] = useState(mockBosses[0]);
  const [currentHP, setCurrentHP] = useState(currentBoss.hp);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAttack, setShowAttack] = useState(false);
  const [showVictory, setShowVictory] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (selectedOption) => {
    const isCorrect = selectedOption === currentBoss.questions[currentQuestion].correct;
    
    if (isCorrect) {
      const damage = 20; // Damage per correct answer
      setCurrentHP(prev => Math.max(0, prev - damage));
      setScore(prev => prev + 10);
      
      if (currentHP - damage <= 0) {
        setShowVictory(true);
      } else if (currentQuestion < currentBoss.questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      }
    } else {
      setShowAttack(true);
      setTimeout(() => setShowAttack(false), 1000);
    }
  };

  const hpPercentage = (currentHP / currentBoss.hp) * 100;

  return (
    <BossContainer>
      <AnimatePresence>
        {showVictory ? (
          <VictoryScreen score={score} boss={currentBoss} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Typography variant="h2" gutterBottom>
              {currentBoss.name}
            </Typography>
            <BossImage src={currentBoss.image} alt={currentBoss.name} />
            <Box sx={{ width: '100%', maxWidth: '600px', mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                HP: {currentHP}/{currentBoss.hp}
              </Typography>
              <BossHPBar variant="determinate" value={hpPercentage} />
            </Box>
            {showAttack ? (
              <BossAttackAnimation />
            ) : (
              <QuestionCard
                question={currentBoss.questions[currentQuestion]}
                onAnswer={handleAnswer}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </BossContainer>
  );
};

export default QuizBoss; 