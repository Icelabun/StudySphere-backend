import React from 'react';
import { Container, Typography, Box, Card, CardContent, Grid } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Analytics = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <BarChartIcon color="primary" sx={{ fontSize: 36 }} /> Quest Analytics
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 3 }}>
        Your study and quest progress at a glance
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={4}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <BarChartIcon color="primary" />
                <Typography variant="h6">Total Study Sessions</Typography>
              </Box>
              <Typography variant="h3" color="primary">42</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={4}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <AssignmentTurnedInIcon color="secondary" />
                <Typography variant="h6">Quests Completed</Typography>
              </Box>
              <Typography variant="h3" color="secondary">17</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={4}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <AccessTimeIcon color="action" />
                <Typography variant="h6">Avg. Session Length</Typography>
              </Box>
              <Typography variant="h3">45 min</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Analytics; 