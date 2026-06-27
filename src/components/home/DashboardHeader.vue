<script setup>
const props = defineProps({
  totalTickets: { type: Number, default: 0 },
  onTrack: { type: String, default: "82%" },
  resolvedToday: { type: Number, default: 0 },
});
</script>

<template>
  <div class="space-y-6">
    <div>
      <p
        class="text-xs font-semibold uppercase tracking-[0.35em] text-teal-600 dark:text-teal-300"
      >
        Welcome back
      </p>
      <h1
        class="mt-4 text-4xl font-semibold text-slate-950 dark:text-white sm:text-5xl"
      >
        Your helpdesk overview
      </h1>
      <p
        class="mt-3 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400"
      >
        Quickly check ticket status, monitor progress, and take action on the
        latest requests.
      </p>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div
        class="rounded-3xl border border-slate-200/70 bg-slate-50 p-5 dark:border-slate-700/80 dark:bg-slate-900"
      >
        <p class="text-sm text-slate-500 dark:text-slate-400">Total tickets</p>
        <p class="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">
          {{ props.totalTickets }}
        </p>
        <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
          All tickets in the system.
        </p>
      </div>

      <div
        class="rounded-3xl bg-gradient-to-br from-teal-500 to-cyan-500 p-5 text-white shadow-lg shadow-teal-500/10"
      >
        <p class="text-sm uppercase tracking-[0.25em]">On track</p>
        <p class="mt-4 text-3xl font-semibold">{{ props.onTrack }}</p>
        <p class="mt-2 text-sm text-teal-100/90">Tickets moving smoothly.</p>
      </div>

      <div
        class="rounded-3xl border border-slate-200/70 bg-slate-50 p-5 dark:border-slate-700/80 dark:bg-slate-900"
      >
        <p class="text-sm text-slate-500 dark:text-slate-400">Resolved today</p>
        <p class="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">
          {{ props.resolvedToday }}
        </p>
        <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Fast response rate.
        </p>
      </div>
    </div>
  </div>
</template>
