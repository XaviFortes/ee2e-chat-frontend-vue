<template>
  <aside>
    <h1>Chat Name</h1>
    <!-- Modify chat name by clicking on it -->
    <div id="chatName" @click="editChatName">
      <h2>{{ chatName }}</h2>
      <img src="../assets/edit.svg" alt="Edit Chat Name" />
    </div>
    <!-- Mofify picture and description by clicking on it -->
    <div id="chatPic" @click="editChatPic">
      <img :src="chatPic" alt="Chat Picture" />
    </div>
    <div id="chatDescription" @click="editChatDescription">
      <p>{{ chatDescription }}</p>
    </div>
    <div id="chatMembers">
      <h2>Members</h2>
      <ul>
        <li v-for="member in members" :key="member.user_id">
          <img :src="member.profile_pic" alt="User Picture" />
          <div>
            <h3>{{ member.nick }}</h3>
            <p>{{ member.email }}</p>
          </div>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import { modifyChatRoom } from "@/api/chat";

export default defineComponent({
  name: "SideChatBar",
  setup() {
    // Get the chat id from the route
    const route = useRoute();
    const chatId = route.params.chat_id as string;
    console.log(chatId);

    // Get the chat name from the uuid in database
    const chatName = ref("");
    const chatPic = ref("");
    const chatDescription = ref("");
    const members = ref([
      {
        user_id: "",
        nick: "",
        email: "",
        profile_pic: "",
      },
    ]);

    // Get the chat name from the uuid in database

    // Function to edit the chat name
    const editChatName = () => {
      // Get the new chat name
      const newChatName = prompt("Enter the new chat name", chatName.value);

      // If the new chat name is not empty
      if (newChatName) {
        // Modify the chat name
        modifyChatRoom({ chat_id: chatId, name: newChatName });
        chatName.value = newChatName;
      }
    };

    // Function to edit the chat picture
    const editChatPic = () => {
      // Get the new chat picture
      const newChatPic = prompt("Enter the new chat picture", chatPic.value);

      // If the new chat picture is not empty
      if (newChatPic) {
        // Modify the chat picture
        modifyChatRoom({ chat_id: chatId, pic_url: newChatPic });

        // Update the chat picture
        chatPic.value = newChatPic;
      }
    };

    // Function to edit the chat description
    const editChatDescription = () => {
      // Get the new chat description
      const newChatDescription = prompt(
        "Enter the new chat description",
        chatDescription.value
      );

      // If the new chat description is not empty
      if (newChatDescription) {
        // Modify the chat description
        modifyChatRoom({ chat_id: chatId, desc: newChatDescription });

        // Update the chat description
        chatDescription.value = newChatDescription;
      }
    };

    return {
      chatId,
      chatName,
      chatDescription,
      chatPic,
      members,
      editChatName,
      editChatPic,
      editChatDescription,
    };
  },
});
</script>

<style lang="scss" scoped>
main {
  padding-top: 0;
  padding-bottom: 0;
}
#chatName {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  width: 100%;
  height: 7vh;
  bottom: 0;
  left: 0;
  background-color: var(--primary);
  padding: 0 1rem;
  cursor: pointer;
}
#chatPic {
  width: 100%;
  height: 40vh;
  border-radius: 10px;
  margin-top: 1rem;
  background-color: var(--primary);
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
}
#chatDescription {
  width: 100%;
  height: 10vh;
  border-radius: 10px;
  margin-top: 1rem;
  background-color: var(--primary);
  cursor: pointer;
  p {
    padding: 1rem;
  }
}
#chatMembers {
  width: 100%;
  height: 40vh;
  border-radius: 10px;
  margin-top: 1rem;
  background-color: var(--primary);
  overflow-y: scroll;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      display: flex;
      align-items: center;
      padding: 1rem;
      img {
        width: 5vh;
        height: 5vh;
        border-radius: 50%;
        margin-right: 1rem;
      }
      div {
        h3 {
          margin: 0;
        }
        p {
          margin: 0;
        }
      }
    }
  }
}
</style>
