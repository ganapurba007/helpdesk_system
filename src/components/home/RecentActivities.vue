<script setup>
const props = defineProps({
  recentActivities: { type: Array, default: () => [] },
});
</script>

<template>
  <div
    class="rounded-[2rem] border border-slate-200/70 bg-white/95 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] dark:border-slate-700/80 dark:bg-slate-950/90"
  >
    <p
      class="text-sm font-semibold uppercase tracking-[0.35em] text-teal-600 dark:text-teal-300"
    >
      Recent activities
    </p>
    <h2 class="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">
      Team updates
    </h2>
    <div class="mt-6 space-y-4">
      <div
        v-for="activity in props.recentActivities"
        :key="activity.time"
        class="rounded-3xl border border-slate-200/70 bg-slate-50 p-4 dark:border-slate-700/80 dark:bg-slate-900"
      >
        <p class="text-sm text-slate-900 dark:text-white">
          {{ activity.description }}
        </p>
        <p class="mt-2 text-xs text-slate-500 dark:text-slate-400">
          {{ activity.time }}
        </p>
      </div>
    </div>
  </div>
</template>
