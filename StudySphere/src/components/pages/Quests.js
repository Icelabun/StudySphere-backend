import React, { useState } from 'react';
import { Container, Typography, Button, List, ListItem, ListItemText } from '@mui/material';

const Quests = () => {
  const [quests, setQuests] = useState([
    { text: 'Finish React project', done: false },
    { text: 'Review notes', done: false },
  ]);

  const handleComplete = idx => {
    setQuests(quests.map((q, i) => i === idx ? { ...q, done: true } : q));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Daily Quests</Typography>
      <List>
        {quests.map((quest, idx) => (
          <ListItem key={idx} divider>
            <ListItemText primary={quest.text} sx={{ textDecoration: quest.done ? 'line-through' : 'none' }} />
            {!quest.done && <Button variant="contained" onClick={() => handleComplete(idx)}>Complete</Button>}
            {quest.done && <Typography color="success.main">Completed</Typography>}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Quests; 