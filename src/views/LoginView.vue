<template>
  <div class="login">
    <h1 class="title">Login in the page</h1>
    <form class="form" @submit.prevent="login">
      <label class="form-label" for="email">Email:</label>
      <input
        v-model="email"
        class="form-input"
        type="email"
        id="email"
        required
        placeholder="Email"
      />
      <label class="form-label" for="password">Password:</label>
      <input
        v-model="password"
        required
        class="form-input"
        type="password"
        id="password"
        placeholder="Password"
      />
      <p v-if="error" class="error">
        Has introducido mal el email o la contraseña.
      </p>
      <button class="form-submit" type="submit">Login</button>
      <router-link class="form-link" to="/signup">
        Not a user? Register
      </router-link>
      <router-link class="form-link" to="/activate">
        Activate account
      </router-link>
    </form>
  </div>
</template>

<script lang="ts">
import { login } from "@/api/auth";
import { useToast } from "vue-toastification";

export default {
  setup() {
    const toast = useToast();
    return { toast };
  },
  data: () => ({
    email: "",
    password: "",
    error: false,
  }),
  methods: {
    async login() {
      try {
        const res = await login(this.email, this.password);
        // Allow cookie to be used with every request and, secureset SameSite to None
        this.$cookies.config("1d", "/", "localhost", false, "None");
        this.$cookies.set("x-access-token", res.data.accessToken);
        // Set also the user in the local storage
        localStorage.setItem(
          "x-access-token",
          JSON.stringify(res.data.accessToken)
        );
        this.toast.success("Login successful");
        this.$router.push("/chat");
      } catch (error: any) {
        // If error is "User is not activated", redirect to activation view
        if (error.response.data.message === "User is not activated!") {
          this.toast.error("User is not activated!");
          this.$router.push("/activate");
        } else {
          this.toast.error("Error logging in");
          this.error = true;
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
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
.form-link {
  color: #1ab188;
  text-decoration: none;
  margin-top: 1rem;
  text-align: center;
  &:hover {
    text-decoration: underline;
  }
}
.error {
  color: red;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}
</style>
