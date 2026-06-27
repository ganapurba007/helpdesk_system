<script setup>
const props = defineProps({ totalPages: Number, currentPage: Number });
const emit = defineEmits(["go-to-page", "prev", "next"]);
</script>

<template>
  <div
    class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
  >
    <div class="flex flex-wrap items-center gap-2">
      <button
        @click="$emit('prev')"
        :disabled="props.currentPage === 1"
        class="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        Prev
      </button>
      <div
        class="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm dark:border-slate-700 dark:bg-slate-950"
      >
        <button
          v-for="n in props.totalPages"
          :key="n"
          @click="$emit('go-to-page', n)"
          :class="[
            'rounded-full px-4 py-2 text-sm font-semibold transition',
            n === props.currentPage
              ? 'bg-teal-600 text-white shadow-lg'
              : 'border border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800',
          ]"
        >
          {{ n }}
        </button>
      </div>
      <button
        @click="$emit('next')"
        :disabled="props.currentPage === props.totalPages"
        class="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        Next
      </button>
    </div>

    <div
      class="rounded-3xl bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm dark:bg-slate-900 dark:text-slate-300"
    >
      Page {{ props.currentPage }} of {{ props.totalPages }}
    </div>
  </div>
</template>
