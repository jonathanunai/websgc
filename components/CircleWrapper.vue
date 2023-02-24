<script lang="ts" setup>
const props = defineProps({
  points: {
    type: Number,
    default: 10,
  },
  text: {
    type: String,
    default: '10',
  },
})
</script>
<template>
  <div class="flex flex-col w-1/2 md:w-1/4">
    <Circle :perc="points"></Circle>
    <p class="text-center">{{ text }}</p>
  </div>
</template>
