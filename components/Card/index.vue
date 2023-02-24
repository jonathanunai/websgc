<script lang="ts" setup>
import { url } from 'inspector'

defineProps({
  img: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
})
</script>

<template>
  <div
    class="card duration-300 transition-colors w-full relative rounded overflow-hidden bg-white dark:bg-slate-900 border border-gray-900/10 dark:border-gray-50/[0.2]"
  >
    <div
      v-if="img"
      class="img-bg"
      :style="{ 'background-image': `url(https://www.lasgc.com${img})` }"
    >
      <h2
        class="text-3xl md:text-5xl text-shadow-lg font-extrabold text-white p-3"
      >
        {{ title }}
      </h2>
    </div>
    <slot />
  </div>
</template>
<style lang="scss">
.img-bg {
  background-position: center;
  background-size: cover;
  width: 100%;
  padding-top: 30%;
  h2 {
  }
}
</style>
