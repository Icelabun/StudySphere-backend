import React from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const Achievements = () => {
  const achievements = [
    { title: 'First Login', desc: 'Logged in for the first time.' },
    { title: 'Quest Master', desc: 'Completed 10 quests.' },
    { title: 'Study Streak', desc: 'Studied 7 days in a row.' },
  ];

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Achievements</Typography>
      <List>
        {achievements.map((a, idx) => (
          <ListItem key={idx} divider>
            <ListItemText primary={a.title} secondary={a.desc} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Achievements; 