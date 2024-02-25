<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1 class="mt-2">{{ msg }}</h1>

  <div class="mt-4">
    <button class="border-2 border-cyan-300 rounded-lg" type="button" @click="count++">count is {{ count }}</button>
  </div>
</template>

<style scoped></style>
