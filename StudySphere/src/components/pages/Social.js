import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Grid, Card, CardContent, CardHeader, Avatar, IconButton } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';

const Social = () => {
  const [friends, setFriends] = useState(['Alice', 'Bob']);
  const [name, setName] = useState('');

  const handleAdd = () => {
    if (name) {
      setFriends([...friends, name]);
      setName('');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <GroupIcon color="primary" sx={{ fontSize: 36 }} /> Friends
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>{friends.length} friends</Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
        <TextField label="Friend's Name" value={name} onChange={e => setName(e.target.value)} fullWidth />
        <IconButton color="primary" onClick={handleAdd} size="large">
          <PersonAddIcon sx={{ fontSize: 40 }} />
        </IconButton>
      </Box>
      <Grid container spacing={3}>
        {friends.map((friend, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Card elevation={3}>
              <CardHeader
                avatar={<Avatar><PersonIcon /></Avatar>}
                title={friend}
                subheader="Friend"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">Let's study together!</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Social; 