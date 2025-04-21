<template>
  <button class="turn-button" @click="gameStore.endTurn">
    End Turn
  </button>
</template>

<script setup>
import { useGameStore } from '@/stores/game.js'

const gameStore = useGameStore()
</script>

<style scoped>
.turn-button {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #4CAF50;
  color: white;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.turn-button:hover {
  background-color: #45a049;
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.turn-button:active {
  transform: scale(0.95);
}
</style>