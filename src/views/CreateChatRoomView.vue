<template>
  <main>
    <h1>Create Chat Room</h1>
    <form @submit.prevent="createChatRoom">
      <input
        type="text"
        id="chatRoomName"
        v-model="chatRoomName"
        placeholder="Enter chat room name"
      />
      <input
        type="text"
        id="chatRoomDescription"
        v-model="chatRoomDescription"
        placeholder="Enter chat room description"
      />
      <input
        type="text"
        id="chatRoomPicUrl"
        v-model="chatRoomPicUrl"
        placeholder="Enter chat room picture url"
      />
      <button type="submit">Create</button>
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
import { createChatRoom } from "@/api/chat";
import { useToast } from "vue-toastification";

export default {
  name: "CreateChatRoomView",
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      chatRoomName: "",
      chatRoomDescription: "",
      chatRoomPicUrl: "",
    };
  },
  methods: {
    async createChatRoom() {
      await createChatRoom(
        this.chatRoomName,
        this.chatRoomDescription,
        this.chatRoomPicUrl
      )
        .then((response) => {
          this.toast.success("Chat room created");
          console.log(response);
          this.$router.push("/chat");
        })
        .catch((error) => {
          this.toast.error("Error creating chat room");
          console.log(error);
        });
    },
  },
};

/*
export default defineComponent({

  data: () => ({
    chatRoomName: "",
    chatRoomDescription: "",
    chatRoomPicUrl: "",
  }),
  methods: {
    async createChatRoom() {
      const res = await createChatRoom(
        this.chatRoomName,
        this.chatRoomDescription,
        this.chatRoomPicUrl
      );
      console.log(res.data.chat_id);
    },
  },
});
*/
</script>
