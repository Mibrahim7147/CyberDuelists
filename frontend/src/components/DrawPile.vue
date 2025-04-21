<template>
    <button class="zone horizontal">{{ owner }} Draw Pile</button>
</template>

<script setup>
defineProps({ owner: String})
</script>

<style scoped>
.zone{
    background-color: #3b3b3b;
    color: white;
    padding: 0.5rem 1rem;
    border: 1px solid #888;
    border-radius: 6px;
}

.horizontal {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 120px;
}
</style>