<script lang="ts" setup>
const props = defineProps({
  perc: {
    type: Number,
    default: 10,
  },
})
const color = computed((): String => {
  return props.perc < 74 ? 'stroke-red-500' : 'stroke-lime-600'
})

const strokeDash = `${props.perc}, 100`
</script>

<template>
  <div class="single-chart justify-around">
    <svg
      viewBox="0 0 36 36"
      class="circular-chart block mx-auto my-1 max-w-80 max-h-250px"
    >
      <path
        class="circle-bg fill-none stroke-light-300 stroke-width-4"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <path
        :class="`circle fill-none ${color} stroke-width-3`"
        :stroke-dasharray="strokeDash"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <text x="18" y="20.35" class="percentage">{{ perc }}%</text>
    </svg>
  </div>
</template>
<style scoped>
.circular-chart {
  max-width: 80%;
  max-height: 100px;
}

.circle {
  stroke-linecap: round;
  animation: progress 1s ease-out forwards;
}
@keyframes progress {
  0% {
    stroke-dasharray: 0 100;
  }
}

.percentage {
  fill: #666;
  font-family: sans-serif;
  font-size: 0.5em;
  text-anchor: middle;
}
</style>
