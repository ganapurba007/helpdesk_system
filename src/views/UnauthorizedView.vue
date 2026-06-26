<script setup></script>

<template>
  <main class="flex items-center justify-center px-4">
    <div
      class="w-full max-w-3xl rounded-[2rem] border border-slate-200/70 bg-white/90 p-10 shadow-2xl shadow-rose-500/10 backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-950/80"
    >
      <div class="grid gap-8 text-center">
        <div
          class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-rose-600/10 text-rose-600 shadow-lg shadow-rose-600/10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="h-10 w-10"
          >
            <path
              d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm.75 5a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0zm-4 6.25a1.25 1.25 0 112.5 0V16a1.25 1.25 0 11-2.5 0v-2.75zm6 0a1.25 1.25 0 112.5 0V16a1.25 1.25 0 11-2.5 0v-2.75z"
            />
          </svg>
        </div>

        <div class="space-y-4">
          <p
            class="text-sm font-semibold uppercase tracking-[0.32em] text-rose-700 dark:text-rose-300"
          >
            error 403
          </p>
          <h1
            class="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
          >
            Unauthorized Access.
          </h1>
          <p
            class="mx-auto max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300"
          >
            You do not have permission to view this page. Please contact your
            administrator or login to continue.
          </p>
        </div>

        <div class="grid gap-4 sm:grid-cols-1">
          <RouterLink
            :to="{ name: 'login' }"
            class="inline-flex items-center justify-center rounded-2xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-500"
          >
            Login
          </RouterLink>
        </div>
      </div>
    </div>
  </main>
</template>
