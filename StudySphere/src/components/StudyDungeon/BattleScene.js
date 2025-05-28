import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/material/styles';
import Player from './Player';
import Monster from './Monster';

const BattleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(4),
  padding: theme.spacing(4),
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
}));

const BattleArea = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  maxWidth: '1200px',
  padding: theme.spacing(4),
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: theme.spacing(2),
  backdropFilter: 'blur(10px)',
}));

const ActionButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginTop: theme.spacing(4),
}));

const BattleMessage = styled(motion.div)(({ theme }) => ({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: 'rgba(0, 0, 0, 0.8)',
  color: '#fff',
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  zIndex: 1000,
}));

const BattleScene = ({ onBattleEnd }) => {
  const [player, setPlayer] = useState({
    name: 'Student',
    hp: 100,
    maxHp: 100,
    xp: 0,
    level: 1,
  });

  const [monster, setMonster] = useState({
    type: 'starter',
    hp: 50,
    maxHp: 50,
  });

  const [battleMessage, setBattleMessage] = useState('');
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  const handleAttack = () => {
    if (!isPlayerTurn) return;

    const damage = Math.floor(Math.random() * 20) + 10;
    const newMonsterHp = Math.max(0, monster.hp - damage);
    
    setMonster(prev => ({ ...prev, hp: newMonsterHp }));
    setBattleMessage(`You dealt ${damage} damage!`);
    setIsPlayerTurn(false);

    if (newMonsterHp <= 0) {
      handleMonsterDefeat();
    } else {
      setTimeout(handleMonsterAttack, 1500);
    }
  };

  const handleMonsterAttack = () => {
    const damage = Math.floor(Math.random() * 15) + 5;
    const newPlayerHp = Math.max(0, player.hp - damage);
    
    setPlayer(prev => ({ ...prev, hp: newPlayerHp }));
    setBattleMessage(`Monster dealt ${damage} damage!`);
    setIsPlayerTurn(true);

    if (newPlayerHp <= 0) {
      handlePlayerDefeat();
    }
  };

  const handleMonsterDefeat = () => {
    const xpGain = monster.type === 'boss' ? 100 : 50;
    const newXp = player.xp + xpGain;
    const newLevel = Math.floor(newXp / 100) + 1;
    
    setPlayer(prev => ({
      ...prev,
      xp: newXp,
      level: newLevel,
      hp: prev.maxHp,
    }));

    setBattleMessage(`Monster defeated! Gained ${xpGain} XP!`);
    setTimeout(() => {
      if (monster.type === 'boss') {
        onBattleEnd(true);
      } else {
        spawnNewMonster();
      }
    }, 2000);
  };

  const handlePlayerDefeat = () => {
    setBattleMessage('Game Over!');
    setTimeout(() => {
      onBattleEnd(false);
    }, 2000);
  };

  const spawnNewMonster = () => {
    const isBoss = Math.random() < 0.2;
    setMonster({
      type: isBoss ? 'boss' : 'starter',
      hp: isBoss ? 100 : 50,
      maxHp: isBoss ? 100 : 50,
    });
    setBattleMessage(isBoss ? 'A boss monster appears!' : 'A new monster appears!');
  };

  useEffect(() => {
    spawnNewMonster();
  }, []);

  return (
    <BattleContainer>
      <BattleArea>
        <Player {...player} />
        <Monster {...monster} />
      </BattleArea>

      <ActionButtons>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAttack}
          disabled={!isPlayerTurn}
        >
          Attack
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setPlayer(prev => ({
              ...prev,
              hp: Math.min(prev.maxHp, prev.hp + 30),
            }));
            setIsPlayerTurn(false);
            setTimeout(handleMonsterAttack, 1000);
          }}
          disabled={!isPlayerTurn}
        >
          Heal
        </Button>
      </ActionButtons>

      <AnimatePresence>
        {battleMessage && (
          <BattleMessage
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Typography variant="h6">{battleMessage}</Typography>
          </BattleMessage>
        )}
      </AnimatePresence>
    </BattleContainer>
  );
};

export default BattleScene; 