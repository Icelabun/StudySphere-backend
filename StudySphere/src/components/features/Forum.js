import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondary,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ForumIcon from '@mui/icons-material/Forum';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import { useAuth } from '../../contexts/AuthContext';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'linear-gradient(45deg, #132F4C 30%, #173d5d 90%)',
  border: '1px solid rgba(76, 170, 255, 0.3)',
  boxShadow: '0 0 15px rgba(76, 170, 255, 0.2)',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'rgba(19, 47, 76, 0.5)',
  border: '1px solid rgba(76, 170, 255, 0.2)',
  marginBottom: theme.spacing(2),
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 20px rgba(76, 170, 255, 0.3)',
  },
}));

const mockPosts = [
  {
    id: 1,
    title: 'Tips for Effective Study Habits',
    content: 'What are your best study techniques? I find the Pomodoro method really helpful...',
    author: 'Sarah',
    avatar: 'S',
    date: '2 hours ago',
    likes: 15,
    comments: 8,
    tags: ['Study Tips', 'Productivity'],
  },
  {
    id: 2,
    title: 'Looking for Study Group - Mathematics',
    content: 'Anyone interested in forming a study group for advanced calculus?',
    author: 'Mike',
    avatar: 'M',
    date: '5 hours ago',
    likes: 10,
    comments: 12,
    tags: ['Mathematics', 'Study Group'],
  },
  {
    id: 3,
    title: 'Resource Sharing: Programming Tutorials',
    content: 'I\'ve compiled a list of helpful programming tutorials and resources...',
    author: 'Alex',
    avatar: 'A',
    date: '1 day ago',
    likes: 25,
    comments: 15,
    tags: ['Programming', 'Resources'],
  },
];

const Forum = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState(mockPosts);
  const [openNewPost, setOpenNewPost] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', tags: '' });
  const [selectedPost, setSelectedPost] = useState(null);
  const [openComments, setOpenComments] = useState(false);

  const handleNewPost = () => {
    const post = {
      id: posts.length + 1,
      ...newPost,
      author: user?.displayName || 'Anonymous',
      avatar: user?.displayName?.[0] || 'A',
      date: 'Just now',
      likes: 0,
      comments: 0,
      tags: newPost.tags.split(',').map(tag => tag.trim()),
    };
    setPosts([post, ...posts]);
    setNewPost({ title: '', content: '', tags: '' });
    setOpenNewPost(false);
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const mockComments = [
    { author: 'Emma', avatar: 'E', content: 'Great post! Very helpful.', date: '1 hour ago' },
    { author: 'John', avatar: 'J', content: 'I agree with this approach.', date: '30 minutes ago' },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <ForumIcon sx={{ fontSize: 40 }} />
          Discussion Forum
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setOpenNewPost(true)}
        >
          New Post
        </Button>
      </Box>

      {/* Posts List */}
      {posts.map((post) => (
        <StyledCard key={post.id}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>{post.avatar}</Avatar>
              <Box>
                <Typography variant="h6" color="primary">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Posted by {post.author} • {post.date}
                </Typography>
              </Box>
            </Box>
            <Typography variant="body1" paragraph>
              {post.content}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              {post.tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button
              startIcon={<ThumbUpIcon />}
              onClick={() => handleLike(post.id)}
              color="primary"
            >
              {post.likes}
            </Button>
            <Button
              startIcon={<CommentIcon />}
              onClick={() => {
                setSelectedPost(post);
                setOpenComments(true);
              }}
              color="primary"
            >
              {post.comments}
            </Button>
          </CardActions>
        </StyledCard>
      ))}

      {/* New Post Dialog */}
      <Dialog open={openNewPost} onClose={() => setOpenNewPost(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Content"
            fullWidth
            multiline
            rows={4}
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Tags (comma-separated)"
            fullWidth
            value={newPost.tags}
            onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
            helperText="Example: Study Tips, Mathematics, Help"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewPost(false)}>Cancel</Button>
          <Button onClick={handleNewPost} variant="contained" color="primary">
            Post
          </Button>
        </DialogActions>
      </Dialog>

      {/* Comments Dialog */}
      <Dialog open={openComments} onClose={() => setOpenComments(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Comments</DialogTitle>
        <DialogContent>
          <List>
            {mockComments.map((comment, index) => (
              <React.Fragment key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar>{comment.avatar}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={comment.author}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          {comment.content}
                        </Typography>
                        {` — ${comment.date}`}
                      </>
                    }
                  />
                </ListItem>
                {index < mockComments.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
          <TextField
            margin="dense"
            label="Add a comment"
            fullWidth
            multiline
            rows={2}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenComments(false)}>Close</Button>
          <Button variant="contained" color="primary">
            Comment
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Forum;
