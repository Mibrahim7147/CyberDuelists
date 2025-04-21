<template>
  <div class="turn-number">
    <div class="turn-label">Turn</div>
    <div class="turn-value">{{ gameStore.turnNumber }}</div>
  </div>
</template>

<script setup>
import { useGameStore } from '@/stores/game.js'

const gameStore = useGameStore()
</script>

<style scoped>
.turn-number {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  min-width: 80px;
}

.turn-label {
  font-size: 0.9rem;
  color: #aaa;
  margin-bottom: 0.25rem;
}

.turn-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
}
</style> 