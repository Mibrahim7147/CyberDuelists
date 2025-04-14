<template>
    <div class="game-board">
      <div class="controls-row">
        <Graveyard owner="enemy" />
        <TurnButton owner="enemy" />
        <DrawPile owner="enemy" />
      </div>
  
      <Hand owner="enemy" />
      <Field owner="enemy" />
  
      <hr class="divider" />
  
      <Field owner="player" />
      <Hand owner="player" />
  
      <div class="controls-row">
        <Graveyard owner="player" />
        <TurnButton owner="player" />
        <DrawPile owner="player" />
      </div>

      <div class="status-bar">
        <p>Turn: {{ gameStore.turnNumber }}</p>
        <p>Stealth Points (You): {{ gameStore.stealthPoints }}</p>
        <p>System Integrity (Enemy): {{ gameStore.systemIntegrity }}</p>
    </div>

    </div>
  </template>
  
  <script setup>
  import Graveyard from './Graveyard.vue';
  import DrawPile from './DrawPile.vue';
  import TurnButton from './TurnButton.vue';
  import Hand from './Hand.vue';
  import Field from './Field.vue';
  import { useGameStore } from '@/stores/game.js'

  const gameStore = useGameStore()
  </script>
  
  <style scoped>
  .game-board {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #121212;
    padding: 1rem;
    color: white;
    min-height: 100vh;
  }
  
  .controls-row {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin: 0.5rem 0;
  }
  
  .divider {
    width: 80%;
    margin: 1rem 0;
    border-top: 2px solid #444;
  }
  </style>
  