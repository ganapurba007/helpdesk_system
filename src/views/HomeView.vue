<script setup>
const ticketStats = [
  {
    label: "Open",
    value: 24,
    status: "New",
    color: "from-teal-500 to-cyan-500",
  },
  {
    label: "Assigned",
    value: 18,
    status: "Waiting response",
    color: "from-cyan-500 to-blue-500",
  },
  {
    label: "In Progress",
    value: 12,
    status: "Being worked",
    color: "from-blue-500 to-violet-500",
  },
  {
    label: "Pending",
    value: 9,
    status: "Waiting approval",
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    label: "Resolved",
    value: 34,
    status: "Awaiting review",
    color: "from-emerald-500 to-lime-500",
  },
  {
    label: "Closed",
    value: 53,
    status: "Done",
    color: "from-slate-500 to-slate-700",
  },
];

const totalTickets = 150;

const recentTickets = [
  {
    id: "TCK-00124",
    subject: "Cannot access account",
    status: "Open",
    date: "Jun 25",
  },
  {
    id: "TCK-00123",
    subject: "Payment invoice issue",
    status: "Assigned",
    date: "Jun 24",
  },
  {
    id: "TCK-00122",
    subject: "Email notifications not received",
    status: "In Progress",
    date: "Jun 23",
  },
  {
    id: "TCK-00121",
    subject: "Request for new onboarding",
    status: "Pending",
    date: "Jun 22",
  },
];

const recentActivities = [
  {
    time: "10 min ago",
    description: "Agent Sarah assigned ticket TCK-00124 to Support Team.",
  },
  {
    time: "1 hour ago",
    description: "Ticket TCK-00122 updated to In Progress.",
  },
  { time: "3 hours ago", description: "Customer replied to ticket TCK-00123." },
  { time: "Yesterday", description: "Ticket TCK-00119 closed successfully." },
];
</script>

<template>
  <main class="space-y-10">
    <section
      class="rounded-[2rem] bg-white/95 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 dark:bg-slate-950/90 dark:ring-slate-700/80"
    >
      <div class="grid gap-8 xl:grid-cols-[1.6fr_0.8fr]">
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
              Quickly check ticket status, monitor progress, and take action on
              the latest requests.
            </p>
          </div>

          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div
              class="rounded-3xl border border-slate-200/70 bg-slate-50 p-5 dark:border-slate-700/80 dark:bg-slate-900"
            >
              <p class="text-sm text-slate-500 dark:text-slate-400">
                Total tickets
              </p>
              <p
                class="mt-4 text-3xl font-semibold text-slate-950 dark:text-white"
              >
                {{ totalTickets }}
              </p>
              <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
                All tickets in the system.
              </p>
            </div>
            <div
              class="rounded-3xl bg-gradient-to-br from-teal-500 to-cyan-500 p-5 text-white shadow-lg shadow-teal-500/10"
            >
              <p class="text-sm uppercase tracking-[0.25em]">On track</p>
              <p class="mt-4 text-3xl font-semibold">82%</p>
              <p class="mt-2 text-sm text-teal-100/90">
                Tickets moving smoothly.
              </p>
            </div>
            <div
              class="rounded-3xl border border-slate-200/70 bg-slate-50 p-5 dark:border-slate-700/80 dark:bg-slate-900"
            >
              <p class="text-sm text-slate-500 dark:text-slate-400">
                Resolved today
              </p>
              <p
                class="mt-4 text-3xl font-semibold text-slate-950 dark:text-white"
              >
                14
              </p>
              <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Fast response rate.
              </p>
            </div>
          </div>
        </div>

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
              v-for="(stat, index) in ticketStats"
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
                  <h3
                    class="text-sm font-semibold text-slate-950 dark:text-white"
                  >
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
      </div>
    </section>

    <section class="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
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
            <h2
              class="mt-3 text-2xl font-semibold text-slate-950 dark:text-white"
            >
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
            v-for="ticket in recentTickets"
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

      <div class="space-y-6">
        <div
          class="rounded-[2rem] border border-slate-200/70 bg-white/95 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] dark:border-slate-700/80 dark:bg-slate-950/90"
        >
          <p
            class="text-sm font-semibold uppercase tracking-[0.35em] text-teal-600 dark:text-teal-300"
          >
            Recent activities
          </p>
          <h2
            class="mt-3 text-2xl font-semibold text-slate-950 dark:text-white"
          >
            Team updates
          </h2>
          <div class="mt-6 space-y-4">
            <div
              v-for="activity in recentActivities"
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
      </div>
    </section>
  </main>
</template>

<style scoped></style>
