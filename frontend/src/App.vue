<template>
  <GameBoard />
</template>


<script setup>
import GameBoard from './components/GameBoard.vue'
import { useGameStore } from './stores/game.js'
import { onMounted } from 'vue'

const gameStore = useGameStore()

onMounted(async () => {
  await gameStore.fetchCards()
})
</script>

<style scoped>

</style>