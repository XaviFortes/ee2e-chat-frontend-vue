<template>
  <main>
    <!-- Get all messages with v-for -->
    <ul>
      <li v-for="message in messages" :key="message.msg_uuid">
        <img :src="user.profile_pic" alt="User Picture" />
        <div>
          <h3 id="userNick">{{ user.nick }}</h3>
          <p>{{ message.msg_txt }}</p>
          <!-- Include datetime formatted -->
          <small id="msgDate">{{ message.sent_datetime }}</small>
        </div>
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
import { getMessages } from "@/api/chat";
import { getUser } from "@/api/user";

export default {
  data() {
    return {
      messages: [
        {
          msg_uuid: "",
          msg_txt: "",
          sent_datetime: "",
          from_uid: "",
        },
      ],
      user: {
        nick: "",
        profile_pic: "",
      },
    };
  },
  async mounted() {
    const route = useRoute();
    const chatid = route.params.chat_id as string;
    const res = await getMessages(chatid);
    console.log(res.data);
    this.messages = res.data;
    for (let i = 0; i < this.messages.length; i++) {
      // Format datetime to be more readable
      this.messages[i].sent_datetime = new Date(
        this.messages[i].sent_datetime
      ).toLocaleString();
      const resu = await getUser(this.messages[i].from_uid);
      this.user = resu.data;
    }
    console.log(this.user);
  },
};
</script>
