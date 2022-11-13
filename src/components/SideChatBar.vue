<template>
  <main>
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
  </main>
</template>

<script lang="ts">

</script>
