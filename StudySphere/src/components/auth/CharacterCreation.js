import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Slider,
  Fade,
  CircularProgress,
  Avatar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const GlowingText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  textShadow: '0 0 10px rgba(76, 170, 255, 0.5)',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  background: 'linear-gradient(45deg, #132F4C 30%, #173d5d 90%)',
  border: '1px solid rgba(76, 170, 255, 0.3)',
  boxShadow: '0 0 15px rgba(76, 170, 255, 0.2)',
  position: 'relative',
  overflow: 'hidden',
}));

const AttributeSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.primary.main,
  '& .MuiSlider-thumb': {
    boxShadow: '0 0 10px rgba(76, 170, 255, 0.5)',
  },
  '& .MuiSlider-track': {
    boxShadow: '0 0 5px rgba(76, 170, 255, 0.3)',
  },
}));

const GlowingAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  margin: '0 auto',
  border: '2px solid rgba(76, 170, 255, 0.5)',
  boxShadow: '0 0 20px rgba(76, 170, 255, 0.3)',
  backgroundColor: theme.palette.primary.main,
  fontSize: '2rem',
}));

const CharacterCreation = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [step, setStep] = useState(0);
  const [attributes, setAttributes] = useState({
    intelligence: 10,
    focus: 10,
    memory: 10,
    comprehension: 10,
    persistence: 10,
  });
  const [loading, setLoading] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const totalPoints = 60;
  const currentTotal = Object.values(attributes).reduce((a, b) => a + b, 0);
  const remainingPoints = totalPoints - currentTotal;

  const handleAttributeChange = (attribute) => (event, newValue) => {
    const diff = newValue - attributes[attribute];
    if (remainingPoints - diff >= 0 || diff < 0) {
      setAttributes((prev) => ({
        ...prev,
        [attribute]: newValue,
      }));
    }
  };

  const handleCharacterCreation = async () => {
    setLoading(true);
    setShowAnimation(true);
    try {
      // Send attributes to backend
      const res = await axiosInstance.put('/api/auth/profile', { attributes });
      // Update user context with backend response
      updateUser(res.data.user);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate('/study-dungeon');
    } catch (error) {
      alert('Failed to create character. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      title: 'Welcome, Hunter',
      content: (
        <Box sx={{ textAlign: 'center' }}>
          <GlowingAvatar>{user?.username?.[0]?.toUpperCase()}</GlowingAvatar>
          <Typography variant="h6" sx={{ mt: 3, color: 'text.secondary' }}>
            Welcome to the world of StudySphere the no1 study hub you can find
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
            Before you begin your journey, let's determine your initial attributes.
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 4 }}
            onClick={() => setStep(1)}
          >
            Begin Your Character Creation
          </Button>
        </Box>
      ),
    },
    {
      title: 'Distribute Your Attribute Points',
      content: (
        <Box>
          <Typography
            variant="subtitle1"
            sx={{ mb: 3, color: remainingPoints < 0 ? 'error.main' : 'success.main' }}
          >
            Remaining Points: {remainingPoints}
          </Typography>
          {Object.entries(attributes).map(([attr, value]) => (
            <Box key={attr} sx={{ mb: 3 }}>
              <Typography
                variant="subtitle2"
                sx={{ color: 'text.secondary', textTransform: 'capitalize' }}
              >
                {attr}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AttributeSlider
                  value={value}
                  onChange={handleAttributeChange(attr)}
                  min={5}
                  max={20}
                  sx={{ flexGrow: 1 }}
                />
                <Typography sx={{ color: 'primary.main', width: 40 }}>
                  {value}
                </Typography>
              </Box>
            </Box>
          ))}
          <Button
            variant="contained"
            fullWidth
            disabled={remainingPoints !== 0}
            onClick={() => setStep(2)}
            sx={{ mt: 2 }}
          >
            Confirm Attributes
          </Button>
        </Box>
      ),
    },
    {
      title: 'Your Journey Begins',
      content: (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ color: 'text.secondary', mb: 3 }}>
            Are you ready to begin your journey as a Student Hunter?
          </Typography>
          <Button
            variant="contained"
            onClick={handleCharacterCreation}
            disabled={loading}
          >
            {loading ? 'Creating Character...' : 'Start Your Journey'}
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Fade in={showAnimation} timeout={1000}>
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'background.default',
            display: loading ? 'flex' : 'none',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <CircularProgress size={60} />
          <GlowingText variant="h5" sx={{ mt: 3 }}>
            Awakening Your schedule...
          </GlowingText>
        </Box>
      </Fade>

      <StyledPaper>
        <GlowingText variant="h4" align="center" gutterBottom>
          {steps[step].title}
        </GlowingText>
        {steps[step].content}
      </StyledPaper>
    </Container>
  );
};

export default CharacterCreation;
