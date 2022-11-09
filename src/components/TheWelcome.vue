<script setup lang="ts">
import WelcomeItem from "./WelcomeItem.vue";
import DocumentationIcon from "./icons/IconDocumentation.vue";
import ToolingIcon from "./icons/IconTooling.vue";
import EcosystemIcon from "./icons/IconEcosystem.vue";
import CommunityIcon from "./icons/IconCommunity.vue";
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Documentation</template>

    Chat
    <a
      href="https://github.com/XaviFortes/ee2e-chat-frontend-vue/wiki"
      target="_blank"
      rel="noopener"
      >official documentation</a
    >
    provides you with all information you need to get started.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Tooling</template>

    This project is made with
    <a href="https://v3.vuejs.org/" target="_blank" rel="noopener">Vue 3</a> and
    <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a>
    . It uses also utilizes the backend
    <a
      href="https://github.com/XaviFortes/ee2e-chat-backend"
      target="_blank"
      rel="noopener"
      >ee2e-chat-backend</a
    >.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Ecosystem</template>

    Get official tools and libraries for your project:
    <a href="https://pinia.vuejs.org/" target="_blank" rel="noopener">Pinia</a>,
    <a href="https://router.vuejs.org/" target="_blank" rel="noopener"
      >Vue Router</a
    >,
    <a href="https://test-utils.vuejs.org/" target="_blank" rel="noopener"
      >Vue Test Utils</a
    >, and
    <a href="https://github.com/vuejs/devtools" target="_blank" rel="noopener"
      >Vue Dev Tools</a
    >.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Community</template>

    Need help? Post your questions or bugs on
    <a
      href="https://github.com/XaviFortes/ee2e-chat-frontend-vue/issues"
      target="_blank"
      rel="noopener"
      >Project Issue</a
    >,
    <a
      href="https://stackoverflow.com/questions/tagged/vue.js"
      target="_blank"
      rel="noopener"
      >StackOverflow</a
    >. You should also follow the creator
    <a href="https://github.com/XaviFortes" target="_blank" rel="noopener"
      >@xavifortes</a
    >.
  </WelcomeItem>
</template>
