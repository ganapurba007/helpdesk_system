<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../service/api.js";

const router = useRouter();

const email = ref("");
const loading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

const submitForgot = async () => {
  errorMessage.value = "";
  successMessage.value = "";
  loading.value = true;

  try {
    await api.post("/forgot_password", {
      email: email.value.trim(),
    });

    successMessage.value =
      "If your email is registered, we sent reset instructions.";
    email.value = "";
  } catch (error) {
    if (error.response?.status === 422) {
      errorMessage.value = Object.values(error.response.data.errors)
        .flat()
        .join(", ");
    } else {
      errorMessage.value =
        error.response?.data?.message ?? "Unable to send reset link";
    }
  } finally {
    loading.value = false;
  }
};
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

      <div
        v-if="successMessage"
        class="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-600"
      >
        {{ successMessage }}
      </div>

      <div
        v-if="errorMessage"
        class="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600"
      >
        {{ errorMessage }}
      </div>

      <form @submit.prevent="submitForgot" class="space-y-6">
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
          :disabled="loading"
          class="w-full rounded-2xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-600 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
        >
          {{ loading ? "Sending..." : "Send reset link" }}
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
