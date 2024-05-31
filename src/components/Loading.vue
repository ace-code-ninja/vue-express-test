<script setup lang="ts">
    withDefaults(defineProps<{isLoading: boolean}>(), {
        isLoading: true,
    });
</script>

<template>
    <div v-if="isLoading" class="spin">
        <NSpin />
    </div>
</template>

<style scoped>
    .spin {
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }   
</style>