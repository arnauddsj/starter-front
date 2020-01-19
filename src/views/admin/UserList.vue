<template>
  <div class="container-admin">
    <h1>ADMIN PANNEL</h1>
    <router-link :to="{ name: 'main' }">Back to front</router-link>
    <div class="user__list">
      <div v-for="user in users.userList" :key="user._id">
        <div class="user-list">
          <p>Name: {{ user.name }}</p>
          <p>Email: {{ user.email }}</p>
          <p>Company: {{ user.company }}</p>
          <p v-if="user.lastLogin">
            Last login: {{ user.lastLogin | formatDate }}
          </p>
          <p v-else>Last login: Never</p>
          <button @click="updateUserStatus(user)">
            Active: {{ user.isActive }}
          </button>
          <button class="delete-button" @click="deleteUser(user._id)">
            DELETE
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("admin", ["users"])
  },
  created() {
    // Fetch data from API
    this.$store.dispatch("admin/fetchUserList").catch(error => {
      this.errors = error.response.data.data;
    });
  },
  methods: {
    updateUserStatus(user) {
      this.$store
        .dispatch("admin/updateStatus", {
          userEmail: user.email,
          userId: user._id
        })
        .then(() => {
          this.$store.dispatch("admin/fetchUserList");
        });
    },
    deleteUser(id) {
      this.$store
        .dispatch("admin/deleteUser", {
          userId: id
        })
        .then(() => {
          this.$store.dispatch("admin/fetchUserList");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.container-admin {
  padding: 3rem;
}
.user-list {
  margin-top: 2rem;
}

.delete-button {
  display: inline-block;
  margin: 2rem;
}
</style>
