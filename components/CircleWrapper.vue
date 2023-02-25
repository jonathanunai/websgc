<script lang="ts" setup>
const props = defineProps({
  points: {
    type: Number,
    default: 10,
  },
  maxLines: {
    type: String,
    default: '4',
  },
  text: {
    type: String,
    default: '10',
  },
})
const width = computed(() => {
  return props.maxLines === '3' ? 'third' : 'forth'
})
</script>
<template>
  <div class="flex flex-col" :class="width">
    <Circle :perc="points"></Circle>
    <p class="text-center">{{ text }}</p>
  </div>
</template>
<style scoped>
.forth,
.third {
  width: 50%;
}

@media (min-width: 768px) {
  .third {
    width: 33.333%;
  }
  .forth {
    width: 25%;
  }
}
</style>
