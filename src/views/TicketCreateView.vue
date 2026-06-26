<script setup>
import { ref } from "vue";

const subject = ref("");
const department = ref("");
const description = ref("");
const priority = ref("Medium");

function submitTicket(event) {
  event.preventDefault();
  console.log("New ticket created:", {
    subject: subject.value,
    department: department.value,
    description: description.value,
    priority: priority.value,
  });
}
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
            Create ticket
          </p>
          <h1
            class="mt-4 text-4xl font-semibold text-slate-950 dark:text-white sm:text-5xl"
          >
            Submit a new request
          </h1>
          <p
            class="mt-3 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400"
          >
            Fill in the ticket details and our team will respond as soon as
            possible.
          </p>
        </div>
        <RouterLink
          :to="{ name: 'tickets' }"
          class="inline-flex items-center justify-center rounded-3xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 dark:border-slate-700/80 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          >Back to tickets</RouterLink
        >
      </div>
    </section>

    <section
      class="rounded-[2rem] border border-slate-200/70 bg-white/95 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)] dark:border-slate-700/80 dark:bg-slate-950/90"
    >
      <form @submit="submitTicket" class="space-y-6">
        <div class="grid gap-6 sm:grid-cols-2">
          <div>
            <label
              for="subject"
              class="block text-sm font-medium text-slate-700 dark:text-slate-200"
              >Ticket subject</label
            >
            <input
              id="subject"
              type="text"
              v-model="subject"
              placeholder="Example: Cannot login to portal"
              class="mt-3 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-teal-400 dark:focus:ring-teal-500/20"
              required
            />
          </div>

          <div>
            <label
              for="department"
              class="block text-sm font-medium text-slate-700 dark:text-slate-200"
              >Department</label
            >
            <input
              id="department"
              type="text"
              v-model="department"
              placeholder="Example: Billing"
              class="mt-3 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-teal-400 dark:focus:ring-teal-500/20"
              required
            />
          </div>
        </div>

        <div>
          <label
            for="priority"
            class="block text-sm font-medium text-slate-700 dark:text-slate-200"
            >Priority</label
          >
          <select
            id="priority"
            v-model="priority"
            class="mt-3 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-teal-400 dark:focus:ring-teal-500/20"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div>
          <label
            for="description"
            class="block text-sm font-medium text-slate-700 dark:text-slate-200"
            >Description</label
          >
          <textarea
            id="description"
            v-model="description"
            rows="6"
            placeholder="Describe the issue in detail..."
            class="mt-3 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-teal-400 dark:focus:ring-teal-500/20"
            required
          />
        </div>

        <button
          type="submit"
          class="inline-flex items-center justify-center rounded-3xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 cursor-pointer"
        >
          Submit ticket
        </button>
      </form>
    </section>
  </main>
</template>

<style scoped></style>
