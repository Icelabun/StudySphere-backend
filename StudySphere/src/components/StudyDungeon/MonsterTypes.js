const monsterTypes = {
  starter: {
    name: 'Starter Monster',
    hp: 50,
    maxHp: 50,
    damage: { min: 5, max: 15 },
    xpReward: 50,
    abilities: [
      {
        name: 'Basic Attack',
        description: 'A simple attack',
        damage: { min: 5, max: 15 },
      },
    ],
  },
  boss: {
    name: 'Boss Monster',
    hp: 100,
    maxHp: 100,
    damage: { min: 10, max: 25 },
    xpReward: 100,
    abilities: [
      {
        name: 'Heavy Strike',
        description: 'A powerful attack that deals 1.5x damage',
        damage: { min: 15, max: 30 },
        cooldown: 3,
      },
      {
        name: 'Defensive Stance',
        description: 'Reduces incoming damage by 50% for one turn',
        cooldown: 4,
      },
    ],
  },
  elite: {
    name: 'Elite Monster',
    hp: 75,
    maxHp: 75,
    damage: { min: 8, max: 20 },
    xpReward: 75,
    abilities: [
      {
        name: 'Quick Strike',
        description: 'Attacks twice in one turn',
        damage: { min: 4, max: 10 },
        cooldown: 2,
      },
      {
        name: 'Poison Attack',
        description: 'Deals damage over time',
        damage: { min: 3, max: 8 },
        cooldown: 3,
      },
    ],
  },
};

export const getRandomMonster = (playerLevel) => {
  const monsterPool = ['starter'];
  
  if (playerLevel >= 2) {
    monsterPool.push('elite');
  }
  
  if (playerLevel >= 3) {
    monsterPool.push('boss');
  }

  const randomType = monsterPool[Math.floor(Math.random() * monsterPool.length)];
  return {
    ...monsterTypes[randomType],
    type: randomType,
  };
};

export default monsterTypes; 