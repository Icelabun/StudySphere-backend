import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import { useStudyDungeon } from '../../contexts/StudyDungeonContext';
import DungeonIntro from '../StudyDungeon/DungeonIntro';
import DungeonTimer from '../StudyDungeon/DungeonTimer';
import StudyDungeonComponent from '../StudyDungeon/StudyDungeon';

const StudyDungeonPage = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const { startSession, endSession, addExperience, addAchievement } = useStudyDungeon();

  const handleStart = () => {
    const session = startSession('focus');
    setHasStarted(true);
  };

  const handleSessionComplete = () => {
    addExperience(100);
    endSession(Date.now(), true);
    
    // Check for achievements
    const newAchievements = [];
    if (Math.random() < 0.3) { // 30% chance to get an achievement
      newAchievements.push({
        id: Date.now(),
        title: 'Focus Master',
        description: 'Completed a study session with perfect focus',
        icon: '🎯'
      });
    }
    
    newAchievements.forEach(achievement => addAchievement(achievement));
  };

  if (!hasStarted) {
    return <DungeonIntro onEnter={handleStart} />;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <StudyDungeonComponent>
          <DungeonTimer onSessionComplete={handleSessionComplete} />
        </StudyDungeonComponent>
      </Box>
    </Container>
  );
};

export default StudyDungeonPage; 