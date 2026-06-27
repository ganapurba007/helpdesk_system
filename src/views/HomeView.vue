<script setup>
import DashboardHeader from "../components/home/DashboardHeader.vue";
import WorkflowStats from "../components/home/WorkflowStats.vue";
import RecentTickets from "../components/home/RecentTickets.vue";
import RecentActivities from "../components/home/RecentActivities.vue";

const ticketStats = [
  {
    label: "Open",
    value: 24,
    status: "New",
    color: "from-teal-500 to-cyan-500",
  },
  {
    label: "Assigned",
    value: 18,
    status: "Waiting response",
    color: "from-cyan-500 to-blue-500",
  },
  {
    label: "In Progress",
    value: 12,
    status: "Being worked",
    color: "from-blue-500 to-violet-500",
  },
  {
    label: "Pending",
    value: 9,
    status: "Waiting approval",
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    label: "Resolved",
    value: 34,
    status: "Awaiting review",
    color: "from-emerald-500 to-lime-500",
  },
  {
    label: "Closed",
    value: 53,
    status: "Done",
    color: "from-slate-500 to-slate-700",
  },
];

const totalTickets = 150;

const recentTickets = [
  {
    id: "TCK-00124",
    subject: "Cannot access account",
    status: "Open",
    date: "Jun 25",
  },
  {
    id: "TCK-00123",
    subject: "Payment invoice issue",
    status: "Assigned",
    date: "Jun 24",
  },
  {
    id: "TCK-00122",
    subject: "Email notifications not received",
    status: "In Progress",
    date: "Jun 23",
  },
  {
    id: "TCK-00121",
    subject: "Request for new onboarding",
    status: "Pending",
    date: "Jun 22",
  },
];

const recentActivities = [
  {
    time: "10 min ago",
    description: "Agent Sarah assigned ticket TCK-00124 to Support Team.",
  },
  {
    time: "1 hour ago",
    description: "Ticket TCK-00122 updated to In Progress.",
  },
  { time: "3 hours ago", description: "Customer replied to ticket TCK-00123." },
  { time: "Yesterday", description: "Ticket TCK-00119 closed successfully." },
];
</script>

<template>
  <main class="space-y-10">
    <section
      class="rounded-[2rem] bg-white/95 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 dark:bg-slate-950/90 dark:ring-slate-700/80"
    >
      <div class="grid gap-8 xl:grid-cols-[1.6fr_0.8fr]">
        <DashboardHeader :totalTickets="totalTickets" :resolvedToday="14" />
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
