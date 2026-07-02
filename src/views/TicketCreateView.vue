<script setup>
import { ref } from "vue";

const subject = ref("");
const department = ref("");
const description = ref("");
const priority = ref("Medium");
const attachments = ref([]);

function handleFiles(e) {
  const files = Array.from(e.target.files || []);
  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      attachments.value.push({
        name: file.name,
        type: file.type,
        size: file.size,
        data: ev.target.result,
      });
    };
    reader.readAsDataURL(file);
  });
}

function handleDrop(e) {
  const files = Array.from(e.dataTransfer?.files || []);
  if (!files.length) return;
  handleFiles({ target: { files } });
}

function removeAttachment(i) {
  attachments.value.splice(i, 1);
}

function submitTicket(event) {
  event.preventDefault();
  const newId = `TCK-${Date.now()}`;
  const ticket = {
    id: newId,
    subject: subject.value,
    department: department.value,
    description: description.value,
    priority: priority.value,
    status: "Open",
    createdAt: new Date().toLocaleDateString(),
    attachments: attachments.value.map((a) => ({
      name: a.name,
      type: a.type,
      size: a.size,
      data: a.data,
    })),
  };
  // demo persistence: store in sessionStorage tickets array
  const stored = JSON.parse(sessionStorage.getItem("tickets") || "[]");
  stored.unshift(ticket);
  sessionStorage.setItem("tickets", JSON.stringify(stored));
  // also store per-ticket payload
  sessionStorage.setItem(`ticket_${newId}`, JSON.stringify(ticket));
  // reset form
  subject.value = "";
  department.value = "";
  description.value = "";
  priority.value = "Medium";
  attachments.value = [];
  // navigate to tickets list (if RouterLink available) or log
  console.log("Ticket created (demo):", ticket);
  alert("Ticket created (demo): " + ticket.id);
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

        <div>
          <label
            class="block text-sm font-medium text-slate-700 dark:text-slate-200"
            >Attachments</label
          >
          <label class="mt-3 block">
            <div
              @drop.prevent="handleDrop"
              @dragover.prevent
              class="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-600 hover:bg-slate-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M7 16v-4a4 4 0 018 0v4m-9 4h10a2 2 0 002-2V7a2 2 0 00-2-2h-3.5"
                />
              </svg>
              <div class="ml-3">Click to select files or drop them here</div>
            </div>
            <input type="file" multiple @change="handleFiles" class="sr-only" />
          </label>
          <div v-if="attachments.length" class="mt-2 space-y-2">
            <div
              v-for="(a, idx) in attachments"
              :key="a.name + idx"
              class="flex items-center justify-between rounded-md border p-2"
            >
              <div class="flex items-center gap-3">
                <div
                  v-if="a.type && a.type.startsWith('image/')"
                  class="h-12 w-12 overflow-hidden rounded-md bg-slate-100"
                >
                  <img
                    :src="a.data"
                    alt="preview"
                    class="h-full w-full object-cover"
                  />
                </div>
                <div class="text-sm">
                  <div class="font-medium">{{ a.name }}</div>
                  <div class="text-xs text-slate-500">
                    {{ Math.round(a.size / 1024) }} KB • {{ a.type }}
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <a
                  :href="a.data"
                  :download="a.name"
                  class="text-xs text-teal-600 cursor-pointer"
                  >Download</a
                >
                <button
                  @click.prevent="removeAttachment(idx)"
                  class="text-xs text-rose-600 cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
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
