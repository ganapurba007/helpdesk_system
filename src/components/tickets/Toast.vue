<script setup>
const props = defineProps({ show: Boolean, message: String });
</script>

<template>
  <div
    v-if="props.show"
    class="fixed bottom-6 right-6 z-50 flex items-center rounded-[1.5rem] bg-slate-900 px-5 py-3 text-sm text-white shadow-2xl shadow-slate-950/40"
  >
    <span>{{ props.message }}</span>
  </div>
</template>
