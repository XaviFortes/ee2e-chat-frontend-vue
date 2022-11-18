<template>
  <div class="activate">
    <h1 class="title">Activate Account</h1>
    <form class="form" @submit.prevent="activate">
      <label class="form-label" for="#user_id">UUID:</label>
      <input
        v-model="user_id"
        class="form-input"
        type="text"
        id="user_id"
        required
        placeholder="UUID (string of 36 characters)"
      />
      <label class="form-label" for="#code">Code:</label>
      <input
        v-model="code"
        class="form-input"
        type="text"
        id="code"
        required
        placeholder="Code (string of 6 characters)"
      />
      <input class="form-submit" type="submit" value="Activate Account" />
    </form>
    <button class="form-submit" @click="resendActivationCode">
      Resend activation code
    </button>
  </div>
</template>

<script lang="ts">
import { activate, resendActivation } from "@/api/auth";
import { useToast } from "vue-toastification";
export default {
  setup() {
    const toast = useToast();
    return { toast };
  },
  data: () => ({
    user_id: "",
    code: "",
    error: false,
  }),
  methods: {
    async resendActivationCode() {
      try {
        // Prompt get mail from user
        const email = prompt("Enter your email");
        if (email) {
          await resendActivation(email);
          this.toast.success("Activation code sent");
        }
      } catch (error: any) {
        this.toast.error(error.message);
      }
    },
    async activate() {
      try {
        await activate(this.user_id, this.code);
        this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.activate {
  padding: 2rem;
}
.title {
  text-align: center;
  color: darkgray;
}
.form {
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  min-width: 350px;
  max-width: 100%;
  background: rgba(19, 35, 47, 0.9);
  border-radius: 5px;
  padding: 40px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
}
.form-label {
  margin-top: 2rem;
  color: white;
  margin-bottom: 0.5rem;
  &:first-of-type {
    margin-top: 0rem;
  }
}
.form-input {
  padding: 10px 15px;
  background: none;
  background-image: none;
  border: 1px solid white;
  color: white;
  &:focus {
    outline: 0;
    border-color: #1ab188;
  }
}
.form-submit {
  background: #1ab188;
  border: none;
  color: white;
  margin-top: 3rem;
  padding: 1rem 0;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #0b9185;
  }
}
.error {
  margin: 1rem 0 0;
  color: #ff4a96;
}
</style>
