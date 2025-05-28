import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Grid, Card, CardContent, CardHeader, Avatar, IconButton } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import AddCommentIcon from '@mui/icons-material/AddComment';
import PersonIcon from '@mui/icons-material/Person';

const Forum = () => {
  const [posts, setPosts] = useState([
    { author: 'Alice', content: 'Welcome to the forum!' },
    { author: 'Bob', content: 'Hello everyone!' },
  ]);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleAdd = () => {
    if (author && content) {
      setPosts([...posts, { author, content }]);
      setAuthor('');
      setContent('');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <ForumIcon color="primary" sx={{ fontSize: 36 }} /> Forum
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>{posts.length} posts</Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
        <TextField label="Name" value={author} onChange={e => setAuthor(e.target.value)} fullWidth />
        <TextField label="Message" value={content} onChange={e => setContent(e.target.value)} fullWidth />
        <IconButton color="primary" onClick={handleAdd} size="large">
          <AddCommentIcon sx={{ fontSize: 40 }} />
        </IconButton>
      </Box>
      <Grid container spacing={3}>
        {posts.map((post, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Card elevation={3}>
              <CardHeader
                avatar={<Avatar><PersonIcon /></Avatar>}
                title={post.author}
                subheader={new Date().toLocaleDateString()}
              />
              <CardContent>
                <Typography variant="body1">{post.content}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Forum; 