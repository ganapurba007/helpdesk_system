<script setup>
const props = defineProps({ show: Boolean, target: Object });
const emit = defineEmits(["confirm", "cancel"]);
</script>

<template>
  <div
    v-if="props.show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-6"
  >
    <div
      class="w-full max-w-lg rounded-[2rem] bg-white p-6 shadow-2xl dark:bg-slate-900"
    >
      <div class="flex items-center gap-4">
        <div
          class="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="h-6 w-6"
          >
            <path
              d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm1.5 14.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM11 7h2v6h-2V7z"
            />
          </svg>
        </div>
        <div>
          <p class="text-lg font-semibold text-slate-950 dark:text-white">
            Delete ticket?
          </p>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Are you sure you want to delete
            <span class="font-semibold text-slate-900 dark:text-white">{{
              props.target?.id
            }}</span
            >? This action cannot be undone.
          </p>
        </div>
      </div>

      <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          @click="$emit('cancel')"
          class="rounded-3xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
        >
          Cancel
        </button>
        <button
          @click="$emit('confirm')"
          class="rounded-3xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-500"
        >
          Delete ticket
        </button>
      </div>
    </div>
  </div>
</template>
