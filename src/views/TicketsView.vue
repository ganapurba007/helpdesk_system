<script setup>
import { RouterLink } from "vue-router";

const tickets = [
  {
    id: "TCK-00124",
    subject: "Cannot access account",
    department: "Customer Support",
    status: "Open",
    priority: "High",
    createdAt: "Jun 25",
  },
  {
    id: "TCK-00123",
    subject: "Payment invoice issue",
    department: "Billing",
    status: "Assigned",
    priority: "Medium",
    createdAt: "Jun 24",
  },
  {
    id: "TCK-00122",
    subject: "Email notifications not received",
    department: "IT",
    status: "In Progress",
    priority: "High",
    createdAt: "Jun 23",
  },
  {
    id: "TCK-00121",
    subject: "Request for new onboarding",
    department: "HR",
    status: "Pending",
    priority: "Low",
    createdAt: "Jun 22",
  },
];
</script>

<template>
  <main class="space-y-10">
    <section
      class="rounded-[2rem] bg-white/95 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 dark:bg-slate-950/90 dark:ring-slate-700/80"
    >
      <div
        class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p
            class="text-xs font-semibold uppercase tracking-[0.35em] text-teal-600 dark:text-teal-300"
          >
            Ticket list
          </p>
          <h1
            class="mt-4 text-4xl font-semibold text-slate-950 dark:text-white sm:text-5xl"
          >
            Your tickets
          </h1>
          <p
            class="mt-3 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400"
          >
            View all current tickets and create a new request whenever you need
            help.
          </p>
        </div>
        <RouterLink
          :to="{ name: 'ticket_create' }"
          class="inline-flex items-center justify-center rounded-3xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-500"
          >Create ticket</RouterLink
        >
      </div>
    </section>

    <section
      class="rounded-[2rem] border border-slate-200/70 bg-white/95 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)] dark:border-slate-700/80 dark:bg-slate-950/90"
    >
      <div
        class="overflow-hidden rounded-[1.75rem] border border-slate-200/70 dark:border-slate-700/80"
      >
        <table
          class="min-w-full divide-y divide-slate-200 dark:divide-slate-700"
        >
          <thead class="bg-slate-50 dark:bg-slate-900">
            <tr>
              <th
                class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400"
              >
                Ticket
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400"
              >
                Department
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400"
              >
                Priority
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400"
              >
                Status
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400"
              >
                Created
              </th>
              <th class="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody
            class="divide-y divide-slate-200 bg-white dark:divide-slate-700 dark:bg-slate-950"
          >
            <tr v-for="ticket in tickets" :key="ticket.id">
              <td
                class="whitespace-nowrap px-6 py-4 text-sm font-semibold text-slate-950 dark:text-white"
              >
                {{ ticket.id }}
              </td>
              <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                {{ ticket.department }}
              </td>
              <td
                class="px-6 py-4 text-sm font-medium text-slate-900 dark:text-slate-200"
              >
                {{ ticket.priority }}
              </td>
              <td class="px-6 py-4 text-sm">
                <span
                  class="inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white"
                  :class="{
                    'bg-teal-600': ticket.status === 'Open',
                    'bg-cyan-600': ticket.status === 'Assigned',
                    'bg-blue-600': ticket.status === 'In Progress',
                    'bg-violet-600': ticket.status === 'Pending',
                    'bg-emerald-600': ticket.status === 'Resolved',
                    'bg-slate-600': ticket.status === 'Closed',
                  }"
                >
                  {{ ticket.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                {{ ticket.createdAt }}
              </td>
              <td class="px-6 py-4 text-right">
                <RouterLink
                  :to="{ name: 'ticket_detail', params: { id: ticket.id } }"
                  class="inline-flex rounded-3xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-700"
                  >Detail</RouterLink
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </main>
</template>
