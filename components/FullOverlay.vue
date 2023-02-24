<template>
  <div
    class="fixed bg-dark-500 opacity-90 z-50 top-0 left-0 w-screen h-screen flex flex-col items-center justify-center overflow-scroll overscroll-none scrollbar-hide"
  >
    <div class="p-6">
      <slot />
    </div>
  </div>
</template>
<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* For IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
