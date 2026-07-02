<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import api from "../service/api.js";

const router = useRouter();
const route = useRoute();

const password = ref("");
const passwordConfirm = ref("");
const loading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const email = ref("");
const token = ref("");

onMounted(() => {
  email.value = route.query.email || "";
  token.value = route.query.token || "";
});

const submitReset = async () => {
  errorMessage.value = "";
  successMessage.value = "";

  if (password.value !== passwordConfirm.value) {
    errorMessage.value = "Password confirmation does not match.";
    return;
  }

  loading.value = true;

  try {
    await api.post("/reset_password", {
      email: email.value,
      token: token.value,
      password: password.value,
      password_confirmation: passwordConfirm.value,
    });

    successMessage.value = "Password has been reset successfully.";
    password.value = "";
    passwordConfirm.value = "";

    setTimeout(() => {
      router.push("/login");
    }, 1000);
  } catch (error) {
    if (error.response?.status === 422) {
      errorMessage.value = Object.values(error.response.data.errors)
        .flat()
        .join(", ");
    } else {
      errorMessage.value =
        error.response?.data?.message ?? "Unable to reset password.";
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <main class="flex justify-center">
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
          Set a new password
        </h1>
        <p class="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
          Enter your new password and confirm it below.
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

      <form @submit.prevent="submitReset" class="space-y-6">
        <div>
          <label
            for="password"
            class="block text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            New password
          </label>
          <div class="relative mt-2">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
              placeholder="Enter new password"
              class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 pr-12 text-sm text-slate-900 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-teal-400 dark:focus:ring-teal-500/20"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
              @click="showPassword = !showPassword"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
            >
              <svg
                v-if="showPassword"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M17.94 17.94A10.94 10.94 0 0 1 12 20.5c-5.15 0-9.63-3.36-11.34-8.26a1 1 0 0 1 0-.48A10.94 10.94 0 0 1 6.06 6.06"
                />
                <path d="M1 1l22 22" />
                <path d="M9.88 9.88a3 3 0 0 0 4.24 4.24" />
                <path d="M14.12 14.12A3 3 0 0 1 9.88 9.88" />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
          </div>
        </div>

        <div>
          <label
            for="passwordConfirm"
            class="block text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Confirm password
          </label>
          <div class="relative mt-2">
            <input
              id="passwordConfirm"
              v-model="passwordConfirm"
              :type="showConfirmPassword ? 'text' : 'password'"
              required
              placeholder="Confirm new password"
              class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 pr-12 text-sm text-slate-900 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-teal-400 dark:focus:ring-teal-500/20"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
              @click="showConfirmPassword = !showConfirmPassword"
              :aria-label="
                showConfirmPassword
                  ? 'Hide confirmation password'
                  : 'Show confirmation password'
              "
            >
              <svg
                v-if="showConfirmPassword"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M17.94 17.94A10.94 10.94 0 0 1 12 20.5c-5.15 0-9.63-3.36-11.34-8.26a1 1 0 0 1 0-.48A10.94 10.94 0 0 1 6.06 6.06"
                />
                <path d="M1 1l22 22" />
                <path d="M9.88 9.88a3 3 0 0 0 4.24 4.24" />
                <path d="M14.12 14.12A3 3 0 0 1 9.88 9.88" />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
          </div>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full rounded-2xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
        >
          {{ loading ? "Saving..." : "Reset password" }}
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        Back to
        <a
          href="/login"
          class="font-medium text-teal-600 hover:text-teal-700 dark:text-teal-300 dark:hover:text-teal-200"
        >
          login
        </a>
      </p>
    </section>
  </main>
</template>
