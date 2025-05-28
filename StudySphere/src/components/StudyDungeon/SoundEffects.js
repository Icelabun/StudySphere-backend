import React, { useEffect, useRef } from 'react';

class SoundManager {
  constructor() {
    this.sounds = {};
    this.musicVolume = 0.5;
    this.effectsVolume = 0.7;
    this.isMuted = false;
  }

  loadSound(name, url) {
    const audio = new Audio(url);
    audio.preload = 'auto';
    this.sounds[name] = audio;
  }

  playSound(name) {
    if (this.isMuted) return;
    
    const sound = this.sounds[name];
    if (sound) {
      sound.volume = this.effectsVolume;
      sound.currentTime = 0;
      sound.play().catch(error => console.log('Error playing sound:', error));
    }
  }

  playMusic(name, loop = true) {
    if (this.isMuted) return;
    
    const music = this.sounds[name];
    if (music) {
      music.volume = this.musicVolume;
      music.loop = loop;
      music.play().catch(error => console.log('Error playing music:', error));
    }
  }

  stopMusic(name) {
    const music = this.sounds[name];
    if (music) {
      music.pause();
      music.currentTime = 0;
    }
  }

  setVolume(type, value) {
    if (type === 'music') {
      this.musicVolume = value;
    } else {
      this.effectsVolume = value;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      Object.values(this.sounds).forEach(sound => {
        sound.pause();
      });
    }
  }
}

const soundManager = new SoundManager();

// Load all game sounds
const loadGameSounds = () => {
  soundManager.loadSound('attack', '/sounds/attack.mp3');
  soundManager.loadSound('heal', '/sounds/heal.mp3');
  soundManager.loadSound('monsterDefeat', '/sounds/monster-defeat.mp3');
  soundManager.loadSound('playerDefeat', '/sounds/player-defeat.mp3');
  soundManager.loadSound('levelUp', '/sounds/level-up.mp3');
  soundManager.loadSound('specialAbility', '/sounds/special-ability.mp3');
  soundManager.loadSound('battleMusic', '/sounds/battle-music.mp3');
  soundManager.loadSound('portal', '/sounds/portal.mp3');
};

const SoundEffects = () => {
  useEffect(() => {
    loadGameSounds();
  }, []);

  return null;
};

export { soundManager };
export default SoundEffects; 