<template>
  <main>
    <!-- Create a top bar -->
    <div id="topBar">
      <!-- Create a button to go back -->
      <button id="backBtn" title="Go Back" @click="goBack">
        <font-awesome-icon icon="fa-solid fa-arrow-left" />
      </button>
      <!-- Create a button to make a new ChatRoom -->
      <button id="newChatBtn" title="Create a chat" @click="createChatRoom">
        <font-awesome-icon icon="fas fa-plus" />
      </button>
      <!-- Create a button to join a ChatRoom -->
      <button id="joinChatBtn" title="Join a chat" @click="joinChatRoom">
        <font-awesome-icon icon="fas fa-sign-in-alt" />
      </button>
      <!-- Create a button to logout -->
      <button id="logoutBtn" title="Log Out" @click="logout">
        <font-awesome-icon icon="fas fa-sign-out-alt" />
      </button>
      <!-- Create a title -->
      <h1 id="title">{{ title }}</h1>
    </div>
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
// Add spacing between buttons
button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  height: 7vh;
  background-color: var(--primary);
}

img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 15px;
  margin-right: 10px;
  vertical-align: middle;
}
li > div {
  display: flex;
  align-items: center;
}
#topBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  height: 7vh;
  background-color: var(--primary);
}
#title {
  font-size: 1.5rem;
  color: var(--light);
}
#backBtn,
#newChatBtn,
#joinChatBtn,
#logoutBtn {
  border: none;
  background-color: transparent;
  color: var(--light);
  font-size: 1.5rem;
  cursor: pointer;
}
#backBtn:hover,
#newChatBtn:hover,
#joinChatBtn:hover,
#logoutBtn:hover {
  color: var(--primary-alt);
}
ul {
  list-style: none;
  padding: 0 1rem;
}
li {
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid var(--primary-alt);
}
li:last-child {
  border-bottom: none;
}
li > a {
  text-decoration: none;
  color: var(--light);
  font-size: 1.2rem;
}
li > a:hover {
  color: var(--primary-alt);
}
</style>

<script lang="ts">
// If user is not logged in or cookie is expired, redirect to login

import { getChatRooms } from "@/api/chat";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
console.log(getChatRooms());

// Create a new Vue instance
export default {
  // Create a data object
  data() {
    return {
      // Create a title
      title: "Chat Rooms",
      // Create a chats array
      chats: [
        {
          chat_id: 0,
          chat_name: "",
          chat_pic: "",
        },
      ],
    };
  },
  // Create a mounted function
  mounted() {
    // Get the chat rooms
    this.getChatRooms();
  },
  // Create a methods object
  methods: {
    // Create a function to get the chat rooms
    async getChatRooms() {
      // Get the chat rooms
      const res = await getChatRooms();
      // Set the chats array to the response data
      this.chats = res.data;
    },
    // Create a function to go back
    goBack() {
      // Go back
      this.$router.go(-1);
    },
    // Create a function to create a chat room
    createChatRoom() {
      // Go to the create chat room view
      this.$router.push("/createChatRoom");
    },
    // Create a function to join a chat room
    joinChatRoom() {
      // Go to the join chat room view
      this.$router.push("/joinChatRoom");
    },
    // Create a function to logout
    logout() {
      // Go to the logout view
      this.$router.push("/logout");
    },
  },
  components: { FontAwesomeIcon },
};
//const interval = setInterval(getChatRooms, 30000);
//console.log(interval);
</script>
