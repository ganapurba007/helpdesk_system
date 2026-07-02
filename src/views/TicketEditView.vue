<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed, ref, onMounted } from "vue";

const route = useRoute();
const router = useRouter();
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

const subject = ref(ticket.value.subject);
const department = ref(ticket.value.department);
const priority = ref(ticket.value.priority);
const description = ref(ticket.value.description);
const attachments = ref([]);

function handleFilesEdit(e) {
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

function handleDropEdit(e) {
  const files = Array.from(e.dataTransfer?.files || []);
  if (!files.length) return;
  handleFilesEdit({ target: { files } });
}

function removeAttachmentEdit(i) {
  attachments.value.splice(i, 1);
}

const isEditable = computed(() => ticket.value.status === "Open");

onMounted(() => {
  try {
    const raw = sessionStorage.getItem(`ticket_${ticketId}`);
    if (raw) {
      const stored = JSON.parse(raw);
      ticket.value = { ...ticket.value, ...stored };
      subject.value = ticket.value.subject || "";
      department.value = ticket.value.department || "";
      priority.value = ticket.value.priority || "Medium";
      description.value = ticket.value.description || "";
      attachments.value = ticket.value.attachments || [];
    }
  } catch (e) {
    // ignore
  }
});

function saveTicket() {
  if (!isEditable.value) return;
  const updated = {
    ...ticket.value,
    subject: subject.value,
    department: department.value,
    priority: priority.value,
    description: description.value,
    attachments: attachments.value,
  };
  try {
    sessionStorage.setItem(
      `ticket_${ticket.value.id}`,
      JSON.stringify(updated),
    );
    const list = JSON.parse(sessionStorage.getItem("tickets") || "[]");
    const idx = list.findIndex((t) => t.id === ticket.value.id);
    if (idx >= 0) {
      list[idx] = { ...list[idx], ...updated };
    } else {
      list.unshift({
        id: updated.id,
        subject: updated.subject,
        department: updated.department,
        priority: updated.priority,
        status: updated.status,
        createdAt: updated.createdAt,
        attachments: updated.attachments,
      });
    }
    sessionStorage.setItem("tickets", JSON.stringify(list));
  } catch (e) {
    // ignore
  }
  router.push({ name: "ticket_detail", params: { id: ticket.value.id } });
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
            <div>
              <label
                class="mb-3 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                >Attachments</label
              >
              <label class="mt-2 block">
                <div
                  @drop.prevent="handleDropEdit"
                  @dragover.prevent
                  class="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-600 hover:bg-slate-100"
                  :class="{ 'opacity-50 cursor-not-allowed': !isEditable }"
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
                  <div class="ml-3">
                    Click to select files or drop them here
                  </div>
                </div>
                <input
                  type="file"
                  multiple
                  @change="handleFilesEdit"
                  :disabled="!isEditable"
                  class="sr-only"
                />
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
                      class="text-xs text-teal-600"
                      >Download</a
                    >
                    <button
                      @click.prevent="removeAttachmentEdit(idx)"
                      class="text-xs text-rose-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
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
