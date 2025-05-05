<template>
  <div 
    class="card" 
    @click="handleCardClick" 
    :class="{
      'selectable': isSelectable,
      'selected': isSelected,
      'targetable': isTargetable,
      'player-card': owner === 'player',
      'enemy-card': owner === 'enemy',
      'draggable': isDraggable
    }"
    v-if="card"
    draggable="true"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
  >
    <div class="card-content">
      <div class="card-name">{{ card.name }}</div>
      <div class="card-type">{{ card.type }}</div>
      <div class="card-stats" v-if="card.type.toLowerCase() === 'attack'">
        <div class="attack">ATK: {{ card.attack }}</div>
      </div>
      <div class="card-stats" v-if="card.type.toLowerCase() === 'defense'">
        <div class="defense">DEF: {{ card.defense }}</div>
      </div>
    </div>
    <div v-if="owner === 'player'" class="card-tooltip">
      <div class="tooltip-content">
        <div class="tooltip-name">{{ card.name }}</div>
        <div class="tooltip-type">{{ card.type }}</div>
        <div class="tooltip-description">{{ card.description }}</div>
        <div class="tooltip-effect" v-if="card.effect">{{ card.effect }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '@/stores/game';
import { ref, computed } from 'vue';

const gameStore = useGameStore();
const selectedCard = ref(null);
const isDragging = ref(false);

const props = defineProps({
  card: Object,
  owner: String
});

const isSelectable = computed(() => {
  return props.owner === 'player' && 
         gameStore.currentTurn === 'player';
});

const isSelected = computed(() => {
  return selectedCard.value === props.card;
});

const isTargetable = computed(() => {
  return selectedCard.value && 
         props.owner === 'enemy' && 
         gameStore.currentTurn === 'player';
});

const isDraggable = computed(() => {
  return props.owner === 'player' && 
         gameStore.currentTurn === 'player' &&
         !isDragging.value;
});

const handleDragStart = (event) => {
  if (isDraggable.value) {
    isDragging.value = true;
    event.dataTransfer.setData('text/plain', JSON.stringify(props.card));
    event.dataTransfer.effectAllowed = 'move';
  } else {
    event.preventDefault();
  }
};

const handleDragEnd = () => {
  isDragging.value = false;
};

const handleCardClick = () => {
  if (props.owner === 'player' && gameStore.currentTurn === 'player') {
    if (props.card.type.toLowerCase() === 'defense') {
      gameStore.playCard(props.card.id, 'player');
    } else if (props.card.type.toLowerCase() === 'attack') {
      if (selectedCard.value === props.card) {
        selectedCard.value = null;
      } else if (selectedCard.value) {
        
        selectedCard.value = props.card;
      } else {
        
        selectedCard.value = props.card;
      }
    }
  } else if (props.owner === 'enemy' && selectedCard.value) {
    
    gameStore.playCard(selectedCard.value.id, 'player', props.card.id);
    selectedCard.value = null;
  }
};
</script>

<style scoped>
.card {
  width: 80px;
  height: 112px;
  background-color: #333;
  border: 1px solid #666;
  border-radius: 4px;
  margin: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  user-select: none;
  isolation: isolate;
}

.card-content {
  text-align: center;
  color: white;
  padding: 4px;
  width: 100%;
}

.card-name {
  font-weight: bold;
  margin-bottom: 2px;
  font-size: 0.8rem;
}

.card-type {
  font-size: 0.7rem;
  color: #aaa;
  margin-bottom: 4px;
}

.card-stats {
  display: flex;
  justify-content: center;
  gap: 4px;
  font-size: 0.9rem;
  font-weight: bold;
}

.attack {
  color: #ff4444;
}

.defense {
  color: #44ff44;
}

.selectable:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.selected {
  border-color: #ffff00;
  box-shadow: 0 0 8px rgba(255, 255, 0, 0.5);
}

.targetable {
  border-color: #ff4444;
  cursor: crosshair;
}

.targetable:hover {
  box-shadow: 0 0 8px rgba(255, 0, 0, 0.5);
}

.player-card {
  background-color: #2a3f5f;
}

.enemy-card {
  background-color: #5f2a2a;
}

.draggable {
  cursor: grab;
}

.draggable:active {
  cursor: grabbing;
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.card-tooltip {
  position: absolute;
  top: -10px;
  left: 100%;
  margin-left: 10px;
  width: 200px;
  background-color: rgba(0, 0, 0, 0.9);
  border: 1px solid #666;
  border-radius: 4px;
  padding: 8px;
  z-index: 2147483647;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
  transform: translateZ(0);
  will-change: transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.card:hover .card-tooltip {
  opacity: 1;
  transform: translateZ(0);
}

.tooltip-content {
  color: white;
  font-size: 0.8rem;
}

.tooltip-name {
  font-weight: bold;
  margin-bottom: 4px;
  color: #fff;
}

.tooltip-type {
  color: #aaa;
  margin-bottom: 8px;
  font-size: 0.7rem;
}

.tooltip-description {
  margin-bottom: 8px;
  line-height: 1.2;
}

.tooltip-effect {
  color: #ffcc00;
  font-style: italic;
  font-size: 0.7rem;
  line-height: 1.2;
}
</style>