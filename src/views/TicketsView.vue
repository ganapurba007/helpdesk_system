<script setup>
import { RouterLink } from "vue-router";
import { ref, computed, watch } from "vue";

const allTickets = ref([
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
  {
    id: "TCK-00120",
    subject: "Website timeout error",
    department: "IT",
    status: "Resolved",
    priority: "Medium",
    createdAt: "Jun 21",
  },
  {
    id: "TCK-00119",
    subject: "Account locked",
    department: "Customer Support",
    status: "Closed",
    priority: "Low",
    createdAt: "Jun 20",
  },
  {
    id: "TCK-00118",
    subject: "Invoice discrepancy",
    department: "Billing",
    status: "Open",
    priority: "High",
    createdAt: "Jun 18",
  },
]);

const search = ref("");
const statusFilter = ref("All");
const priorityFilter = ref("All");
const pageSize = ref(2);
const currentPage = ref(1);
const showDeleteConfirm = ref(false);
const deleteTarget = ref(null);
const toastMessage = ref("");
const showToast = ref(false);

const statuses = [
  "All",
  "Open",
  "Assigned",
  "In Progress",
  "Pending",
  "Resolved",
  "Closed",
];
const priorities = ["All", "Low", "Medium", "High"];

const filteredTickets = computed(() => {
  let list = allTickets.value;
  const q = search.value.trim().toLowerCase();
  if (q) {
    list = list.filter(
      (t) =>
        t.subject.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q) ||
        t.department.toLowerCase().includes(q),
    );
  }
  if (statusFilter.value !== "All") {
    list = list.filter((t) => t.status === statusFilter.value);
  }
  if (priorityFilter.value !== "All") {
    list = list.filter((t) => t.priority === priorityFilter.value);
  }
  return list;
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredTickets.value.length / pageSize.value)),
);

watch([search, statusFilter, priorityFilter, pageSize], () => {
  currentPage.value = 1;
});

const paginated = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredTickets.value.slice(start, start + pageSize.value);
});

function goToPage(n) {
  if (n < 1 || n > totalPages.value) return;
  currentPage.value = n;
}

function requestDeleteTicket(ticket) {
  if (ticket.status !== "Open") return;
  deleteTarget.value = ticket;
  showDeleteConfirm.value = true;
}

function confirmDeleteTicket() {
  if (!deleteTarget.value) return;

  allTickets.value = allTickets.value.filter(
    (ticket) => ticket.id !== deleteTarget.value.id,
  );

  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value;
  }

  toastMessage.value = `Ticket ${deleteTarget.value.id} deleted.`;
  showToast.value = true;
  deleteTarget.value = null;
  showDeleteConfirm.value = false;

  window.setTimeout(() => {
    showToast.value = false;
  }, 3200);
}

function cancelDelete() {
  deleteTarget.value = null;
  showDeleteConfirm.value = false;
}

function prevPage() {
  goToPage(currentPage.value - 1);
}

function nextPage() {
  goToPage(currentPage.value + 1);
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
                v-model="search"
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
                  v-model="statusFilter"
                  class="w-full rounded-[1.5rem] border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition duration-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-teal-400 dark:focus:ring-teal-500/20"
                >
                  <option v-for="s in statuses" :key="s">{{ s }}</option>
                </select>
              </div>

              <div>
                <label
                  class="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400"
                  >Priority</label
                >
                <select
                  v-model="priorityFilter"
                  class="w-full rounded-[1.5rem] border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition duration-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-teal-400 dark:focus:ring-teal-500/20"
                >
                  <option v-for="p in priorities" :key="p">{{ p }}</option>
                </select>
              </div>
            </div>
          </div>

          <div
            class="flex flex-col gap-3 rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4 shadow-sm dark:border-slate-700/80 dark:bg-slate-900"
          >
            <p class="text-sm font-semibold text-slate-800 dark:text-slate-100">
              {{ filteredTickets.length }} tickets found
            </p>
            <div class="flex items-center gap-3">
              <span class="text-sm text-slate-500 dark:text-slate-400"
                >Per page</span
              >
              <select
                v-model.number="pageSize"
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

      <div
        class="hidden sm:block overflow-hidden rounded-[1.75rem] border border-slate-200/70 dark:border-slate-700/80"
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
            <tr v-for="ticket in paginated" :key="ticket.id">
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
                    @click="requestDeleteTicket(ticket)"
                    class="inline-flex rounded-3xl border border-rose-600 bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100 cursor-pointer"
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
          v-for="ticket in paginated"
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
            <div class="flex items-center gap-2">
              <RouterLink
                :to="{ name: 'ticket_detail', params: { id: ticket.id } }"
                class="inline-flex rounded-3xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-700"
                >Detail</RouterLink
              >
              <button
                v-if="ticket.status === 'Open'"
                @click="requestDeleteTicket(ticket)"
                class="inline-flex rounded-3xl border border-rose-600 bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
              >
                Delete
              </button>
            </div>
          </div>

          <div
            class="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-400"
          >
            <div class="flex items-center justify-between gap-3">
              <span class="font-medium text-slate-900 dark:text-slate-100">
                Department
              </span>
              <span>{{ ticket.department }}</span>
            </div>
            <div class="flex items-center justify-between gap-3">
              <span class="font-medium text-slate-900 dark:text-slate-100">
                Priority
              </span>
              <span>{{ ticket.priority }}</span>
            </div>
            <div class="flex items-center justify-between gap-3">
              <span class="font-medium text-slate-900 dark:text-slate-100">
                Status
              </span>
              <span
                class="inline-flex rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white"
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
            </div>
            <div class="flex items-center justify-between gap-3">
              <span class="font-medium text-slate-900 dark:text-slate-100">
                Created
              </span>
              <span>{{ ticket.createdAt }}</span>
            </div>
          </div>
        </div>
      </div>

      <div
        class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <div class="flex flex-wrap items-center gap-2">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Prev
          </button>
          <div
            class="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm dark:border-slate-700 dark:bg-slate-950"
          >
            <button
              v-for="n in totalPages"
              :key="n"
              @click="goToPage(n)"
              :class="[
                'rounded-full px-4 py-2 text-sm font-semibold transition',
                n === currentPage
                  ? 'bg-teal-600 text-white shadow-lg'
                  : 'border border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800',
              ]"
            >
              {{ n }}
            </button>
          </div>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Next
          </button>
        </div>

        <div
          class="rounded-3xl bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm dark:bg-slate-900 dark:text-slate-300"
        >
          Page {{ currentPage }} of {{ totalPages }}
        </div>
      </div>
    </section>

    <div
      v-if="showDeleteConfirm"
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
                deleteTarget?.id
              }}</span
              >? This action cannot be undone.
            </p>
          </div>
        </div>

        <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            @click="cancelDelete"
            class="rounded-3xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900 cursor-pointer"
          >
            Cancel
          </button>
          <button
            @click="confirmDeleteTicket"
            class="rounded-3xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-500 cursor-pointer"
          >
            Delete ticket
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showToast"
      class="fixed bottom-6 right-6 z-50 flex items-center rounded-[1.5rem] bg-slate-900 px-5 py-3 text-sm text-white shadow-2xl shadow-slate-950/40"
    >
      <span>{{ toastMessage }}</span>
    </div>
  </main>
</template>
