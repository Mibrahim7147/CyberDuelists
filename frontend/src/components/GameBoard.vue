<template>
    <div class="game-board">
      <div class="health-display">
        <div class="health-bar enemy">
          <div class="health-label">System Integrity</div>
          <div class="health-value">{{ gameStore.systemIntegrity }}</div>
          <div class="turn-indicator enemy" :class="{ 'enemy-turn': gameStore.currentTurn === 'enemy' }">
            {{ gameStore.currentTurn === 'enemy' ? 'Enemy Turn' : '' }}
          </div>
        </div>
        <div class="turn-info">
          <TurnNumber />
        </div>
        <div class="health-bar player">
          <div class="health-label">Stealth Points</div>
          <div class="health-value">{{ gameStore.stealthPoints }}</div>
          <div class="turn-indicator player" :class="{ 'player-turn': gameStore.currentTurn === 'player' }">
            {{ gameStore.currentTurn === 'player' ? 'Your Turn' : '' }}
          </div>
          <TurnButton owner="player" />
        </div>
      </div>
  
      <div class="game-area">
        <div class="enemy-area">
          <Hand owner="enemy" />
        </div>
        
        <div class="battlefield">
          <Field owner="enemy" />
          <div class="turn-info">
            <TurnNumber />
          </div>
          <Field owner="player" />
        </div>

        <div class="player-area">
          <Hand owner="player" />
          <div class="player-controls">
            <div class="player-left">
              <Graveyard owner="player" />
            </div>
            <div class="player-right">
              <DrawPile owner="player" />
              <div class="health-bar player">
                <div class="health-label">Stealth Points</div>
                <div class="health-value">{{ gameStore.stealthPoints }}</div>
              </div>
            </div>
          </div>
        </div>
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
  import TurnNumber from './TurnNumber.vue'
  import Card from './Card.vue'
  import { onMounted } from 'vue'

  const gameStore = useGameStore()

  onMounted(async () => {
    await gameStore.fetchCards()
  })
  </script>
  
  <style scoped>
  .game-board {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #121212;
    padding: 0.25rem;
    color: white;
    height: 100vh;
    overflow: hidden;
  }
  
  .health-display {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0.25rem;
    margin-bottom: 0.25rem;
  }
  
  .turn-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    width: 100%;
    max-width: 150px;
    margin: 0.25rem 0;
  }
  
  .health-bar {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    min-width: 80px;
    gap: 0.25rem;
  }
  
  .health-bar.enemy {
    background-color: rgba(255, 0, 0, 0.2);
    border: 1px solid #ff4444;
  }
  
  .health-bar.player {
    background-color: rgba(0, 255, 0, 0.2);
    border: 1px solid #44ff44;
  }
  
  .health-label {
    font-size: 0.7rem;
    margin-bottom: 0.25rem;
    color: #aaa;
  }
  
  .health-value {
    font-size: 1rem;
    font-weight: bold;
  }
  
  .game-area {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    padding: 0.25rem;
    height: calc(100vh - 100px);
    overflow: hidden;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .enemy-area, .player-area {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    min-height: 60px;
    width: 100%;
  }

  .battlefield {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.1rem;
    min-height: 120px;
    width: 100%;
    margin: 0.1rem 0;
  }

  .horizontal-controls {
    display: flex;
    gap: 0.25rem;
    align-items: center;
    justify-content: center;
    padding: 0.25rem;
    width: 100%;
    margin: 0.25rem 0;
  }

  .turn-indicator {
    background-color: rgba(255, 255, 255, 0.1);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-weight: bold;
    transition: all 0.3s ease;
    font-size: 0.8rem;
  }
  
  .player-turn {
    background-color: rgba(0, 255, 0, 0.2);
    color: #0f0;
  }
  
  .enemy-turn {
    background-color: rgba(255, 0, 0, 0.2);
    color: #f00;
  }

  .player-area {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    min-height: 60px;
    width: 100%;
  }

  .player-controls {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
    padding: 0.25rem;
  }

  .player-left {
    display: flex;
    align-items: flex-end;
  }

  .player-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.25rem;
  }

  .health-bar.player {
    margin-top: 0.25rem;
  }

  .enemy-header, .player-header {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 0.5rem;
  }

  .enemy-header {
    justify-content: flex-start;
  }

  .player-header {
    justify-content: flex-end;
  }

  .turn-indicator {
    background-color: rgba(255, 255, 255, 0.1);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-weight: bold;
    transition: all 0.3s ease;
    font-size: 0.8rem;
    min-width: 100px;
    text-align: center;
  }
  
  .player-turn {
    background-color: rgba(0, 255, 0, 0.2);
    color: #0f0;
  }
  
  .enemy-turn {
    background-color: rgba(255, 0, 0, 0.2);
    color: #f00;
  }
  </style>
  