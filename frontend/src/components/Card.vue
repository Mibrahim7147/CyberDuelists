<template>
  <div class="card">
      {{ owner === 'player' ? 'Your Card' : 'Enemy Card' }}
  </div>

  <div class="card" @click="handlePlay" v-if="card">
      <p>{{ card.name }}</p>
      <p>{{ card.type }}</p>
      <p>{{ card.value }}</p>
  </div>
</template>

<script setup>
    import { useGameStore } from '@/stores/game';
    const gameStore = useGameStore()

    const props = defineProps({
        card: Object,
        owner: String, })


const handlePlay = () => {
 
  if (props.owner === 'player' && gameStore.currentTurn === 'player') {
    gameStore.playCard(props.card.id, 'player')
  }
}

</script>

<style scoped>
.card{
    width: 80px;
  height: 120px;
  background-color: #222;
  border: 2px solid #888;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  border-radius: 8px;
}


</style>