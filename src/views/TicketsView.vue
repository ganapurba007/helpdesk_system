<script setup>
import { RouterLink } from "vue-router";
import { ref, computed, watch } from "vue";
import SearchFilters from "../components/tickets/SearchFilters.vue";
import TicketList from "../components/tickets/TicketList.vue";
import PaginationControls from "../components/tickets/PaginationControls.vue";
import DeleteConfirm from "../components/tickets/DeleteConfirm.vue";
import Toast from "../components/tickets/Toast.vue";

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
      <SearchFilters
        :search="search"
        :statusFilter="statusFilter"
        :priorityFilter="priorityFilter"
        :pageSize="pageSize"
        :statuses="statuses"
        :priorities="priorities"
        @update:search="(v) => (search = v)"
        @update:statusFilter="(v) => (statusFilter = v)"
        @update:priorityFilter="(v) => (priorityFilter = v)"
        @update:pageSize="(v) => (pageSize = v)"
      />

      <TicketList :tickets="paginated" @request-delete="requestDeleteTicket" />

      <!-- mobile list handled by TicketList component -->
      <PaginationControls
        :totalPages="totalPages"
        :currentPage="currentPage"
        @go-to-page="goToPage"
        @prev="prevPage"
        @next="nextPage"
      />
    </section>

    <DeleteConfirm
      :show="showDeleteConfirm"
      :target="deleteTarget"
      @confirm="confirmDeleteTicket"
      @cancel="cancelDelete"
    />
    <Toast :show="showToast" :message="toastMessage" />
  </main>
</template>
