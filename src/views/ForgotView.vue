<script setup>
import { ref } from "vue";

const email = ref("");

function submitForgot(event) {
  event.preventDefault();
  // Add forgot password logic here
  console.log("Forgot password request:", email.value);
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
          Reset password
        </p>
        <h1 class="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">
          Forgot your password?
        </h1>
        <p class="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
          Enter your email address and we'll send you instructions to reset your
          password.
        </p>
      </div>

      <form @submit="submitForgot" class="space-y-6">
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

        <button
          type="submit"
          class="w-full rounded-2xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
        >
          Send reset link
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        Remembered your password?
        <a
          href="/login"
          class="font-medium text-teal-600 hover:text-teal-700 dark:text-teal-300 dark:hover:text-teal-200"
          >Go back to login</a
        >
      </p>
    </section>
  </main>
</template>
