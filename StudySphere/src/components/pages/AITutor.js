import React, { useState, useRef, useEffect } from 'react';
import { Container, Typography, Box, TextField, Button, Card, CardContent, Avatar, List, ListItem, Paper } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';

const AITutor = () => {
  const [messages, setMessages] = useState([
    { from: 'ai', text: 'Hello! How can I help you study today?' },
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  const handleSend = () => {
    if (input) {
      setMessages([...messages, { from: 'user', text: input }, { from: 'ai', text: `You said: ${input}` }]);
      setInput('');
    }
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={4} sx={{ p: 0, overflow: 'hidden' }}>
        <Box sx={{ bgcolor: 'primary.main', color: '#fff', p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <SmartToyIcon sx={{ fontSize: 32 }} />
          <Typography variant="h5">AI Tutor</Typography>
        </Box>
        <Box sx={{ maxHeight: 350, overflowY: 'auto', p: 2, bgcolor: 'background.default' }}>
          <List>
            {messages.map((msg, idx) => (
              <ListItem key={idx} alignItems="flex-start" sx={{ mb: 1 }}>
                <Avatar sx={{ bgcolor: msg.from === 'ai' ? 'primary.main' : 'secondary.main', mr: 2 }}>
                  {msg.from === 'ai' ? <SmartToyIcon /> : <PersonIcon />}
                </Avatar>
                <Card sx={{ bgcolor: msg.from === 'ai' ? 'primary.light' : 'secondary.light', color: 'text.primary', minWidth: 0, flex: 1 }}>
                  <CardContent sx={{ py: 1.5, px: 2 }}>
                    <Typography variant="body1">{msg.text}</Typography>
                  </CardContent>
                </Card>
              </ListItem>
            ))}
            <div ref={chatEndRef} />
          </List>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, p: 2, borderTop: '1px solid #eee', bgcolor: 'background.paper' }}>
          <TextField label="Ask a question..." value={input} onChange={e => setInput(e.target.value)} fullWidth onKeyDown={e => { if (e.key === 'Enter') handleSend(); }} />
          <Button variant="contained" onClick={handleSend} endIcon={<SendIcon />} sx={{ minWidth: 100 }}>Send</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AITutor; 