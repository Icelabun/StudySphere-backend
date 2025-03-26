import React, { useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
  IconButton,
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  Flip,
} from '@mui/icons-material';

const Flashcards = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);

  const flashcards = [
    {
      question: 'What is React?',
      answer: 'React is a JavaScript library for building user interfaces.',
    },
    {
      question: 'What is a component in React?',
      answer: 'A component is a reusable piece of UI that can contain its own logic and styling.',
    },
    {
      question: 'What is JSX?',
      answer: 'JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files.',
    },
  ];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentCard((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Flashcards
      </Typography>

      <Box sx={{ position: 'relative', minHeight: '300px', mt: 4 }}>
        <Card
          sx={{
            minHeight: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            perspective: '1000px',
            backgroundColor: 'transparent',
          }}
          onClick={handleFlip}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              textAlign: 'center',
              transition: 'transform 0.6s',
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
            }}
          >
            {/* Front side */}
            <CardContent
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h5" component="div">
                {flashcards[currentCard].question}
              </Typography>
              <Typography
                variant="caption"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
              >
                {`${currentCard + 1}/${flashcards.length}`}
              </Typography>
            </CardContent>

            {/* Back side */}
            <CardContent
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h5" component="div">
                {flashcards[currentCard].answer}
              </Typography>
              <Typography
                variant="caption"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
              >
                {`${currentCard + 1}/${flashcards.length}`}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          mt: 4,
        }}
      >
        <IconButton onClick={handlePrevious} color="primary">
          <ChevronLeft />
        </IconButton>
        <IconButton onClick={handleFlip} color="primary">
          <Flip />
        </IconButton>
        <IconButton onClick={handleNext} color="primary">
          <ChevronRight />
        </IconButton>
      </Box>
    </Container>
  );
};

export default Flashcards;
