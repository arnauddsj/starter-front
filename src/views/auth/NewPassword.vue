<template>
  <div>
    <form @submit.prevent="resetPassword">
      <label for="password">
        New Password:
      </label>
      <input
        v-model="password"
        type="password"
        name="password"
        @blur="$v.email.$touch()"
        class="auth-input"
        value
      />

      <div class="auth-submit">
        <div class="auth-submit__left">
          <span class="auth-error auth-error__message">{{ error }}</span>
        </div>
        <button
          type="submit"
          name="button"
          :disabled="$v.$invalid"
          class="auth-submit__button"
          :class="{ disabledButton: $v.$invalid }"
        >
          Reset password
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import { required, password } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      password: "",
      token: this.$route.params.token,
      email: this.$route.params.email,
      error: null //get updated when server send error, used to display errors
    };
  },
  validations: {
    password: {
      required,
      password
    }
  },
  methods: {
    resetPassword() {
      // Call vuex action Login with payload (email password...)
      this.$store
        .dispatch("resetPassword", {
          password: this.password,
          // Import token from slug
          email: this.email,
          token: this.token
        })
        //then redirect to default app
        .then(() => {
          this.$router.push({ name: "main" });
        })
        //error handeling
        .catch(error => {
          console.log("An error occurred:", error.response);
          this.error = error.response.data.message;
        });
    }
  }
};
</script>
