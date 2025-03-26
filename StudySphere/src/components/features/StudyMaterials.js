import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Description as DescriptionIcon,
  PlayCircle as PlayCircleIcon,
  QuestionAnswer as QuestionAnswerIcon,
  MenuBook as MenuBookIcon,
  Star as StarIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

const studyMaterials = {
  studyGuides: [
    {
      title: 'Mathematics Fundamentals',
      description: 'Basic concepts of algebra, geometry, and calculus',
      difficulty: 'Beginner',
      link: 'https://www.khanacademy.org/math',
      rating: 4.8,
    },
    {
      title: 'Physics Core Concepts',
      description: 'Mechanics, thermodynamics, and waves',
      difficulty: 'Intermediate',
      link: 'https://www.khanacademy.org/science/physics',
      rating: 4.7,
    },
    {
      title: 'Computer Science Basics',
      description: 'Programming fundamentals and algorithms',
      difficulty: 'Beginner',
      link: 'https://www.codecademy.com/learn/paths/computer-science',
      rating: 4.9,
    },
  ],
  videoLectures: [
    {
      title: 'Introduction to Python',
      description: 'Learn Python basics in this comprehensive course',
      duration: '2h 30m',
      link: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc',
      instructor: 'Dr. Smith',
      rating: 4.9,
    },
    {
      title: 'Advanced Mathematics',
      description: 'Complex analysis and differential equations',
      duration: '3h 45m',
      link: 'https://www.youtube.com/watch?v=WUvTyaaNkzM',
      instructor: 'Prof. Johnson',
      rating: 4.7,
    },
    {
      title: 'Web Development Masterclass',
      description: 'HTML, CSS, and JavaScript fundamentals',
      duration: '4h 15m',
      link: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
      instructor: 'Sarah Davis',
      rating: 4.8,
    },
  ],
  practiceProblems: [
    {
      title: 'Python Coding Challenges',
      description: 'Practice Python with 100+ exercises',
      difficulty: 'Mixed',
      link: 'https://www.hackerrank.com/domains/python',
      totalProblems: 100,
      rating: 4.6,
    },
    {
      title: 'Math Problem Sets',
      description: 'Algebra and calculus practice problems',
      difficulty: 'Advanced',
      link: 'https://brilliant.org/courses/math-fundamentals/',
      totalProblems: 75,
      rating: 4.8,
    },
    {
      title: 'Physics Problem Solving',
      description: 'Mechanics and electromagnetism exercises',
      difficulty: 'Intermediate',
      link: 'https://www.physicsclassroom.com/calcpad',
      totalProblems: 50,
      rating: 4.5,
    },
  ],
  referenceGuides: [
    {
      title: 'Python Documentation',
      description: 'Complete Python language reference',
      link: 'https://docs.python.org/3/',
      type: 'Documentation',
      rating: 4.9,
    },
    {
      title: 'Math Formula Sheet',
      description: 'Comprehensive collection of mathematical formulas',
      link: 'https://mathworld.wolfram.com/',
      type: 'Quick Reference',
      rating: 4.7,
    },
    {
      title: 'Physics Constants',
      description: 'Essential physics constants and equations',
      link: 'https://physics.nist.gov/cuu/Constants/',
      type: 'Reference',
      rating: 4.8,
    },
  ],
};

const StudyMaterials = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleItemClick = (category, item) => {
    setSelectedCategory(category);
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const renderRating = (rating) => {
    return (
      <Box display="flex" alignItems="center">
        <StarIcon sx={{ color: '#FFD700', mr: 0.5 }} />
        <Typography variant="body2" color="text.secondary">
          {rating.toFixed(1)}
        </Typography>
      </Box>
    );
  };

  const renderMaterialDialog = () => {
    if (!selectedItem) return null;

    return (
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {selectedItem.title}
          <IconButton
            aria-label="close"
            onClick={() => setOpenDialog(false)}
            sx={{ color: 'grey.500' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>{selectedItem.description}</Typography>
          {selectedItem.difficulty && (
            <Chip
              label={selectedItem.difficulty}
              color="primary"
              size="small"
              sx={{ mr: 1, mt: 1 }}
            />
          )}
          {selectedItem.duration && (
            <Chip
              label={selectedItem.duration}
              color="secondary"
              size="small"
              sx={{ mr: 1, mt: 1 }}
            />
          )}
          {selectedItem.instructor && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Instructor: {selectedItem.instructor}
            </Typography>
          )}
          {selectedItem.totalProblems && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Total Problems: {selectedItem.totalProblems}
            </Typography>
          )}
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
            {renderRating(selectedItem.rating)}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
          <Button
            variant="contained"
            color="primary"
            href={selectedItem.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Resource
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom color="primary">
          Skill Library
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Access a vast collection of study materials to enhance your knowledge and skills.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', bgcolor: 'background.paper' }}>
            <CardActionArea onClick={() => setSelectedCategory('studyGuides')}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <DescriptionIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6" color="primary">
                    Study Guides
                  </Typography>
                </Box>
                <List>
                  {studyMaterials.studyGuides.map((guide, index) => (
                    <ListItem
                      key={index}
                      button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleItemClick('studyGuides', guide);
                      }}
                    >
                      <ListItemText
                        primary={guide.title}
                        secondary={guide.description}
                      />
                      {renderRating(guide.rating)}
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', bgcolor: 'background.paper' }}>
            <CardActionArea onClick={() => setSelectedCategory('videoLectures')}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PlayCircleIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6" color="primary">
                    Video Lectures
                  </Typography>
                </Box>
                <List>
                  {studyMaterials.videoLectures.map((lecture, index) => (
                    <ListItem
                      key={index}
                      button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleItemClick('videoLectures', lecture);
                      }}
                    >
                      <ListItemText
                        primary={lecture.title}
                        secondary={`${lecture.description} • ${lecture.duration}`}
                      />
                      {renderRating(lecture.rating)}
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', bgcolor: 'background.paper' }}>
            <CardActionArea onClick={() => setSelectedCategory('practiceProblems')}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <QuestionAnswerIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6" color="primary">
                    Practice Problems
                  </Typography>
                </Box>
                <List>
                  {studyMaterials.practiceProblems.map((problem, index) => (
                    <ListItem
                      key={index}
                      button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleItemClick('practiceProblems', problem);
                      }}
                    >
                      <ListItemText
                        primary={problem.title}
                        secondary={`${problem.description} • ${problem.difficulty}`}
                      />
                      {renderRating(problem.rating)}
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', bgcolor: 'background.paper' }}>
            <CardActionArea onClick={() => setSelectedCategory('referenceGuides')}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <MenuBookIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6" color="primary">
                    Reference Materials
                  </Typography>
                </Box>
                <List>
                  {studyMaterials.referenceGuides.map((guide, index) => (
                    <ListItem
                      key={index}
                      button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleItemClick('referenceGuides', guide);
                      }}
                    >
                      <ListItemText
                        primary={guide.title}
                        secondary={`${guide.description} • ${guide.type}`}
                      />
                      {renderRating(guide.rating)}
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>

      {renderMaterialDialog()}
    </Container>
  );
};

export default StudyMaterials;
