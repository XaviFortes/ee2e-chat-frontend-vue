<template>
  <main>
    <h1>Contact Page</h1>
    <div id="contact">
      <div id="contactInfo">
        <div>
          <p>
            Any issue or suggestion? Please submit it on our GitHub repository.
            <a
              href="https://github.com/XaviFortes/ee2e-chat-frontend-vue/issues"
              >GitHub</a
            >
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
export default {
  name: "ContactView",
  setup() {
    return {};
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#contact {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20%;
  width: 100%;
  padding: 1rem;
  background-color: var(--dark);
  color: var(--light);
}
#contactInfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: var(--dark);
  color: var(--light);
}
</style>
