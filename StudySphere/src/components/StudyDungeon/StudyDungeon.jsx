import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import DungeonIntro from './DungeonIntro';
import DungeonTimer from './DungeonTimer';
import DungeonOverlay from './DungeonOverlay';
import RewardPopup from './RewardPopup';

const StudyDungeon = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [showReward, setShowReward] = useState(false);
  const [userStats, setUserStats] = useState(() => {
    const savedStats = localStorage.getItem('userStats');
    return savedStats ? JSON.parse(savedStats) : {
      xp: 0,
      level: 1,
      streak: 0,
      nextLevelXP: 1000,
    };
  });

  useEffect(() => {
    localStorage.setItem('userStats', JSON.stringify(userStats));
  }, [userStats]);

  const handleSessionComplete = () => {
    const baseXP = 100;
    const streakBonus = Math.floor(userStats.streak * 10);
    const totalXP = baseXP + streakBonus;

    setUserStats(prev => {
      const newXP = prev.xp + totalXP;
      const newLevel = Math.floor(newXP / prev.nextLevelXP) + 1;
      const nextLevelXP = newLevel * 1000;

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        streak: prev.streak + 1,
        nextLevelXP,
      };
    });

    setShowReward(true);
  };

  const handleRewardClose = () => {
    setShowReward(false);
  };

  if (showIntro) {
    return <DungeonIntro onEnter={() => setShowIntro(false)} />;
  }

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative' }}>
      <DungeonOverlay
        xp={userStats.xp}
        level={userStats.level}
        streak={userStats.streak}
        nextLevelXP={userStats.nextLevelXP}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
        }}
      >
        <DungeonTimer onSessionComplete={handleSessionComplete} />
      </Box>
      <RewardPopup
        isOpen={showReward}
        onClose={handleRewardClose}
        xpEarned={100}
        streakBonus={userStats.streak * 10}
        achievements={userStats.level > 1 ? [`Reached Level ${userStats.level}!`] : []}
      />
    </Box>
  );
};

export default StudyDungeon; 