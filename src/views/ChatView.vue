<template>
  <main>
    <!-- Create a section for the chat list -->
    <ul>
      <li v-for="chat in chats" :key="chat.chat_id">
        <img :src="chat.chat_pic" alt="Chat Picture" />
        <router-link :to="`/chat/${chat.chat_id}`">
          {{ chat.chat_name }}
        </router-link>
      </li>
    </ul>
  </main>
</template>

<style lang="scss" scoped>
img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 15px;
  margin-right: 10px;
  vertical-align: middle;
}
</style>

<script lang="ts">
// If user is not logged in or cookie is expired, redirect to login

import { getChatRooms } from "@/api/chat";
console.log(getChatRooms());
// Send the chats to the v-for loop
export default {
  data() {
    return {
      chats: [
        {
          chat_id: 0,
          chat_name: "",
          chat_pic: "",
        },
      ],
    };
  },
  // Get the chats when the component is mounted
  async mounted() {
    const res = await getChatRooms();
    console.log(res.data);
    this.chats = res.data;
  },
};
//const interval = setInterval(getChatRooms, 30000);
//console.log(interval);
</script>
