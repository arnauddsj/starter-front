<template>
  <div class="container">
    <nav class="navigation">
      <router-view
        class="navigation__links"
        v-if="loggedIn"
        name="navigation"
      />
      <div class="navigation__bottom">
        <router-link v-if="adminCheck" :to="{ name: 'admin' }" class="admin-btn"
          >- ADMIN -</router-link
        >
        <button class="logout-btn" to="/" @click="logout">Logout</button>
      </div>
    </nav>
    <router-view class="container__content" />
  </div>
</template>

<script>
import { authComputed } from "@/utils/helpers";

export default {
  computed: {
    // AuthComputed Return LoggedIn State for logged user, show the router-view app. Used in v-if.
    ...authComputed,
    // adminCheck determine weather it shows admin link or not. Used in v-if.
    adminCheck() {
      return this.$store.getters.isAdmin;
    }
  },
  methods: {
    // LOGOUT BUTTON
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.navigation {
  &__bottom {
    display: flex;
    flex-direction: column;
  }
  display: flex;
}
.logout-btn {
  margin-top: 3rem;
}
</style>
