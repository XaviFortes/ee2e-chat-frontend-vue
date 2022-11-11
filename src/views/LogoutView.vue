<template>
  <main>
    <h1>Logout</h1>
    <p>Logging out...</p>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { logout } from "@/api/auth";
import { useRouter } from "vue-router";

export default defineComponent({
  async beforeRouteEnter(to, from, next) {
    const res = await logout();
    localStorage.removeItem("x-access-token");
    if (res.data.message === "Logged out") {
      next();
    } else {
      next("/login");
    }
  },
  setup() {
    const router = useRouter();
    router.push("/login");
  },
});
</script>
