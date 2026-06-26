<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "vue";

const route = useRoute();
const router = useRouter();
const ticketId = route.params.id;

const ticket = {
  id: ticketId,
  subject: "Cannot access account",
  department: "Customer Support",
  status: "Open",
  priority: "High",
  createdAt: "Jun 25, 2026",
  requester: "Jane Doe",
  description: "I cannot log into the portal using my usual credentials.",
};

const subject = ref(ticket.subject);
const department = ref(ticket.department);
const priority = ref(ticket.priority);
const description = ref(ticket.description);

const isEditable = computed(() => ticket.status === "Open");

function saveTicket() {
  if (!isEditable.value) return;
  router.push({ name: "ticket_detail", params: { id: ticket.id } });
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
            Edit ticket
          </p>
          <h1
            class="mt-4 text-4xl font-semibold text-slate-950 dark:text-white sm:text-5xl"
          >
            Ticket {{ ticket.id }}
          </h1>
          <p
            class="mt-3 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400"
          >
            Update ticket details while this request is still open. Changes are
            only allowed for open tickets.
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <RouterLink
            :to="{ name: 'tickets' }"
            class="inline-flex items-center justify-center rounded-3xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 dark:border-slate-700/80 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            >Back</RouterLink
          >
          <button
            @click="saveTicket"
            :disabled="!isEditable"
            class="inline-flex items-center justify-center rounded-3xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Save changes
          </button>
        </div>
      </div>
    </section>

    <section
      class="rounded-[2rem] border border-slate-200/70 bg-white/95 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)] dark:border-slate-700/80 dark:bg-slate-950/90"
    >
      <div class="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
        <div class="space-y-6">
          <div
            class="rounded-[1.75rem] border border-slate-200/70 bg-slate-50 p-6 dark:border-slate-700/80 dark:bg-slate-900"
          >
            <p class="text-sm font-semibold text-slate-600 dark:text-slate-400">
              Ticket status
            </p>
            <div class="mt-3 flex flex-wrap items-center gap-3">
              <span
                class="rounded-full bg-teal-600 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                >{{ ticket.status }}</span
              >
              <span class="text-sm text-slate-600 dark:text-slate-400"
                >Only open tickets can be modified.</span
              >
            </div>
          </div>

          <div class="space-y-6">
            <div>
              <label
                class="mb-3 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                >Subject</label
              >
              <input
                v-model="subject"
                :disabled="!isEditable"
                class="w-full rounded-[1.5rem] border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition duration-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:cursor-not-allowed disabled:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:disabled:bg-slate-900 dark:focus:border-teal-400 dark:focus:ring-teal-500/20"
              />
            </div>

            <div class="grid gap-6 lg:grid-cols-2">
              <div>
                <label
                  class="mb-3 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                  >Department</label
                >
                <input
                  v-model="department"
                  :disabled="!isEditable"
                  class="w-full rounded-[1.5rem] border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition duration-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:cursor-not-allowed disabled:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:disabled:bg-slate-900 dark:focus:border-teal-400 dark:focus:ring-teal-500/20"
                />
              </div>

              <div>
                <label
                  class="mb-3 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                  >Priority</label
                >
                <select
                  v-model="priority"
                  :disabled="!isEditable"
                  class="w-full rounded-[1.5rem] border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition duration-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:cursor-not-allowed disabled:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:disabled:bg-slate-900 dark:focus:border-teal-400 dark:focus:ring-teal-500/20"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
            </div>

            <div>
              <label
                class="mb-3 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                >Description</label
              >
              <textarea
                v-model="description"
                :disabled="!isEditable"
                rows="6"
                class="w-full rounded-[1.5rem] border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition duration-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:cursor-not-allowed disabled:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:disabled:bg-slate-900 dark:focus:border-teal-400 dark:focus:ring-teal-500/20"
              />
            </div>
          </div>
        </div>

        <aside class="space-y-6">
          <div
            class="rounded-[1.75rem] border border-slate-200/70 bg-slate-50 p-6 dark:border-slate-700/80 dark:bg-slate-900"
          >
            <h2 class="text-lg font-semibold text-slate-950 dark:text-white">
              Quick info
            </h2>
            <div
              class="mt-5 space-y-4 text-sm text-slate-600 dark:text-slate-400"
            >
              <div class="flex items-center justify-between gap-3">
                <span class="font-semibold text-slate-900 dark:text-slate-100"
                  >Requester</span
                >
                <span>{{ ticket.requester }}</span>
              </div>
              <div class="flex items-center justify-between gap-3">
                <span class="font-semibold text-slate-900 dark:text-slate-100"
                  >Created</span
                >
                <span>{{ ticket.createdAt }}</span>
              </div>
              <div
                class="rounded-3xl bg-white px-4 py-3 shadow-sm dark:bg-slate-950"
              >
                <p
                  class="text-sm font-semibold text-slate-700 dark:text-slate-100"
                >
                  Edit rules
                </p>
                <p
                  class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400"
                >
                  Only open tickets can be modified; other statuses are
                  read-only.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  </main>
</template>
