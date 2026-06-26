<script setup>
import { ref } from "vue";

const name = ref("John Doe");
const email = ref("john.doe@example.com");
const phone = ref("+1 234 567 890");
const role = ref("Support Agent");
const department = ref("Customer Support");

function saveProfile(event) {
  event.preventDefault();
  // Add profile update logic here
  console.log("Profile saved:", {
    name: name.value,
    email: email.value,
    phone: phone.value,
    role: role.value,
    department: department.value,
  });
}
</script>

<template>
  <main class="px-4 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-5xl space-y-8">
      <section
        class="rounded-[2rem] border border-slate-200/80 bg-white/95 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:border-slate-700/80 dark:bg-slate-950/90"
      >
        <div
          class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <p
              class="text-sm font-semibold uppercase tracking-[0.32em] text-teal-600 dark:text-teal-300"
            >
              Profile
            </p>
            <h1
              class="mt-3 text-3xl font-semibold text-slate-950 dark:text-white sm:text-4xl"
            >
              Edit your account details
            </h1>
            <p
              class="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400"
            >
              Update your personal information so your account is always up to
              date.
            </p>
          </div>
          <div
            class="rounded-3xl border border-slate-200/80 bg-slate-50 p-4 text-center dark:border-slate-700/80 dark:bg-slate-900"
          >
            <p
              class="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400"
            >
              Account status
            </p>
            <p
              class="mt-3 text-2xl font-semibold text-slate-950 dark:text-white"
            >
              Active
            </p>
            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Last updated 2 days ago
            </p>
          </div>
        </div>
      </section>

      <section>
        <form
          @submit="saveProfile"
          class="rounded-[2rem] border border-slate-200/80 bg-white/95 p-8 shadow-[0_20px_40px_rgba(15,23,42,0.08)] dark:border-slate-700/80 dark:bg-slate-950/90"
        >
          <div class="grid gap-6 sm:grid-cols-2">
            <div>
              <label
                for="name"
                class="block text-sm font-medium text-slate-700 dark:text-slate-200"
                >Full name</label
              >
              <input
                id="name"
                type="text"
                v-model="name"
                class="mt-3 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-teal-400 dark:focus:ring-teal-500/20"
              />
            </div>

            <div>
              <label
                for="email"
                class="block text-sm font-medium text-slate-700 dark:text-slate-200"
                >Email address</label
              >
              <input
                id="email"
                type="email"
                v-model="email"
                class="mt-3 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-teal-400 dark:focus:ring-teal-500/20"
              />
            </div>
          </div>

          <div class="grid gap-6 sm:grid-cols-2 mt-6">
            <div>
              <label
                for="phone"
                class="block text-sm font-medium text-slate-700 dark:text-slate-200"
                >Phone number</label
              >
              <input
                id="phone"
                type="text"
                v-model="phone"
                class="mt-3 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-teal-400 dark:focus:ring-teal-500/20"
              />
            </div>

            <div>
              <label
                for="role"
                class="block text-sm font-medium text-slate-700 dark:text-slate-200"
                >Role</label
              >
              <input
                id="role"
                type="text"
                v-model="role"
                class="mt-3 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-teal-400 dark:focus:ring-teal-500/20"
              />
            </div>
          </div>

          <div class="mt-6">
            <label
              for="department"
              class="block text-sm font-medium text-slate-700 dark:text-slate-200"
              >Department</label
            >
            <input
              id="department"
              type="text"
              v-model="department"
              class="mt-3 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-teal-400 dark:focus:ring-teal-500/20"
            />
          </div>

          <button
            type="submit"
            class="mt-8 inline-flex items-center justify-center rounded-3xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
          >
            Save changes
          </button>
        </form>
      </section>
    </div>
  </main>
</template>

<style scoped></style>
