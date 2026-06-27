<script setup>
import { RouterLink } from "vue-router";
const props = defineProps({ tickets: { type: Array, default: () => [] } });
const emit = defineEmits(["request-delete"]);
</script>

<template>
  <div>
    <div
      class="hidden sm:block overflow-hidden rounded-[1.75rem] border border-slate-200/70 dark:border-slate-700/80"
    >
      <table class="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
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
          <tr v-for="ticket in props.tickets" :key="ticket.id">
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
                >{{ ticket.status }}</span
              >
            </td>
            <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
              {{ ticket.createdAt }}
            </td>
            <td class="px-6 py-4 text-right">
              <div class="flex items-center justify-end gap-2">
                <RouterLink
                  :to="{ name: 'ticket_detail', params: { id: ticket.id } }"
                  class="inline-flex rounded-3xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-700"
                  >Detail</RouterLink
                >
                <RouterLink
                  v-if="ticket.status === 'Open'"
                  :to="{ name: 'ticket_edit', params: { id: ticket.id } }"
                  class="inline-flex rounded-3xl border border-teal-600 bg-teal-50 px-4 py-2 text-xs font-semibold text-teal-700 transition hover:bg-teal-100"
                  >Edit</RouterLink
                >
                <button
                  v-if="ticket.status === 'Open'"
                  @click="$emit('request-delete', ticket)"
                  class="inline-flex rounded-3xl border border-rose-600 bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="space-y-4 sm:hidden">
      <div
        v-for="ticket in props.tickets"
        :key="ticket.id"
        class="rounded-[1.75rem] border border-slate-200/70 bg-white p-4 shadow-sm dark:border-slate-700/80 dark:bg-slate-950"
      >
        <div class="flex items-start justify-between gap-2">
          <div>
            <p class="text-sm font-semibold text-slate-950 dark:text-white">
              {{ ticket.id }}
            </p>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {{ ticket.subject }}
            </p>
          </div>
          <div class="flex flex-wrap items-center justify-end gap-2">
            <RouterLink
              :to="{ name: 'ticket_detail', params: { id: ticket.id } }"
              class="inline-flex rounded-3xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-700"
              >Detail</RouterLink
            >
            <RouterLink
              v-if="ticket.status === 'Open'"
              :to="{ name: 'ticket_edit', params: { id: ticket.id } }"
              class="inline-flex rounded-3xl border border-teal-600 bg-teal-50 px-4 py-2 text-xs font-semibold text-teal-700 transition hover:bg-teal-100"
              >Edit</RouterLink
            >
            <button
              v-if="ticket.status === 'Open'"
              @click="$emit('request-delete', ticket)"
              class="inline-flex rounded-3xl border border-rose-600 bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
            >
              Delete
            </button>
          </div>
        </div>

        <div class="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-400">
          <div class="flex items-center justify-between gap-3">
            <span class="font-medium text-slate-900 dark:text-slate-100"
              >Department</span
            ><span>{{ ticket.department }}</span>
          </div>
          <div class="flex items-center justify-between gap-3">
            <span class="font-medium text-slate-900 dark:text-slate-100"
              >Priority</span
            ><span>{{ ticket.priority }}</span>
          </div>
          <div class="flex items-center justify-between gap-3">
            <span class="font-medium text-slate-900 dark:text-slate-100"
              >Status</span
            ><span
              class="inline-flex rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white"
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
          <div class="flex items-center justify-between gap-3">
            <span class="font-medium text-slate-900 dark:text-slate-100"
              >Created</span
            ><span>{{ ticket.createdAt }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
