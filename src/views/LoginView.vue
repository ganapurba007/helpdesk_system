<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, useRouter } from "vue-router";
import api from "../service/api.js";

const router = useRouter();

const email = ref("");
const password = ref("");
const showPassword = ref(false);

const loading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

onMounted(() => {
  // Jika sudah login, langsung arahkan ke dashboard
  if (localStorage.getItem("token")) {
    router.push("/");
    return;
  }

  const sessionSuccess = sessionStorage.getItem("success");
  if (sessionSuccess) {
    successMessage.value = sessionSuccess;
    sessionStorage.removeItem("success");
  }
});

const submitLogin = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    const { data } = await api.post("/login", {
      email: email.value,
      password: password.value,
    });

    // Simpan token
    localStorage.setItem("token", data.data.token);
    sessionStorage.setItem("success", "Login successful. Welcome back!");

    // Simpan data user
    localStorage.setItem("user", JSON.stringify(data.data.user));

    // Gunakan token untuk request selanjutnya
    api.defaults.headers.common["Authorization"] = `Bearer ${data.data.token}`;

    window.dispatchEvent(new Event("auth-changed"));

    // Bersihkan form
    email.value = "";
    password.value = "";

    // Redirect ke dashboard
    router.push("/");
  } catch (error) {
    if (error.response?.status === 422) {
      errorMessage.value = Object.values(error.response.data.errors)
        .flat()
        .join(", ");
    } else {
      errorMessage.value = error.response?.data?.message ?? "Login failed";
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
          Welcome back
        </p>

        <h1 class="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">
          Login to your account
        </h1>

        <p class="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
          Use your email and password to continue.
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

      <form @submit.prevent="submitLogin" class="space-y-6">
        <div>
          <label
            for="email"
            class="block text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            v-model="email"
            required
            autocomplete="email"
            placeholder="email@domain.com"
            class="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-teal-400 dark:focus:ring-teal-500/20"
          />
        </div>

        <div>
          <label
            for="password"
            class="block text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Password
          </label>

          <div class="relative mt-2">
            <input
              id="password"
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              required
              autocomplete="current-password"
              placeholder="Enter your password"
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

        <button
          type="submit"
          :disabled="loading"
          class="w-full rounded-2xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
        >
          {{ loading ? "Logging in..." : "Login" }}
        </button>
      </form>

      <div
        class="mt-6 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400"
      >
        <RouterLink
          to="/forgot_password"
          class="cursor-pointer hover:text-teal-600 dark:hover:text-teal-300"
        >
          Forgot password?
        </RouterLink>

        <RouterLink
          to="/register"
          class="cursor-pointer font-medium text-teal-600 hover:text-teal-700 dark:text-teal-300 dark:hover:text-teal-200"
        >
          Sign up
        </RouterLink>
      </div>
    </section>
  </main>
</template>
