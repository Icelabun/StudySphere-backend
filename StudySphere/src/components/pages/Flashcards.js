import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Grid, Card, CardContent, IconButton } from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState([
    { question: 'What is React?', answer: 'A JavaScript library for building user interfaces.' },
    { question: 'What is a component?', answer: 'A reusable piece of UI.' },
  ]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleAdd = () => {
    if (question && answer) {
      setFlashcards([...flashcards, { question, answer }]);
      setQuestion('');
      setAnswer('');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <QuizIcon color="primary" sx={{ fontSize: 36 }} /> Flashcards
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
        <TextField label="Question" value={question} onChange={e => setQuestion(e.target.value)} fullWidth />
        <TextField label="Answer" value={answer} onChange={e => setAnswer(e.target.value)} fullWidth />
        <IconButton color="primary" onClick={handleAdd} size="large">
          <AddCircleIcon sx={{ fontSize: 40 }} />
        </IconButton>
      </Box>
      <Grid container spacing={3}>
        {flashcards.map((fc, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Card elevation={4} sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>Question</Typography>
                <Typography variant="h6" gutterBottom>{fc.question}</Typography>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>Answer</Typography>
                <Typography variant="body1">{fc.answer}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Flashcards; 