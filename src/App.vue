<script setup>
import Nav from "./components/Nav.vue";
import Footer from "./components/Footer.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <div
    class="min-h-screen flex flex-col bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800"
  >
    <Nav />

    <main class="relative flex-1 w-full py-10 overflow-hidden">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RouterView />
      </div>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
main::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    radial-gradient(
      circle at 15% 20%,
      rgba(56, 189, 248, 0.16),
      transparent 18%
    ),
    radial-gradient(
      circle at 85% 80%,
      rgba(168, 85, 247, 0.12),
      transparent 16%
    ),
    linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.08),
      rgba(255, 255, 255, 0) 38%,
      rgba(255, 255, 255, 0.08)
    );
}
</style>
