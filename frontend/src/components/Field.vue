<template>
    <div class="field-wrapper">
      <div class="card-row">
        <Card v-for="n in 4" :key="'attack-' + n" :owner="owner" />
      </div>
  
      <div class="card-row">
        <Card v-for="n in 4" :key="'defense-' + n" :owner="owner" />
      </div>
    </div>
  </template>

<script setup>
import Card from './Card.vue';
defineProps({ owner: String })
</script>

<style scoped>
.field-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}

.card-row {
  display: flex;
  justify-content: center;
  gap: 8px;
}
</style>