import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '80vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: theme.spacing(4),
}));

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <StyledContainer maxWidth="md">
      <Typography
        variant="h1"
        component="h1"
        sx={{
          fontSize: { xs: '6rem', sm: '8rem', md: '10rem' },
          fontWeight: 'bold',
          color: 'primary.main',
          mb: 2,
        }}
      >
        404
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ mb: 3 }}
      >
        Oops! Page Not Found
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 4, maxWidth: '600px' }}
      >
        The page you're looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/')}
          aria-label="Return to home page"
        >
          Return Home
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate(-1)}
          aria-label="Go back to previous page"
        >
          Go Back
        </Button>
      </Box>
    </StyledContainer>
  );
};

export default NotFound; 