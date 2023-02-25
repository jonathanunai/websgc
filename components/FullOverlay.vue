<template>
  <div
    class="block fixed bg-dark-500 z-50 top-0 left-0 w-screen h-screen overflow-scroll overscroll-none scrollbar-hide"
  >
    <div class="p-6 flex flex-col items-center justify-center">
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
