<template>
  <div class="start-screen" v-if="!gameStarted">
    <div class="title">Cyber Duelists</div>
    <div class="subtitle">A Strategic Card Game</div>
    <button class="start-button" @click="startGame">Start Game</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useGameStore } from '@/stores/game';

const gameStore = useGameStore();
const gameStarted = ref(false);

const startGame = async () => {
  await gameStore.fetchCards();
  gameStarted.value = true;
};
</script>

<style scoped>
.start-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #121212;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  z-index: 1000;
}

.title {
  font-size: 3rem;
  font-weight: bold;
  color: #0f0;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
}

.subtitle {
  font-size: 1.5rem;
  color: #aaa;
}

.start-button {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: #0f0;
  color: #000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.start-button:hover {
  background-color: #00ff00;
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
}
</style> 