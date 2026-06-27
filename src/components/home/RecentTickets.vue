<script setup>
const props = defineProps({
  recentTickets: { type: Array, default: () => [] },
});
</script>

<template>
  <div
    class="rounded-[2rem] border border-slate-200/70 bg-white/95 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] dark:border-slate-700/80 dark:bg-slate-950/90"
  >
    <div
      class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
    >
      <div>
        <p
          class="text-sm font-semibold uppercase tracking-[0.35em] text-teal-600 dark:text-teal-300"
        >
          Recent tickets
        </p>
        <h2 class="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">
          What needs attention
        </h2>
      </div>
      <button
        class="rounded-2xl border border-slate-300/80 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 dark:border-slate-700/80 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
      >
        View all tickets
      </button>
    </div>

    <div class="mt-6 space-y-4">
      <article
        v-for="ticket in props.recentTickets"
        :key="ticket.id"
        class="rounded-[1.75rem] border border-slate-200/70 bg-slate-50 p-5 shadow-sm transition hover:border-teal-500/70 hover:bg-white dark:border-slate-700/80 dark:bg-slate-900 dark:hover:border-teal-400/70 dark:hover:bg-slate-950"
      >
        <div
          class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p class="text-sm font-semibold text-slate-950 dark:text-white">
              {{ ticket.subject }}
            </p>
            <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {{ ticket.id }} • {{ ticket.date }}
            </p>
          </div>
          <span
            class="rounded-full px-3 py-1 text-xs font-semibold text-white"
            :class="{
              'bg-teal-600': ticket.status === 'Open',
              'bg-cyan-600': ticket.status === 'Assigned',
              'bg-blue-600': ticket.status === 'In Progress',
              'bg-violet-600': ticket.status === 'Pending',
              'bg-emerald-600': ticket.status === 'Resolved',
              'bg-slate-600': ticket.status === 'Closed',
            }"
            >{{ ticket.status }}</span
          >
        </div>
      </article>
    </div>
  </div>
</template>
