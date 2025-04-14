<template>
    <div class="hand">
      <Card v-for="n in 5" :key="n" :owner="owner" />

      <Card v-for="card in gameStore.playerHand" :key="card.id" :card="card" owner="player" />
      <Card v-for="card in gameStore.enemyHand" :key="card.id" :card="card" owner="enemy" />

    </div>
  </template>

<script setup>
import Card from './Card.vue';
defineProps({ owner: String })
</script>

<style scoped>
.hand{
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin: 0.5rem 0;
}
</style>