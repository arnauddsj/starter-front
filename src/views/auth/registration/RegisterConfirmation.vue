<template>
  <div>
    <h1 class="auth-h1">Checking</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: "",
      token: this.$route.params.token,
      email: this.$route.params.email,
      error: null //get updated when server send error, used to display errors
    };
  },
  created() {
    this.$store
      .dispatch("registerConfirmation", {
        // Import token from slug
        email: this.email,
        token: this.token
      })
      //then redirect to default app
      .then(() => {
        // If success redirect to
        this.$router.push({ name: "registerSuccess" });
        // If not success redirect to a page that let user send new checking mail
        //=== TO DO ===
      })
      //error handeling
      .catch(error => {
        this.error = error.response.data.message;
      });
  }
};
</script>

<style lang="scss" scoped>
.auth-h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 2rem;
}
</style>
