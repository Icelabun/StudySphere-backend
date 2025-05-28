import React, { useState } from 'react';
import { motion } from 'framer-motion';

const StudyDungeon = () => {
  const [currentFloor, setCurrentFloor] = useState(1);
  const [userLevel, setUserLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [isInDungeon, setIsInDungeon] = useState(false);

  const floors = [
    { level: 1, name: "E-Rank Study Zone", difficulty: "Easy", xpReward: 100 },
    { level: 2, name: "D-Rank Study Zone", difficulty: "Medium", xpReward: 200 },
    { level: 3, name: "C-Rank Study Zone", difficulty: "Hard", xpReward: 300 },
    { level: 4, name: "B-Rank Study Zone", difficulty: "Expert", xpReward: 400 },
    { level: 5, name: "A-Rank Study Zone", difficulty: "Master", xpReward: 500 },
  ];

  const enterDungeon = (floorLevel) => {
    if (userLevel >= floorLevel) {
      setIsInDungeon(true);
      setCurrentFloor(floorLevel);
    } else {
      alert("You need to be at least level " + floorLevel + " to enter this dungeon!");
    }
  };

  const completeTask = () => {
    const currentFloorData = floors.find(f => f.level === currentFloor);
    setExperience(prev => prev + currentFloorData.xpReward);
    
    // Level up logic
    if (experience >= userLevel * 1000) {
      setUserLevel(prev => prev + 1);
      setExperience(0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Study Dungeon</h1>
        
        {/* User Stats */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Hunter Status</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p>Level: {userLevel}</p>
              <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${(experience / (userLevel * 1000)) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-400">XP: {experience}/{userLevel * 1000}</p>
            </div>
            <div>
              <p>Current Floor: {currentFloor}</p>
              <p>Status: {isInDungeon ? "In Dungeon" : "Outside"}</p>
            </div>
          </div>
        </div>

        {/* Dungeon Floors */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {floors.map((floor) => (
            <motion.div
              key={floor.level}
              className="bg-gray-800 p-6 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              onClick={() => enterDungeon(floor.level)}
            >
              <h3 className="text-xl font-semibold mb-2">{floor.name}</h3>
              <p className="text-gray-400">Difficulty: {floor.difficulty}</p>
              <p className="text-blue-400">XP Reward: {floor.xpReward}</p>
              <p className="text-sm text-gray-500 mt-2">
                Required Level: {floor.level}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Dungeon Interface */}
        {isInDungeon && (
          <div className="mt-8 bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">
              {floors.find(f => f.level === currentFloor).name}
            </h2>
            <div className="space-y-4">
              <p>Complete study tasks to earn XP and progress!</p>
              <button
                onClick={completeTask}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Complete Task
              </button>
              <button
                onClick={() => setIsInDungeon(false)}
                className="ml-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Exit Dungeon
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyDungeon; 