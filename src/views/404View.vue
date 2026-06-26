<script setup></script>

<template>
  <main class="flex items-center justify-center px-4">
    <div
      class="w-full max-w-3xl rounded-[2rem] border border-slate-200/70 bg-white/90 p-10 shadow-2xl shadow-teal-500/10 backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-950/80"
    >
      <div class="grid gap-8 text-center">
        <div
          class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-teal-600/10 text-teal-600 shadow-lg shadow-teal-600/10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="h-10 w-10"
          >
            <path
              d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm.75 5a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0zm1.5 9.25a1.25 1.25 0 01-2.5 0V13.5a1.25 1.25 0 112.5 0z"
            />
          </svg>
        </div>

        <div class="space-y-4">
          <p
            class="text-sm font-semibold uppercase tracking-[0.32em] text-teal-700 dark:text-teal-300"
          >
            error 404
          </p>
          <h1
            class="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
          >
            Page Not Found.
          </h1>
          <p
            class="mx-auto max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300"
          >
            We couldn’t find the page you’re looking for.
          </p>
        </div>

        <div class="grid gap-4 sm:grid-cols-1">
          <a
            href="/"
            class="inline-flex items-center justify-center rounded-2xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-500"
          >
            Back to homepage
          </a>
        </div>
      </div>
    </div>
  </main>
</template>
