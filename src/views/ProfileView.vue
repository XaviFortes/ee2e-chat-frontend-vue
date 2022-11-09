<template>
  <main>
    <h1>Config</h1>
    <ul>
      <li>
        <router-link to="/config/profile">Profile</router-link>
      </li>
      <li>
        <router-link to="/config/security">Security</router-link>
      </li>
      <li>
        <router-link to="/config/notifications">Notifications</router-link>
      </li>
    </ul>
  </main>
</template>

<script lang="ts">
import { checkAuth } from "@/api/auth";

export default {
  async beforeRouteEnter(to, from, next) {
    const res = await checkAuth();
    if (res.data.message === "JWT is valid") {
      next();
    } else {
      next("/login");
    }
  },
};
</script>
