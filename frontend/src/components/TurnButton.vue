<template>
    <button @click="gameStore.endTurn" :disabled="gameStore.currentTurn !== 'player'">
        End Turn ({{ gameStore.currentTurn }})
    </button>
</template>

<script setup>
defineProps({ owner: String})
import { useGameStore } from '@/stores/game'
</script>

<style scoped>
.turn-btn{
    padding: 0.5rem 1rem;
    background-color: skyblue;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 0.5rem;
}

.turn-indicator{
    font-weight: bold;
    color: firebrick;
    padding: 0.5rem;
}
</style>