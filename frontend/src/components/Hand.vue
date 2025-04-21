<template>
    <div class="hand">
      <div v-if="owner === 'player'">
        <div>Player Hand ({{ gameStore.playerHand.length }} cards)</div>
        <Card 
          v-for="card in gameStore.playerHand" 
          :key="card.id" 
          :card="card" 
          :owner="owner" 
        />
      </div>
      <div v-else>
        <div>Enemy Hand ({{ gameStore.enemyHand.length }} cards)</div>
        <Card 
          v-for="card in gameStore.enemyHand" 
          :key="card.id" 
          :card="card" 
          :owner="owner" 
        />
      </div>
    </div>
</template>

<script setup>
import Card from './Card.vue';
import { useGameStore } from '@/stores/game.js'

const gameStore = useGameStore()
defineProps({ owner: String })
</script>

<style scoped>
.hand {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin: 0.25rem 0;
  padding: 0.5rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  width: 100%;
  min-height: 160px;
}

.hand > div {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
}
</style>