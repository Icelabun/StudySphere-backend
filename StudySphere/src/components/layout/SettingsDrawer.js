import React, { useState } from 'react';
import {
  Drawer, Box, Typography, IconButton, Divider, Switch, TextField, Button, Card, CardContent
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import TimerIcon from '@mui/icons-material/Timer';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import MoodIcon from '@mui/icons-material/Mood';

const funFacts = [
  'Honey never spoils.',
  'Bananas are berries, but strawberries are not.',
  'A group of flamingos is called a "flamboyance".',
  'Octopuses have three hearts.',
  'The Eiffel Tower can be 15 cm taller during hot days.'
];
const quotes = [
  'Success is the sum of small efforts, repeated day in and day out.',
  'The secret of getting ahead is getting started.',
  "Don't watch the clock; do what it does. Keep going.",
  'The future depends on what you do today.'
];

const SettingsDrawer = ({ open, onClose, themeMode, toggleTheme, user, onProfileSave }) => {
  const [profile, setProfile] = useState({ username: user?.username || '', email: user?.email || '' });
  const [goal, setGoal] = useState(60);
  const [pomodoro, setPomodoro] = useState(25);
  const [showFact, setShowFact] = useState(funFacts[0]);
  const [showQuote, setShowQuote] = useState(quotes[0]);

  const handleProfileChange = e => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleProfileSave = () => {
    if (onProfileSave) onProfileSave(profile);
  };

  const randomFact = () => setShowFact(funFacts[Math.floor(Math.random() * funFacts.length)]);
  const randomQuote = () => setShowQuote(quotes[Math.floor(Math.random() * quotes.length)]);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 340, p: 3, bgcolor: 'background.default', height: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <SettingsIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Settings</Typography>
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>Theme</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LightModeIcon />
            <Switch checked={themeMode === 'dark'} onChange={toggleTheme} />
            <DarkModeIcon />
          </Box>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>Profile</Typography>
          <TextField label="Username" name="username" value={profile.username} onChange={handleProfileChange} fullWidth sx={{ mb: 1 }} />
          <TextField label="Email" name="email" value={profile.email} onChange={handleProfileChange} fullWidth sx={{ mb: 1 }} />
          <Button variant="contained" onClick={handleProfileSave} fullWidth>Save</Button>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>Productivity</Typography>
          <Card sx={{ mb: 1 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TimerIcon color="primary" />
                <Typography variant="body1">Pomodoro Timer: {pomodoro} min</Typography>
              </Box>
              <Button size="small" onClick={() => setPomodoro(25)}>25 min</Button>
              <Button size="small" onClick={() => setPomodoro(50)}>50 min</Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="body2">Daily Study Goal (min):</Typography>
              <TextField type="number" value={goal} onChange={e => setGoal(e.target.value)} size="small" sx={{ width: 80, ml: 1 }} />
            </CardContent>
          </Card>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>Motivation</Typography>
          <Card sx={{ mb: 1, bgcolor: 'info.light' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmojiObjectsIcon color="warning" />
                <Typography variant="body2">{showQuote}</Typography>
              </Box>
              <Button size="small" onClick={randomQuote}>New Quote</Button>
            </CardContent>
          </Card>
          <Card sx={{ bgcolor: 'success.light' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <MoodIcon color="success" />
                <Typography variant="body2">{showFact}</Typography>
              </Box>
              <Button size="small" onClick={randomFact}>Fun Fact</Button>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Drawer>
  );
};

export default SettingsDrawer; 