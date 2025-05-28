import React, { createContext, useContext, useState, useCallback } from 'react';

const StudyDungeonContext = createContext();

export const useStudyDungeon = () => {
  const context = useContext(StudyDungeonContext);
  if (!context) {
    throw new Error('useStudyDungeon must be used within a StudyDungeonProvider');
  }
  return context;
};

export const StudyDungeonProvider = ({ children }) => {
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [sessionHistory, setSessionHistory] = useState([]);

  const addExperience = useCallback((amount) => {
    setExperience(prev => {
      const newExp = prev + amount;
      // Level up every 500 experience
      if (newExp >= level * 500) {
        setLevel(prevLevel => prevLevel + 1);
        return newExp - (level * 500);
      }
      return newExp;
    });
  }, [level]);

  const addAchievement = useCallback((achievement) => {
    setAchievements(prev => {
      if (!prev.find(a => a.id === achievement.id)) {
        return [...prev, achievement];
      }
      return prev;
    });
  }, []);

  const startSession = useCallback((sessionType) => {
    const newSession = {
      id: Date.now(),
      type: sessionType,
      startTime: new Date(),
      status: 'in-progress'
    };
    setCurrentSession(newSession);
    return newSession;
  }, []);

  const endSession = useCallback((sessionId, success) => {
    setCurrentSession(null);
    setSessionHistory(prev => [
      ...prev,
      {
        ...prev.find(s => s.id === sessionId),
        endTime: new Date(),
        status: success ? 'completed' : 'failed'
      }
    ]);
  }, []);

  const value = {
    level,
    experience,
    achievements,
    currentSession,
    sessionHistory,
    addExperience,
    addAchievement,
    startSession,
    endSession
  };

  return (
    <StudyDungeonContext.Provider value={value}>
      {children}
    </StudyDungeonContext.Provider>
  );
}; 