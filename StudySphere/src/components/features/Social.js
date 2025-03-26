import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Chip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Badge,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PeopleIcon from '@mui/icons-material/People';
import MessageIcon from '@mui/icons-material/Message';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SchoolIcon from '@mui/icons-material/School';
import { useAuth } from '../../contexts/AuthContext';

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

const mockStudents = [
  {
    id: 1,
    name: 'Emma Wilson',
    avatar: 'E',
    level: 'Level 3',
    subjects: ['Mathematics', 'Physics'],
    status: 'Online',
    achievements: 15,
  },
  {
    id: 2,
    name: 'James Chen',
    avatar: 'J',
    level: 'Level 4',
    subjects: ['Computer Science', 'Mathematics'],
    status: 'In Study Session',
    achievements: 22,
  },
  {
    id: 3,
    name: 'Sofia Rodriguez',
    avatar: 'S',
    level: 'Level 2',
    subjects: ['Chemistry', 'Biology'],
    status: 'Online',
    achievements: 10,
  },
];

const mockStudyGroups = [
  {
    id: 1,
    name: 'Advanced Calculus Group',
    members: 5,
    subject: 'Mathematics',
    nextSession: '2024-03-27 15:00',
    description: 'Weekly study sessions focusing on advanced calculus topics',
  },
  {
    id: 2,
    name: 'Programming Practice',
    members: 8,
    subject: 'Computer Science',
    nextSession: '2024-03-28 18:00',
    description: 'Collaborative coding and algorithm practice',
  },
];

const Social = () => {
  const { user } = useAuth();
  const [openCreateGroup, setOpenCreateGroup] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: '', subject: '', description: '' });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);
  const [openGroupDetails, setOpenGroupDetails] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleCreateGroup = () => {
    // Add group creation logic here
    setOpenCreateGroup(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <PeopleIcon sx={{ fontSize: 40 }} />
          Social Hub
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<GroupAddIcon />}
          onClick={() => setOpenCreateGroup(true)}
        >
          Create Study Group
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Study Groups Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SchoolIcon />
            Active Study Groups
          </Typography>
          {mockStudyGroups.map((group) => (
            <StyledCard key={group.id}>
              <CardContent>
                <Typography variant="h6" color="primary">
                  {group.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {group.members} members • {group.subject}
                </Typography>
                <Typography variant="body2" paragraph>
                  {group.description}
                </Typography>
                <Typography variant="body2" color="primary">
                  Next Session: {new Date(group.nextSession).toLocaleString()}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => {
                    setSelectedGroup(group);
                    setOpenGroupDetails(true);
                  }}
                >
                  View Details
                </Button>
                <Button size="small" color="primary">
                  Join Group
                </Button>
              </CardActions>
            </StyledCard>
          ))}
        </Grid>

        {/* Online Students Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PeopleIcon />
            Online Students
          </Typography>
          {mockStudents.map((student) => (
            <StyledCard key={student.id}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                    color={student.status === 'Online' ? 'success' : 'primary'}
                  >
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>{student.avatar}</Avatar>
                  </Badge>
                  <Box>
                    <Typography variant="h6" color="primary">
                      {student.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {student.level} • {student.status}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  {student.subjects.map((subject, index) => (
                    <Chip key={index} label={subject} size="small" color="primary" variant="outlined" />
                  ))}
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  startIcon={<PersonAddIcon />}
                  color="primary"
                >
                  Add Friend
                </Button>
                <Button
                  size="small"
                  startIcon={<MessageIcon />}
                  color="primary"
                >
                  Message
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => {
                    setSelectedStudent(student);
                    setOpenProfile(true);
                  }}
                >
                  View Profile
                </Button>
              </CardActions>
            </StyledCard>
          ))}
        </Grid>
      </Grid>

      {/* Create Study Group Dialog */}
      <Dialog open={openCreateGroup} onClose={() => setOpenCreateGroup(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create Study Group</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Group Name"
            fullWidth
            value={newGroup.name}
            onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Subject"
            fullWidth
            value={newGroup.subject}
            onChange={(e) => setNewGroup({ ...newGroup, subject: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={newGroup.description}
            onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateGroup(false)}>Cancel</Button>
          <Button onClick={handleCreateGroup} variant="contained" color="primary">
            Create Group
          </Button>
        </DialogActions>
      </Dialog>

      {/* Student Profile Dialog */}
      <Dialog open={openProfile} onClose={() => setOpenProfile(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Student Profile</DialogTitle>
        <DialogContent>
          {selectedStudent && (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: 'primary.main' }}>
                {selectedStudent.avatar}
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {selectedStudent.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {selectedStudent.level}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 2 }}>
                {selectedStudent.subjects.map((subject, index) => (
                  <Chip key={index} label={subject} color="primary" />
                ))}
              </Box>
              <Typography variant="body1" gutterBottom>
                Achievements: {selectedStudent.achievements}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenProfile(false)}>Close</Button>
          <Button variant="contained" color="primary" startIcon={<MessageIcon />}>
            Send Message
          </Button>
        </DialogActions>
      </Dialog>

      {/* Group Details Dialog */}
      <Dialog open={openGroupDetails} onClose={() => setOpenGroupDetails(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Study Group Details</DialogTitle>
        <DialogContent>
          {selectedGroup && (
            <Box sx={{ py: 2 }}>
              <Typography variant="h5" gutterBottom>
                {selectedGroup.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Subject: {selectedGroup.subject}
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedGroup.description}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Members: {selectedGroup.members}
              </Typography>
              <Typography variant="body1" color="primary" gutterBottom>
                Next Session: {new Date(selectedGroup.nextSession).toLocaleString()}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenGroupDetails(false)}>Close</Button>
          <Button variant="contained" color="primary">
            Join Group
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Social;
