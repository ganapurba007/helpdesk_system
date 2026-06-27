<script setup>
const props = defineProps({
  ticketStats: { type: Array, default: () => [] },
});
</script>

<template>
  <div
    class="rounded-[2rem] border border-slate-200/70 bg-teal-500/5 p-6 dark:border-slate-700/80 dark:bg-teal-500/10"
  >
    <p
      class="text-sm font-semibold uppercase tracking-[0.3em] text-teal-600 dark:text-teal-300"
    >
      Workflow
    </p>
    <div class="mt-6 space-y-4">
      <div
        v-for="(stat, index) in props.ticketStats"
        :key="stat.label"
        class="flex items-start gap-4 rounded-3xl border border-slate-200/75 bg-white p-4 shadow-sm dark:border-slate-700/80 dark:bg-slate-950"
      >
        <div
          class="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br text-white"
          :class="stat.color"
        >
          {{ index + 1 }}
        </div>
        <div class="flex-1">
          <div class="flex flex-wrap items-center gap-2">
            <h3 class="text-sm font-semibold text-slate-950 dark:text-white">
              {{ stat.label }}
            </h3>
            <span
              class="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600 dark:bg-slate-800 dark:text-slate-300"
              >{{ stat.status }}</span
            >
          </div>
          <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {{ stat.value }} tickets
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
