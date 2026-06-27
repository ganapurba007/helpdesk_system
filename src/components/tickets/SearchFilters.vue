<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  search: String,
  statusFilter: String,
  priorityFilter: String,
  pageSize: Number,
  statuses: Array,
  priorities: Array,
});
const emit = defineEmits([
  "update:search",
  "update:statusFilter",
  "update:priorityFilter",
  "update:pageSize",
]);
</script>

<template>
  <div
    class="mb-6 rounded-[1.5rem] border border-slate-200/80 bg-white p-5 shadow-[0_15px_45px_rgba(15,23,42,0.06)] dark:border-slate-700/80 dark:bg-slate-950/95"
  >
    <div
      class="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between"
    >
      <div class="flex flex-1 flex-col gap-5 sm:flex-row sm:items-center">
        <div class="flex-1">
          <label
            class="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400"
            >Search</label
          >
          <input
            :value="props.search"
            @input="$emit('update:search', $event.target.value)"
            placeholder="Search by id, subject, or department"
            class="w-full rounded-[1.5rem] border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition duration-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-teal-400 dark:focus:ring-teal-500/20"
          />
        </div>

        <div class="grid flex-1 gap-4 sm:grid-cols-2 sm:items-end">
          <div>
            <label
              class="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400"
              >Status</label
            >
            <select
              :value="props.statusFilter"
              @change="$emit('update:statusFilter', $event.target.value)"
              class="w-full rounded-[1.5rem] border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition duration-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-teal-400 dark:focus:ring-teal-500/20"
            >
              <option v-for="s in props.statuses" :key="s">{{ s }}</option>
            </select>
          </div>

          <div>
            <label
              class="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400"
              >Priority</label
            >
            <select
              :value="props.priorityFilter"
              @change="$emit('update:priorityFilter', $event.target.value)"
              class="w-full rounded-[1.5rem] border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition duration-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-teal-400 dark:focus:ring-teal-500/20"
            >
              <option v-for="p in props.priorities" :key="p">{{ p }}</option>
            </select>
          </div>
        </div>
      </div>

      <div
        class="flex flex-col gap-3 rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4 shadow-sm dark:border-slate-700/80 dark:bg-slate-900"
      >
        <p class="text-sm font-semibold text-slate-800 dark:text-slate-100">
          {{ /* placeholder, parent shows count */ "" }}
        </p>
        <div class="flex items-center gap-3">
          <span class="text-sm text-slate-500 dark:text-slate-400"
            >Per page</span
          >
          <select
            :value="props.pageSize"
            @change="$emit('update:pageSize', Number($event.target.value))"
            class="rounded-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition duration-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-teal-400 dark:focus:ring-teal-500/20"
          >
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="20">20</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>
