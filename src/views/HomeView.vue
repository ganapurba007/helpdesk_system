<script setup>
import { ref, onMounted, computed } from "vue";
import DashboardHeader from "../components/home/DashboardHeader.vue";
import WorkflowStats from "../components/home/WorkflowStats.vue";
import RecentTickets from "../components/home/RecentTickets.vue";
import RecentActivities from "../components/home/RecentActivities.vue";
import api from "../service/api.js";

const dashboard = ref(null);
const successMessage = ref("");

const dashboardData = computed(() => dashboard.value?.data ?? {});
const summaryData = computed(() => dashboardData.value.summary ?? {});
const user = computed(() => dashboardData.value.user ?? {});

const ticketStats = computed(() => {
  if (!dashboardData.value.summary);
  return [
    {
      label: "Open",
      value: summaryData.value.open ?? 0,
      status: "New",
      color: "from-teal-500 to-cyan-500",
    },
    {
      label: "Assigned",
      value: summaryData.value.assigned ?? 0,
      status: "Waiting response",
      color: "from-cyan-500 to-blue-500",
    },
    {
      label: "In Progress",
      value: summaryData.value.in_progress ?? 0,
      status: "Being worked",
      color: "from-blue-500 to-violet-500",
    },
    {
      label: "Resolved",
      value: summaryData.value.resolved ?? 0,
      status: "Awaiting review",
      color: "from-emerald-500 to-lime-500",
    },
    {
      label: "Closed",
      value: summaryData.value.closed ?? 0,
      status: "Done",
      color: "from-slate-500 to-slate-700",
    },
  ];
});

const totalTickets = computed(() => summaryData.value.total_tickets ?? 0);
const percentage = computed(() => summaryData.value.completion_percentage ?? 0);
const resolvedToday = computed(() => summaryData.value.resolved_today ?? 0);

const recentTickets = computed(() =>
  (dashboardData.value.recent_tickets || []).map((ticket) => ({
    id: ticket.ticket_number,
    subject: ticket.subject,
    date: new Date(ticket.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    status: ticket.status?.title || "Unknown",
  })),
);

const recentActivities = computed(() =>
  (dashboardData.value.recent_activities || []).map((activity) => ({
    time: new Date(activity.created_at).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    description:
      activity.description || activity.subject || activity.ticket_number,
  })),
);

function dismissSuccessMessage() {
  successMessage.value = "";
}

onMounted(async () => {
  successMessage.value = sessionStorage.getItem("success") || "";
  sessionStorage.removeItem("success");

  try {
    const { data } = await api.get("/dashboard");
    dashboard.value = data;
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <main class="space-y-10">
    <div
      v-if="successMessage"
      class="relative rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-green-700"
    >
      <button
        type="button"
        @click="dismissSuccessMessage"
        class="absolute right-3 top-3 text-green-700 hover:text-green-900"
        aria-label="Dismiss alert"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      {{ successMessage }}
    </div>
    <section
      class="rounded-[2rem] bg-white/95 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 dark:bg-slate-950/90 dark:ring-slate-700/80"
    >
      <div class="grid gap-8 xl:grid-cols-[1.6fr_0.8fr]">
        <DashboardHeader
          :totalTickets="totalTickets"
          :percentage="percentage"
          :resolvedToday="resolvedToday"
          :user="user"
        />
        <WorkflowStats :ticketStats="ticketStats" />
      </div>
    </section>

    <section class="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
      <RecentTickets :recentTickets="recentTickets" />
      <RecentActivities :recentActivities="recentActivities" />
    </section>
  </main>
</template>

<style scoped></style>
