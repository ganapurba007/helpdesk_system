<script setup>
import { useRoute, RouterLink } from "vue-router";
import { ref, onMounted } from "vue";

const route = useRoute();
const ticketId = route.params.id;

const ticket = ref({
  id: ticketId,
  subject: "Cannot access account",
  department: "Customer Support",
  status: "Open",
  priority: "High",
  createdAt: "Jun 25, 2026",
  requester: "Jane Doe",
  description: "I cannot log into the portal using my usual credentials.",
  attachments: [],
});

onMounted(() => {
  try {
    const raw = sessionStorage.getItem(`ticket_${ticketId}`);
    if (raw) {
      const stored = JSON.parse(raw);
      ticket.value = { ...ticket.value, ...stored };
    }
  } catch (e) {
    // ignore
  }
});

const history = [
  {
    date: "25 Jun 2026",
    time: "09:45",
    note: "New ticket created by Jane Doe.",
  },
  {
    date: "25 Jun 2026",
    time: "10:02",
    note: "Support team assigned ticket to IT department.",
  },
  { date: "25 Jun 2026", time: "10:18", note: "Ticket status set to Open." },
  {
    date: "25 Jun 2026",
    time: "11:05",
    note: "Customer added more details to the request.",
  },
  {
    date: "26 Jun 2026",
    time: "08:35",
    note: "Ticket escalated to the technical team.",
  },
  {
    date: "26 Jun 2026",
    time: "09:20",
    note: "Developer reviewed error logs.",
  },
  {
    date: "26 Jun 2026",
    time: "10:55",
    note: "Response sent to customer with initial troubleshooting steps.",
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
            Ticket detail
          </p>
          <h1
            class="mt-4 text-4xl font-semibold text-slate-950 dark:text-white sm:text-5xl"
          >
            Ticket {{ ticket.id }}
          </h1>
          <p
            class="mt-3 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400"
          >
            Review ticket details and see the full activity history for this
            request.
          </p>
        </div>
        <div class="flex items-center gap-3">
          <RouterLink
            :to="{ name: 'tickets' }"
            class="inline-flex items-center justify-center rounded-3xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 dark:border-slate-700/80 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            >Back to tickets</RouterLink
          >
          <RouterLink
            v-if="ticket.status !== 'Closed'"
            :to="{ name: 'ticket_reply', params: { id: ticket.id } }"
            class="inline-flex items-center justify-center rounded-3xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-500"
            >Reply</RouterLink
          >
        </div>
      </div>
    </section>

    <section class="grid gap-8 xl:grid-cols-[1.4fr_0.6fr]">
      <div
        class="rounded-[2rem] border border-slate-200/70 bg-white/95 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)] dark:border-slate-700/80 dark:bg-slate-950/90"
      >
        <div class="space-y-6">
          <div
            class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h2 class="text-2xl font-semibold text-slate-950 dark:text-white">
                {{ ticket.subject }}
              </h2>
              <p class="text-sm text-slate-500 dark:text-slate-400">
                Requested by {{ ticket.requester }} on {{ ticket.createdAt }}
              </p>
            </div>
            <div class="flex flex-wrap gap-3">
              <span
                class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >{{ ticket.priority }}</span
              >
              <span
                class="rounded-full bg-teal-600 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                >{{ ticket.status }}</span
              >
            </div>
          </div>

          <div class="grid gap-6 lg:grid-cols-2">
            <div
              class="rounded-3xl border border-slate-200/70 bg-slate-50 p-6 dark:border-slate-700/80 dark:bg-slate-900"
            >
              <p
                class="text-sm font-semibold text-slate-600 dark:text-slate-400"
              >
                Department
              </p>
              <p
                class="mt-3 text-base font-semibold text-slate-950 dark:text-white"
              >
                {{ ticket.department }}
              </p>
            </div>
            <div
              class="rounded-3xl border border-slate-200/70 bg-slate-50 p-6 dark:border-slate-700/80 dark:bg-slate-900"
            >
              <p
                class="text-sm font-semibold text-slate-600 dark:text-slate-400"
              >
                Status
              </p>
              <p
                class="mt-3 text-base font-semibold text-slate-950 dark:text-white"
              >
                {{ ticket.status }}
              </p>
            </div>
          </div>

          <div
            class="rounded-3xl border border-slate-200/70 bg-slate-50 p-6 dark:border-slate-700/80 dark:bg-slate-900"
          >
            <p class="text-sm font-semibold text-slate-600 dark:text-slate-400">
              Description
            </p>
            <p
              class="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300"
            >
              {{ ticket.description }}
            </p>
            <div
              v-if="ticket.attachments && ticket.attachments.length"
              class="mt-4"
            >
              <p
                class="text-sm font-semibold text-slate-600 dark:text-slate-400"
              >
                Attachments
              </p>
              <div class="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div
                  v-for="(att, i) in ticket.attachments"
                  :key="att.name + i"
                  class="rounded-md border p-3"
                >
                  <div
                    v-if="att.type && att.type.startsWith('image/')"
                    class="mb-2 overflow-hidden rounded"
                  >
                    <img
                      :src="att.data"
                      alt="attachment"
                      class="h-36 w-full object-cover"
                    />
                  </div>
                  <div class="text-sm font-medium">{{ att.name }}</div>
                  <div class="text-xs text-slate-500">
                    {{ Math.round(att.size / 1024) }} KB • {{ att.type }}
                  </div>
                  <div class="mt-2">
                    <a
                      :href="att.data"
                      :download="att.name"
                      class="text-xs text-teal-600"
                      >Download</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <aside class="space-y-6">
        <div
          class="rounded-[2rem] border border-slate-200/70 bg-white/95 p-6 shadow-sm dark:border-slate-700/80 dark:bg-slate-950/90"
        >
          <h2 class="text-lg font-semibold text-slate-950 dark:text-white">
            Activity history
          </h2>
          <div
            class="mt-8 max-h-[420px] overflow-y-auto border-l border-slate-200/70 pr-4 dark:border-slate-700/80"
          >
            <div
              v-for="(item, index) in history"
              :key="item.date + item.time + index"
              class="relative pl-8 pb-8"
            >
              <div
                class="absolute left-0 top-2 h-4 w-4 rounded-full border-4 border-white bg-teal-600 shadow-lg"
              ></div>
              <div
                class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p
                    class="text-sm font-semibold text-slate-950 dark:text-white"
                  >
                    {{ item.note }}
                  </p>
                  <p
                    class="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500"
                  >
                    {{ item.date }}
                  </p>
                </div>
                <span
                  class="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500"
                >
                  {{ item.time }}
                </span>
              </div>
              <p
                class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400"
              >
                {{ item.description || "No additional details available." }}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </section>
  </main>
</template>

<style scoped></style>
