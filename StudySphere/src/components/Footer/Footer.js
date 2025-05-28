import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  YouTube as YouTubeIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledFooter = styled('footer')(({ theme }) => ({
  background: 'linear-gradient(180deg, #0A1929 0%, #132F4C 100%)',
  padding: theme.spacing(6, 0),
  marginTop: 'auto',
  borderTop: '2px solid rgba(76, 170, 255, 0.3)',
  boxShadow: '0 0 20px rgba(76, 170, 255, 0.2)',
  color: '#fff',
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.7)',
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    color: '#4CAAFF',
    textShadow: '0 0 8px rgba(76, 170, 255, 0.5)',
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.7)',
  transition: 'all 0.3s ease',
  '&:hover': {
    color: '#4CAAFF',
    transform: 'translateY(-2px)',
    '& .MuiSvgIcon-root': {
      filter: 'drop-shadow(0 0 4px rgba(76, 170, 255, 0.8))',
    },
  },
}));

const Footer = () => {
  const theme = useTheme();

  const footerLinks = {
    platform: [
      { name: 'Study Dungeon', href: '/study-dungeon' },
      { name: 'Flashcards', href: '/flashcards' },
      { name: 'Quests', href: '/quests' },
      { name: 'Achievements', href: '/achievements' },
    ],
    community: [
      { name: 'Forum', href: '/forum' },
      { name: 'Social', href: '/social' },
      { name: 'AI Tutor', href: '/ai-tutor' },
      { name: 'Analytics', href: '/analytics' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Careers', href: '/careers' },
      { name: 'Blog', href: '/blog' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Accessibility', href: '/accessibility' },
    ],
  };

  const socialLinks = [
    { icon: <FacebookIcon />, href: 'https://facebook.com/studysphere', label: 'Facebook' },
    { icon: <TwitterIcon />, href: 'https://twitter.com/studysphere', label: 'Twitter' },
    { icon: <InstagramIcon />, href: 'https://instagram.com/studysphere', label: 'Instagram' },
    { icon: <LinkedInIcon />, href: 'https://linkedin.com/company/studysphere', label: 'LinkedIn' },
    { icon: <GitHubIcon />, href: 'https://github.com/studysphere', label: 'GitHub' },
    { icon: <YouTubeIcon />, href: 'https://youtube.com/studysphere', label: 'YouTube' },
  ];

  return (
    <StyledFooter>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ 
                color: '#4CAAFF',
                textShadow: '0 0 10px rgba(76, 170, 255, 0.5)',
                fontWeight: 'bold',
              }}
            >
              StudySphere
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }} paragraph>
              Your ultimate study companion for academic success. Transform your learning experience with our innovative platform.
            </Typography>
            <Box sx={{ mt: 2 }}>
              {socialLinks.map((social) => (
                <StyledIconButton
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  sx={{ mr: 1 }}
                >
                  {social.icon}
                </StyledIconButton>
              ))}
            </Box>
          </Grid>

          {Object.entries(footerLinks).map(([category, links]) => (
            <Grid item xs={12} sm={6} md={3} key={category}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ 
                  color: '#4CAAFF',
                  textShadow: '0 0 10px rgba(76, 170, 255, 0.5)',
                  textTransform: 'capitalize',
                  fontWeight: 'bold',
                }}
              >
                {category}
              </Typography>
              {links.map((link) => (
                <StyledLink
                  key={link.name}
                  href={link.href}
                  display="block"
                  sx={{ mb: 1 }}
                >
                  {link.name}
                </StyledLink>
              ))}
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            mt: 5,
            pt: 3,
            borderTop: '1px solid rgba(76, 170, 255, 0.2)',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            © {new Date().getFullYear()} StudySphere. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </StyledFooter>
  );
};

export default Footer; 