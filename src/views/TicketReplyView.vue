<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";

const route = useRoute();
const router = useRouter();
const id = route.params.id || "";

const ticket = ref(null);
const reply = ref("");
const attachments = ref([]);
const loading = ref(true);
const error = ref("");

const previousReplies = computed(() => {
  try {
    const key = ticket.value?.id ? `ticket_replies_${ticket.value.id}` : null;
    if (!key) return [];
    return JSON.parse(sessionStorage.getItem(key) || "[]");
  } catch (e) {
    return [];
  }
});

function mockFetchTicket(id) {
  // Attempt to read a stored ticket from sessionStorage for demo persistence
  try {
    const raw = sessionStorage.getItem(`ticket_${id}`);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // ignore
  }
  // Fallback mock
  return {
    id,
    subject: "Sample ticket subject",
    status: "Open",
    department: "Support",
    createdAt: "Jun 25",
  };
}

onMounted(() => {
  loading.value = true;
  const t = mockFetchTicket(id);
  if (!t) {
    error.value = "Ticket not found.";
    loading.value = false;
    return;
  }
  ticket.value = t;
  loading.value = false;
  if (ticket.value.status === "Closed") {
    router.replace({ name: "unauthorized" });
  }
});

function submitReply() {
  if (!reply.value.trim()) return;
  // Persist reply in sessionStorage for demo
  const key = `ticket_replies_${ticket.value.id}`;
  const existing = JSON.parse(sessionStorage.getItem(key) || "[]");
  existing.push({
    text: reply.value.trim(),
    at: new Date().toISOString(),
    attachments: attachments.value.map((a) => ({ name: a.name, type: a.type })),
  });
  sessionStorage.setItem(key, JSON.stringify(existing));
  reply.value = "";
  attachments.value = [];
  alert("Reply saved (demo).");
}

function handleFiles(e) {
  const files = Array.from(e.target.files || []);
  // read each file as base64 (demo) and store metadata
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
  // reuse handleFiles shape
  handleFiles({ target: { files } });
}

function removeAttachment(i) {
  attachments.value.splice(i, 1);
}
</script>

<template>
  <main class="space-y-6">
    <section class="rounded-2xl bg-white p-8 shadow ring-1 ring-slate-200">
      <div v-if="loading && !ticket">Loading...</div>
      <div v-else-if="error" class="text-rose-600 mt-4">{{ error }}</div>
      <div v-else>
        <h1 class="text-2xl font-semibold">Reply to ticket {{ ticket.id }}</h1>
        <p class="text-sm text-slate-600">Subject: {{ ticket.subject }}</p>
        <p class="text-sm text-slate-600">
          Department: {{ ticket.department }}
        </p>
        <div class="mt-6">
          <label class="block text-xs font-semibold uppercase text-slate-500"
            >Your reply</label
          >
          <textarea
            v-model="reply"
            rows="6"
            class="mt-2 w-full rounded-lg border px-4 py-3 text-sm"
            placeholder="Write your reply here..."
          ></textarea>
        </div>

        <div class="mt-4">
          <label class="block text-xs font-semibold uppercase text-slate-500"
            >Attachments</label
          >
          <label class="mt-2 block">
            <div
              @drop.prevent="handleDrop"
              @dragover.prevent
              class="mt-2 flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-600 hover:bg-slate-100"
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
              <div class="text-sm">
                {{ a.name }}
                <span class="text-xs text-slate-500"
                  >({{ Math.round(a.size / 1024) }} KB)</span
                >
              </div>
              <button
                @click.prevent="removeAttachment(idx)"
                class="text-xs text-rose-600"
              >
                Remove
              </button>
            </div>
          </div>
        </div>

        <div class="mt-4 flex gap-3">
          <button
            @click="submitReply"
            class="rounded-3xl bg-teal-600 px-4 py-2 text-white"
          >
            Send reply
          </button>
          <button @click="$router.back()" class="rounded-3xl border px-4 py-2">
            Cancel
          </button>
        </div>

        <div class="mt-6">
          <h2 class="text-lg font-semibold">Previous replies (demo)</h2>
          <ul>
            <li
              v-for="r in previousReplies"
              :key="r.at"
              class="mt-2 rounded-md border p-3"
            >
              <div class="text-sm text-slate-700">{{ r.text }}</div>
              <div class="text-xs text-slate-500 mt-1">{{ r.at }}</div>
              <div v-if="r.attachments && r.attachments.length" class="mt-2">
                <div class="text-xs font-semibold text-slate-600">
                  Attachments:
                </div>
                <ul class="mt-1 list-disc pl-5 text-xs text-slate-700">
                  <li v-for="(att, i) in r.attachments" :key="att.name + i">
                    {{ att.name }} ({{ att.type }})
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </main>
</template>
