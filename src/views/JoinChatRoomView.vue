<template>
  <main>
    <h1>Join Chat Room</h1>
    <form @submit.prevent="joinChatRoom">
      <label for="chatRoomName">Chat Room Name</label>
      <input
        type="text"
        id="chatRoomName"
        v-model="chatRoomName"
        placeholder="Enter chat id"
      />
      <button type="submit">Join</button>
    </form>
  </main>
</template>

<style lang="scss" scoped>
main {
  padding: 2rem;
}
h1 {
  text-align: center;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
form input {
  width: 100%;
  padding: 1rem;
  border: solid;
  border-radius: 10px;
  border-color: var(--primary);
  font-size: 1.2rem;
  background-color: var(--secondary);
  color: var(--light);
}
form input:focus {
  outline: none;
}
form button {
  width: 100%;
  padding: 1rem;
  border: solid;
  border-radius: 10px;
  border-color: var(--primary);
  background-color: var(--secondary);
  color: var(--light);
  font-size: 1.2rem;
  cursor: pointer;
}
form button:hover {
  background-color: var(--primary);
}
</style>

<script lang="ts">
import { joinChatRoom } from "@/api/chat";
import { defineComponent } from "vue";
import { useToast } from "vue-toastification";

export default defineComponent({
  data: () => ({
    chatRoomName: "",
  }),
  methods: {
    async joinChatRoom() {
      const toast = useToast();
      const res = await joinChatRoom(this.chatRoomName);
      if (res.status === 200) {
        toast.success("Joined chat room");
        this.$router.push(`/chat/${this.chatRoomName}`);
      }
    },
  },
});
</script>
