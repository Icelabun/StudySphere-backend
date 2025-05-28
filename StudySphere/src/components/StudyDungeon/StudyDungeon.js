import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import PortalAnimation from './PortalAnimation';
import Monster from './Monster';
import QuestionBox from './QuestionBox';
import HUD from './HUD';
import ExitButton from './ExitButton';
import { soundManager } from './SoundEffects';
import { getRandomMonster } from './MonsterTypes';
import Weapons, { weapons } from './Weapons';
import Mutations, { mutations } from './Mutations';

const Container = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#1a1a1a',
  padding: theme.spacing(4),
  fontFamily: '"Press Start 2P", cursive',
  color: '#fff',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("/images/pixel-grid.png")',
    opacity: 0.1,
    pointerEvents: 'none',
  }
}));

const Title = styled(Typography)(({ theme }) => ({
  color: '#ff4655',
  textShadow: '0 0 10px rgba(255, 70, 85, 0.8)',
  marginBottom: theme.spacing(4),
  fontSize: '2.5rem',
  letterSpacing: '2px',
  textTransform: 'uppercase',
  fontFamily: '"Press Start 2P", cursive',
}));

const StartButton = styled(Button)(({ theme }) => ({
  background: '#ff4655',
  color: '#fff',
  padding: theme.spacing(2, 4),
  fontFamily: '"Press Start 2P", cursive',
  fontSize: '1rem',
  border: '2px solid #fff',
  borderRadius: '0',
  '&:hover': {
    background: '#ff6b77',
    transform: 'scale(1.05)',
    transition: 'all 0.2s ease-in-out',
  },
}));

const BattleArea = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(4),
  width: '100%',
  maxWidth: '1200px',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(255,70,85,0.1) 0%, rgba(255,70,85,0) 100%)',
    pointerEvents: 'none',
  }
}));

const MedkitButton = styled(Button)(({ theme }) => ({
  background: '#4CAF50',
  color: '#fff',
  padding: theme.spacing(1, 3),
  fontFamily: '"Press Start 2P", cursive',
  fontSize: '0.8rem',
  border: '2px solid #fff',
  borderRadius: '0',
  marginTop: theme.spacing(2),
  '&:hover': {
    background: '#66BB6A',
    transform: 'scale(1.05)',
    transition: 'all 0.2s ease-in-out',
  },
}));

const GameOverDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    background: '#1a1a1a',
    border: '2px solid #ff4655',
    borderRadius: '0',
    padding: theme.spacing(2),
  },
  '& .MuiDialogTitle-root': {
    color: '#ff4655',
    fontFamily: '"Press Start 2P", cursive',
    textAlign: 'center',
  },
  '& .MuiDialogContent-root': {
    color: '#fff',
    fontFamily: '"Press Start 2P", cursive',
    textAlign: 'center',
  },
  '& .MuiButton-root': {
    fontFamily: '"Press Start 2P", cursive',
    color: '#fff',
    '&.MuiButton-contained': {
      background: '#ff4655',
      '&:hover': {
        background: '#ff6b77',
      },
    },
  },
}));

const sampleQuestions = [
  {
    text: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris"
  },
  {
    text: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },
  {
    text: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4"
  },
  {
    text: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correctAnswer: "Pacific"
  },
  {
    text: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
    correctAnswer: "Oxygen"
  },
  {
    text: "What is the square root of 144?",
    options: ["12", "14", "16", "18"],
    correctAnswer: "12"
  },
  {
    text: "Which country is home to the kangaroo?",
    options: ["New Zealand", "Australia", "South Africa", "Brazil"],
    correctAnswer: "Australia"
  },
  {
    text: "What is the main component of the Sun?",
    options: ["Helium", "Hydrogen", "Oxygen", "Carbon"],
    correctAnswer: "Hydrogen"
  },
  {
    text: "Which famous scientist developed the theory of relativity?",
    options: ["Newton", "Einstein", "Galileo", "Hawking"],
    correctAnswer: "Einstein"
  },
  {
    text: "What is the largest organ in the human body?",
    options: ["Heart", "Brain", "Liver", "Skin"],
    correctAnswer: "Skin"
  },
  {
    text: "Which country has the most natural lakes?",
    options: ["Canada", "Russia", "USA", "Finland"],
    correctAnswer: "Canada"
  },
  {
    text: "What is the chemical formula for water?",
    options: ["H2O", "CO2", "O2", "H2SO4"],
    correctAnswer: "H2O"
  },
  {
    text: "Which planet has the most moons?",
    options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    correctAnswer: "Saturn"
  },
  {
    text: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Diamond", "Platinum", "Titanium"],
    correctAnswer: "Diamond"
  },
  {
    text: "Which country has the most active volcanoes?",
    options: ["Japan", "Indonesia", "USA", "Italy"],
    correctAnswer: "Indonesia"
  }
];

const StudyDungeon = () => {
  const [gameState, setGameState] = useState('idle');
  const [playerHP, setPlayerHP] = useState(100);
  const [monsterHP, setMonsterHP] = useState(0);
  const [monster, setMonster] = useState(null);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [showGameOver, setShowGameOver] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [hasMedkit, setHasMedkit] = useState(false);
  const [usedQuestions, setUsedQuestions] = useState(new Set());
  const [activeWeapon, setActiveWeapon] = useState('sword');
  const [activeMutations, setActiveMutations] = useState([]);
  const [questionTimer, setQuestionTimer] = useState(0);

  const handleStartGame = () => {
    setGameState('portal');
    soundManager.playSound('portal');
  };

  const handlePortalComplete = () => {
    setGameState('battle');
    spawnNewMonster();
    soundManager.playMusic('battleMusic');
  };

  const spawnNewMonster = () => {
    const newMonster = getRandomMonster(level);
    setMonster(newMonster);
    setMonsterHP(newMonster.maxHp);
    setQuestionsAnswered(0);
    setCorrectStreak(0);
    setUsedQuestions(new Set());
    setCurrentQuestion(getRandomQuestion());
  };

  const getRandomQuestion = () => {
    const availableQuestions = sampleQuestions.filter(q => !usedQuestions.has(q.text));
    if (availableQuestions.length === 0) {
      setUsedQuestions(new Set());
      return sampleQuestions[Math.floor(Math.random() * sampleQuestions.length)];
    }
    const question = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    setUsedQuestions(prev => new Set([...prev, question.text]));
    return question;
  };

  const handleWeaponSelect = (weapon) => {
    setActiveWeapon(weapon);
    soundManager.playSound('weaponSwitch');
  };

  const handleMutationSelect = (mutation) => {
    if (xp >= mutations[mutation].cost && !activeMutations.includes(mutation)) {
      setXp(prev => prev - mutations[mutation].cost);
      setActiveMutations(prev => [...prev, mutation]);
      soundManager.playSound('mutation');
    }
  };

  const calculateDamage = (isCorrect) => {
    let damage = weapons[activeWeapon].damage;
    
    // Apply mutations
    if (activeMutations.includes('criticalThinker') && Math.random() < 0.15) {
      damage *= 2;
    }
    
    // Apply weapon effects
    if (activeWeapon === 'shield' && !isCorrect) {
      damage = Math.floor(damage * 0.5); // Shield reduces damage taken
    }
    
    if (activeMutations.includes('knowledgeShield') && !isCorrect) {
      damage = Math.floor(damage * 0.75); // Knowledge Shield reduces damage
    }
    
    return damage;
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      const damage = calculateDamage(true);
      setMonsterHP(prev => Math.max(0, prev - damage));
      soundManager.playSound('attack');
      setCorrectStreak(prev => prev + 1);
      
      if (correctStreak + 1 >= 3 && !hasMedkit) {
        setHasMedkit(true);
        soundManager.playSound('levelUp');
      }
    } else {
      const damage = calculateDamage(false);
      setPlayerHP(prev => Math.max(0, prev - damage));
      soundManager.playSound('attack');
      setCorrectStreak(0);
    }

    setQuestionsAnswered(prev => prev + 1);

    if (monsterHP <= 0) {
      handleMonsterDefeat();
    } else if (playerHP <= 0) {
      handlePlayerDefeat();
    } else {
      const timer = activeMutations.includes('quickLearner') ? 400 : 500;
      setTimeout(() => {
        setCurrentQuestion(getRandomQuestion());
      }, timer);
    }
  };

  const handleUseMedkit = () => {
    if (hasMedkit) {
      const healAmount = Math.floor(Math.random() * 40) + 30;
      setPlayerHP(prev => Math.min(100, prev + healAmount));
      setHasMedkit(false);
      soundManager.playSound('heal');
    }
  };

  const handleMonsterDefeat = () => {
    let xpGain = monster.type === 'boss' ? 100 : 50;
    
    // Apply Study Master mutation
    if (activeMutations.includes('studyMaster')) {
      xpGain = Math.floor(xpGain * 1.5);
    }
    
    const newXp = xp + xpGain;
    const newLevel = Math.floor(newXp / 100) + 1;
    
    setXp(newXp);
    setLevel(newLevel);
    setPlayerHP(100);
    soundManager.playSound('monsterDefeat');
    
    if (newLevel > level) {
      soundManager.playSound('levelUp');
    }

    if (monster.type === 'boss') {
      setGameResult(true);
      setShowGameOver(true);
    } else {
      setTimeout(spawnNewMonster, 2000);
    }
  };

  const handlePlayerDefeat = () => {
    setGameResult(false);
    setShowGameOver(true);
    soundManager.playSound('playerDefeat');
  };

  const handleGameOverClose = () => {
    setShowGameOver(false);
    setGameState('idle');
    setPlayerHP(100);
    setXp(0);
    setLevel(1);
    setHasMedkit(false);
    setCorrectStreak(0);
    soundManager.stopMusic('battleMusic');
  };

  const handleExit = () => {
    setGameState('idle');
    setPlayerHP(100);
    setXp(0);
    setLevel(1);
    setHasMedkit(false);
    setCorrectStreak(0);
    soundManager.stopMusic('battleMusic');
  };

  const renderGameState = () => {
    switch (gameState) {
      case 'idle':
        return (
          <>
            <Title variant="h2">STUDY CELLS</Title>
            <StartButton variant="contained" onClick={handleStartGame}>
              ENTER THE DUNGEON
            </StartButton>
          </>
        );
      case 'portal':
        return <PortalAnimation onComplete={handlePortalComplete} />;
      case 'battle':
        return (
          <BattleArea>
            <Weapons activeWeapon={activeWeapon} onWeaponSelect={handleWeaponSelect} />
            <Monster type={monster?.type} hp={monsterHP} maxHp={monster?.maxHp} />
            <QuestionBox
              question={currentQuestion}
              onAnswer={handleAnswer}
              isDisabled={playerHP <= 0 || monsterHP <= 0}
            />
            {hasMedkit && (
              <MedkitButton
                variant="contained"
                onClick={handleUseMedkit}
              >
                USE MEDKIT
              </MedkitButton>
            )}
            <Mutations
              activeMutations={activeMutations}
              onMutationSelect={handleMutationSelect}
              xp={xp}
            />
          </BattleArea>
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      {gameState === 'battle' && (
        <>
          <HUD
            playerHP={playerHP}
            monsterHP={monsterHP}
            playerMaxHP={100}
            monsterMaxHP={monster?.maxHp || 0}
            xp={xp}
            level={level}
          />
          <ExitButton onExit={handleExit} />
        </>
      )}
      
      {renderGameState()}
      
      <GameOverDialog open={showGameOver} onClose={handleGameOverClose}>
        <DialogTitle>
          {gameResult ? 'VICTORY!' : 'YOU DIED'}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {gameResult
              ? 'The dungeon has been conquered!'
              : 'The monsters were too strong...'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleGameOverClose} color="primary">
            TRY AGAIN
          </Button>
        </DialogActions>
      </GameOverDialog>
    </Container>
  );
};

export default StudyDungeon; 