import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  School as SchoolIcon,
  Book as BookIcon,
  Group as GroupIcon,
  Timeline as TimelineIcon,
  EmojiEvents as EmojiEventsIcon,
  Psychology as PsychologyIcon,
  Forum as ForumIcon,
  Person as PersonIcon,
  ExpandLess,
  ExpandMore,
  Dashboard as DashboardIcon,
  FlashOn as FlashOnIcon,
  Castle as CastleIcon,
  Analytics as AnalyticsIcon,
  Chat as ChatIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const menuItems = [
  {
    category: 'Study Tools',
    items: [
      { text: 'Study Dungeon', path: '/study-dungeon', icon: <CastleIcon /> },
      { text: 'Flashcards', path: '/flashcards', icon: <FlashOnIcon /> },
      { text: 'Study Materials', path: '/study-materials', icon: <BookIcon /> },
      { text: 'AI Tutor', path: '/ai-tutor', icon: <PsychologyIcon /> },
    ],
  },
  {
    category: 'Progress',
    items: [
      { text: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
      { text: 'Analytics', path: '/analytics', icon: <AnalyticsIcon /> },
      { text: 'Achievements', path: '/achievements', icon: <EmojiEventsIcon /> },
      { text: 'Timeline', path: '/timeline', icon: <TimelineIcon /> },
    ],
  },
  {
    category: 'Community',
    items: [
      { text: 'Social Hub', path: '/social', icon: <GroupIcon /> },
      { text: 'Forum', path: '/forum', icon: <ForumIcon /> },
      { text: 'Study Groups', path: '/study-groups', icon: <SchoolIcon /> },
      { text: 'Chat', path: '/chat', icon: <ChatIcon /> },
    ],
  },
  {
    category: 'Account',
    items: [
      { text: 'Profile', path: '/profile', icon: <PersonIcon /> },
      { text: 'Settings', path: '/settings', icon: <SettingsIcon /> },
      { text: 'Help Center', path: '/help', icon: <HelpIcon /> },
    ],
  },
];

const Navbar = ({ onThemeToggle, isDarkMode }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const { user, logout } = useAuth();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleCategoryClick = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const drawer = (
    <Box sx={{ 
      bgcolor: 'background.default',
      height: '100%',
      background: 'linear-gradient(180deg, #0A1929 0%, #132F4C 100%)',
      color: '#fff',
    }}>
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center',
        borderBottom: '1px solid rgba(76, 170, 255, 0.2)',
      }}>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#4CAAFF',
            textShadow: '0 0 10px rgba(76, 170, 255, 0.5)',
            fontWeight: 'bold',
          }}
        >
          STUDYSPHERE
        </Typography>
      </Box>

      <List sx={{ width: '100%', pt: 0 }}>
        {menuItems.map((category) => (
          <React.Fragment key={category.category}>
            <ListItem 
              button 
              onClick={() => handleCategoryClick(category.category)}
              sx={{
                bgcolor: expandedCategory === category.category ? 'rgba(76, 170, 255, 0.1)' : 'transparent',
                '&:hover': {
                  bgcolor: 'rgba(76, 170, 255, 0.2)',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#4CAAFF' }}>
                {category.items[0].icon}
              </ListItemIcon>
              <ListItemText 
                primary={category.category}
                primaryTypographyProps={{
                  sx: { 
                    color: '#4CAAFF',
                    fontWeight: 'bold',
                  }
                }}
              />
              {expandedCategory === category.category ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={expandedCategory === category.category} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {category.items.map((item) => (
                  <ListItem
                    key={item.text}
                    component={RouterLink}
                    to={item.path}
                    button
                    sx={{
                      pl: 4,
                      bgcolor: isActive(item.path) ? 'rgba(76, 170, 255, 0.2)' : 'transparent',
                      '&:hover': {
                        bgcolor: 'rgba(76, 170, 255, 0.1)',
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: isActive(item.path) ? '#4CAAFF' : 'rgba(255, 255, 255, 0.7)' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.text}
                      primaryTypographyProps={{
                        sx: { 
                          color: isActive(item.path) ? '#4CAAFF' : 'rgba(255, 255, 255, 0.7)',
                          fontWeight: isActive(item.path) ? 'bold' : 'normal',
                        }
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
            <Divider sx={{ borderColor: 'rgba(76, 170, 255, 0.2)' }} />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: 'linear-gradient(45deg, #0A1929 30%, #132F4C 90%)',
        borderBottom: '2px solid rgba(76, 170, 255, 0.3)',
        boxShadow: '0 0 20px rgba(76, 170, 255, 0.2)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              mr: 2,
              '&:hover': {
                '& .MuiSvgIcon-root': {
                  filter: 'drop-shadow(0 0 4px rgba(76, 170, 255, 0.8))',
                },
              },
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography 
            variant="h6" 
            component={RouterLink}
            to="/"
            sx={{ 
              flexGrow: { xs: 1, md: 0 },
              mr: { xs: 0, md: 4 },
              color: '#4CAAFF',
              textDecoration: 'none',
              textShadow: '0 0 10px rgba(76, 170, 255, 0.5)',
              fontWeight: 'bold',
              letterSpacing: '1px',
              fontSize: { xs: '1rem', sm: '1.25rem' },
              '&:hover': {
                textShadow: '0 0 15px rgba(76, 170, 255, 0.8)',
              },
            }}
          >
            STUDYSPHERE
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1, flexGrow: 1 }}>
              {menuItems.map((category) => (
                <Button
                  key={category.category}
                  color="inherit"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    '&:hover': {
                      color: '#4CAAFF',
                      textShadow: '0 0 8px rgba(76, 170, 255, 0.5)',
                    },
                  }}
                >
                  {category.category}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ display: 'flex', gap: 1 }}>
            {user ? (
              <>
                <Button
                  component={RouterLink}
                  to="/profile"
                  color="inherit"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    '&:hover': {
                      color: '#4CAAFF',
                      textShadow: '0 0 8px rgba(76, 170, 255, 0.5)',
                    },
                  }}
                >
                  Profile
                </Button>
                <Button
                  onClick={logout}
                  color="inherit"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    '&:hover': {
                      color: '#4CAAFF',
                      textShadow: '0 0 8px rgba(76, 170, 255, 0.5)',
                    },
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                component={RouterLink}
                to="/auth"
                color="inherit"
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  '&:hover': {
                    color: '#4CAAFF',
                    textShadow: '0 0 8px rgba(76, 170, 255, 0.5)',
                  },
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar; 