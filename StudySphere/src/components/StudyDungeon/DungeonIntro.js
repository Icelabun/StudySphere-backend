import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

const VideoBackground = styled('video')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  zIndex: -1,
});

const Overlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 0,
}));

const Content = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: theme.palette.common.white,
  textAlign: 'center',
  padding: theme.spacing(3),
}));

const DungeonIntro = ({ onEnter }) => {
  return (
    <Box sx={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <VideoBackground
        autoPlay
        muted
        loop
        playsInline
        poster="/images/dungeon-poster.jpg"
      >
        <source src="/videos/dungeon-intro.mp4" type="video/mp4" />
      </VideoBackground>
      <Overlay />
      <Content>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            Enter the Study Dungeon
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              mb: 4,
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            }}
          >
            Face your academic challenges and emerge victorious!
          </Typography>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={onEnter}
              sx={{
                backgroundColor: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
                px: 4,
                py: 1.5,
                fontSize: '1.2rem',
              }}
            >
              Begin Your Quest
            </Button>
          </motion.div>
        </motion.div>
      </Content>
    </Box>
  );
};

export default DungeonIntro; 