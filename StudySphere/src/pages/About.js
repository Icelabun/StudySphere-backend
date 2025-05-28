import React from 'react';
import { Container, Typography, Grid, Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: theme.spacing(2, 0),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[3],
}));

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        About StudySphere
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h4" component="h2" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph>
              StudySphere is dedicated to revolutionizing the way students learn and prepare for their academic journey. 
              We believe in making education accessible, engaging, and effective for everyone.
            </Typography>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h4" component="h2" gutterBottom>
              Our Vision
            </Typography>
            <Typography variant="body1" paragraph>
              To create a world where every student has access to high-quality educational resources and tools 
              that help them achieve their full potential.
            </Typography>
          </StyledPaper>
        </Grid>

        <Grid item xs={12}>
          <StyledPaper>
            <Typography variant="h4" component="h2" gutterBottom>
              Our Team
            </Typography>
            <Grid container spacing={3}>
              {[
                {
                  name: 'John Doe',
                  role: 'Founder & CEO',
                  bio: 'Passionate about education technology and student success.',
                },
                {
                  name: 'Jane Smith',
                  role: 'Head of Product',
                  bio: 'Experienced in creating engaging learning experiences.',
                },
                {
                  name: 'Mike Johnson',
                  role: 'Lead Developer',
                  bio: 'Dedicated to building robust and scalable solutions.',
                },
              ].map((member, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle1" color="primary" gutterBottom>
                      {member.role}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.bio}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About; 