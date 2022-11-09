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
  </main>
</template>

<style lang="scss" scoped>
main {
  padding-top: 0;
  padding-bottom: 0;
}
#msgs {
  overflow-y: auto;
  height: 90vh;
  width: 180vh;
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
</style>

<script lang="ts">
import { useRoute } from "vue-router";
import { getMessages, sendMessage } from "@/api/chat";
import { getUser } from "@/api/user";

let chat_url_id: string;

function scrollToBottom() {
  // Scroll to bottom of messages
  const msgs = document.getElementById("msgs");
  if (msgs) {
    msgs.scrollTop = msgs.scrollHeight;
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
    // Notify the user if there are new messages
    // Get user info if it's not already in the array
    /*if (this.message[i]. == undefined) {
        const userx = await getUser(this.messages[i].from_uid);
        this.user[i] = userx.data;
      }*/

    scrollToBottom();
  }
}

export default {
  data() {
    return {
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
  },
  async mounted() {
    // Get the chat id from the url
    const route = useRoute();
    chat_url_id = route.params.chat_id as string;
    // Get the messages
    await getMessagesFunc.call(this);
    // Get the messages every 3 seconds
    setInterval(getMessagesFunc.bind(this), 3000);
  },
};
</script>
