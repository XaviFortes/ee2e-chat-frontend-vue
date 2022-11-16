<template>
  <main>
    <!-- Get all messages with v-for -->
    <ul id="msgs">
      <li v-for="message in messages" :key="message.msg_uuid">
        <!-- Get the user based on message sender -->
        <!-- Wait for the user to get the image -->
        <img
          v-if="message.user"
          :src="message.user.profile_pic"
          alt="User Picture"
        />
        <div>
          <h3 v-if="message.user" id="userNick">{{ message.user.nick }}</h3>
          <p>{{ message.msg_txt }}</p>
          <!-- Include datetime formatted -->
          <small id="msgDate">{{ message.sent_datetime }}</small>
        </div>
      </li>
    </ul>
    <!-- Create a form to send messages -->
    <form id="msgForm" @submit.prevent="sendMessage">
      <input
        type="text"
        id="msgInput"
        placeholder="Type a message..."
        v-model="messageInput"
      />
      <button type="submit">Send</button>
    </form>
    <!-- Include the SideChatBar -->
    <div id="sideChatBar">
      <h3>Info</h3>
      <!-- Modify chat name by clicking on it -->
      <h2 @click="editChatName">{{ chatName }}</h2>
      <!-- Mofify picture and description by clicking on it -->
      <img :src="chatPic" alt="Chat Picture" @click="editChatPic" />
      <p @click="editChatDescription">{{ chatDescription }}</p>
      <h3>Members</h3>
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
  </main>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import {
  getMessages,
  sendMessage,
  modifyChatRoom,
  getChat,
  getChatUsers,
} from "@/api/chat";
import { getUser } from "@/api/user";

let chat_url_id: string;

function scrollToBottom() {
  // Scroll to bottom of messages
  // Wait for all messages to be rendered before scrolling
  setTimeout(() => {
    const msgs = document.getElementById("msgs");
    if (msgs) {
      msgs.scrollTop = msgs.scrollHeight;
    }
  }, 100);
}

async function getInfo(this: any, uuid: string) {
  // Get chat name, description and picture from the uuid in database
  const chatInfo = await getChat(uuid);
  console.log(chatInfo);
  this.chatName = chatInfo.data.chat_name;
  this.chatDescription = chatInfo.data.chat_desc;
  this.chatPic = chatInfo.data.chat_pic;
  // Get the members of the chat
  const chatMembers = await getChatUsers(chat_url_id);
  console.log(chatMembers);
  // For chatMembers uuid get the user info
  for (let i = 0; i < chatMembers.data.length; i++) {
    const user = await getUser(chatMembers.data[i].user_uid);
    this.members.push(user.data);
  }
}

async function getMessagesFunc(this: any) {
  const chatid = chat_url_id as string;
  const res = await getMessages(chatid);
  // Update only if the messages are different array length
  if (this.messages.length !== res.data.length) {
    console.log("New messages");
    // Replace date before sending to the v-for loop
    for (let i = 0; i < res.data.length; i++) {
      res.data[i].sent_datetime = new Date(
        res.data[i].sent_datetime
      ).toLocaleString();
      const user = await getUser(res.data[i].from_uid);
      res.data[i].user = user.data;
      // Get the user based on the message sender
    }
    this.messages = await res.data;
    scrollToBottom();
  }
}

export default {
  data() {
    return {
      chatName: "Sample Name",
      chatDescription: "",
      chatPic: "",
      members: [
        {
          user_id: "",
          nick: "",
          email: "",
          profile_pic: "",
        },
      ],
      messages: [
        {
          msg_uuid: "",
          msg_txt: "",
          sent_datetime: "",
          from_uid: "",
          // Solve message.user undefined
          user: {
            nick: "",
            profile_pic: "",
          },
        },
      ],
      messageInput: "",
      messagesLength: 0,
    };
  },
  // Create sendMessage function
  methods: {
    async sendMessage() {
      const chat_id = chat_url_id as string;
      // Send message to the API
      const res = await sendMessage(chat_id, this.messageInput);
      console.log(res.data);
      // Clear the input
      this.messageInput = "";
      // Get the new messages with the new message, don't show until the message is in the array
      await getMessagesFunc.call(this);
    },
    async editChatName() {
      const chat_id = chat_url_id as string;
      const newChatName = prompt("New chat name");
      if (newChatName) {
        const res = await modifyChatRoom({
          chat_id: chat_id,
          name: newChatName,
        });
        console.log(res.data);
        this.chatName = newChatName;
      }
    },
    async editChatPic() {
      const chat_id = chat_url_id as string;
      const newChatPic = prompt("New chat picture");
      if (newChatPic) {
        const res = await modifyChatRoom({
          chat_id: chat_id,
          pic_url: newChatPic,
        });
        console.log(res.data);
        this.chatPic = newChatPic;
      }
    },
    async editChatDescription() {
      const chat_id = chat_url_id as string;
      const newChatDescription = prompt("New chat description");
      if (newChatDescription) {
        const res = await modifyChatRoom({
          chat_id: chat_id,
          desc: newChatDescription,
        });
        console.log(res.data);
        this.chatDescription = newChatDescription;
      }
    },
  },
  async mounted() {
    // Get the chat id from the url
    const route = useRoute();
    chat_url_id = route.params.chat_id as string;
    // Remove sample user
    this.members = [];
    await getInfo.call(this, chat_url_id);
    // Get the messages
    await getMessagesFunc.call(this);
    // Get the messages every 3 seconds
    setInterval(getMessagesFunc.bind(this), 3000);
  },
};
</script>

<style lang="scss" scoped>
main {
  padding-top: 0;
  padding-bottom: 0;
}
#msgs {
  overflow-y: auto;
  height: 90vh;
  width: 120vh;
}
// Send messages form styling
#msgForm {
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
}
#msgInput {
  width: 100%;
  height: 100%;
  border: none;
  padding: 0 1rem;
  font-size: 1.2rem;
  background-color: var(--secondary);
  color: var(--light);
}
#msgInput:focus {
  outline: none;
}
#msgForm button {
  width: 10%;
  height: 100%;
  border: none;
  border-radius: 10px;
  background-color: var(--secondary);
  color: var(--light);
  font-size: 1.2rem;
  cursor: pointer;
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
  flex-direction: column;
  justify-content: center;
}
li {
  display: flex;
  border: 1px solid var(--light);
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
}
div {
  margin-left: 10px;
}
// Put userNick next to the image
#userNick {
  margin-right: 100%;
  color: var(--primary);
}
// Put msgDate to the right
#msgDate {
  margin-left: auto;
  color: darkgray;
}
small {
  font-size: 0.6rem;
}
// Menu styling
#menu {
  position: absolute;
  right: 0;
  top: 0;
  width: 20%;
  height: 100%;
  background-color: var(--primary);
  border-radius: 0 0 0 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
#menuBtn {
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  background-color: var(--secondary);
  color: var(--light);
  font-size: 1.2rem;
  cursor: pointer;
}
#menuContent {
  width: 100%;
  height: 100%;
  background-color: var(--secondary);
  border-radius: 0 0 0 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
#menuContent h3 {
  color: var(--light);
}
#chatSettings {
  display: flex;
  align-items: center;
}
#chatPic {
  position: relative;
  width: 50px;
  height: 50px;
  margin-right: 1rem;
}
#chatPic img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
#changePicBtn {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 50%;
  background-color: var(--primary);
  color: var(--light);
  font-size: 0.8rem;
  cursor: pointer;
}
#chatInfo {
  display: flex;
  flex-direction: column;
}
#chatName {
  color: var(--light);
}
#chatDescription {
  color: var(--light);
}
#chatActions {
  display: flex;
  flex-direction: column;
}
#chatActions button {
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 10px;
  background-color: var(--primary);
  color: var(--light);
  font-size: 1.2rem;
  cursor: pointer;
  margin-bottom: 1rem;
}
#chatActions button:hover {
  background-color: var(--secondary);
}
</style>
