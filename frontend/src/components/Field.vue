<template>
  <div class="field" :class="owner">
    <div class="grid-container">
      <div 
        v-for="(slot, index) in 8" 
        :key="index"
        class="grid-slot"
        :class="{ 'occupied': isSlotOccupied(index) }"
        @dragover.prevent
        @drop="handleDrop($event, index)"
      >
        <Card 
          v-if="isSlotOccupied(index)"
          :card="getCardInSlot(index)"
          :owner="owner"
          draggable="true"
          @dragstart="handleDragStart($event, getCardInSlot(index))"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '@/stores/game';
import Card from './Card.vue';
import { computed } from 'vue';

const gameStore = useGameStore();
const props = defineProps({
  owner: String
});

const fieldCards = computed(() => {
  return props.owner === 'player' ? gameStore.playerField : gameStore.enemyField;
});

const isSlotOccupied = (index) => {
  return index < fieldCards.value.length;
};

const getCardInSlot = (index) => {
  return fieldCards.value[index];
};

const handleDragStart = (event, card) => {
  if (props.owner === 'player' && gameStore.currentTurn === 'player') {
    event.dataTransfer.setData('text/plain', JSON.stringify(card));
  } else {
    event.preventDefault();
  }
};

const handleDrop = (event, slotIndex) => {
  if (props.owner === 'player' && gameStore.currentTurn === 'player') {
    const cardData = JSON.parse(event.dataTransfer.getData('text/plain'));
    const card = gameStore.playerHand.find(c => c.id === cardData.id);
    
    if (card && slotIndex < 8) {
      gameStore.playCard(card.id, 'player');
    }
  }
};
</script>

<style scoped>
.field {
  width: 100%;
  min-height: 60px;
  padding: 0.25rem;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  margin: 0.25rem 0;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 0.25rem;
  width: 100%;
  height: 100%;
  min-height: 0;
  min-width: 0;
  max-width: 400px;
  margin: 0 auto;
}

.grid-slot {
  aspect-ratio: 0.7;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px dashed rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  min-height: 0;
  min-width: 0;
  padding: 0;
  width: 80px;
  height: 112px;
}

.grid-slot:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

.grid-slot.occupied {
  border: none;
  background-color: transparent;
  padding: 0;
}

.field.player {
  border: 1px solid rgba(0, 255, 0, 0.2);
}

.field.enemy {
  border: 1px solid rgba(255, 0, 0, 0.2);
}
</style>