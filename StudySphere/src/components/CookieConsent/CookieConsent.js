import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Link,
  Slide,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[4],
  zIndex: theme.zIndex.snackbar,
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3),
  },
}));

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowConsent(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'false');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <Slide direction="up" in={showConsent}>
      <StyledPaper>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'stretch', sm: 'center' },
            gap: 2,
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" gutterBottom>
              We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.{' '}
              <Link
                href="/privacy-policy"
                color="primary"
                underline="hover"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn more
              </Link>
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              flexShrink: 0,
            }}
          >
            <Button
              variant="outlined"
              onClick={handleDecline}
              aria-label="Decline cookies"
            >
              Decline
            </Button>
            <Button
              variant="contained"
              onClick={handleAccept}
              aria-label="Accept cookies"
            >
              Accept
            </Button>
          </Box>
        </Box>
      </StyledPaper>
    </Slide>
  );
};

export default CookieConsent; 