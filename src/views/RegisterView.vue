<script setup>
import { ref } from "vue";

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

function submitRegister(event) {
  event.preventDefault();
  // Add registration logic here
  console.log(
    "Register attempt:",
    name.value,
    email.value,
    password.value,
    confirmPassword.value,
  );
}
</script>

<template>
  <main class="flex items-center justify-center px-4">
    <section
      class="w-full max-w-md rounded-3xl border border-slate-200/70 bg-white/95 p-8 shadow-2xl shadow-slate-900/5 backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-950/75"
    >
      <div class="mb-8 text-center">
        <p
          class="text-sm font-semibold uppercase tracking-[0.24em] text-teal-700 dark:text-teal-300"
        >
          Create account
        </p>
        <h1 class="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">
          Register for a new account
        </h1>
        <p class="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
          Enter your details below to get started.
        </p>
      </div>

      <form @submit="submitRegister" class="space-y-6">
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
            required
            placeholder="John Doe"
            class="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-teal-400 dark:focus:ring-teal-500/20"
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
            required
            placeholder="email@domain.com"
            class="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-teal-400 dark:focus:ring-teal-500/20"
          />
        </div>

        <div>
          <label
            for="password"
            class="block text-sm font-medium text-slate-700 dark:text-slate-200"
            >Password</label
          >
          <input
            id="password"
            type="password"
            v-model="password"
            required
            placeholder="Create a password"
            class="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-teal-400 dark:focus:ring-teal-500/20"
          />
        </div>

        <div>
          <label
            for="confirm-password"
            class="block text-sm font-medium text-slate-700 dark:text-slate-200"
            >Confirm password</label
          >
          <input
            id="confirm-password"
            type="password"
            v-model="confirmPassword"
            required
            placeholder="Repeat your password"
            class="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-teal-400 dark:focus:ring-teal-500/20"
          />
        </div>

        <button
          type="submit"
          class="w-full rounded-2xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
        >
          Sign up
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        Already have an account?
        <a
          href="/login"
          class="font-medium text-teal-600 hover:text-teal-700 dark:text-teal-300 dark:hover:text-teal-200"
          >Log in</a
        >
      </p>
    </section>
  </main>
</template>
