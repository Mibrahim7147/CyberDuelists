<template>
    <button class="zone">{{ owner }} Draw Pile</button>
</template>

<script setup>
defineProps({ owner: String})
</script>

<style scoped>
.zone{
    background-color: #3b3b3b;
    color: white;
    padding: 05rem 1rem;
    border: 1px solid #888;
    border-radius: 6px;
}
</style>