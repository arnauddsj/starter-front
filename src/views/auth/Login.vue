<template>
  <div>
    <h1 class="auth-h1">Sing in</h1>
    <form @submit.prevent="login" class="auth-form">
      <label
        for="email"
        class="auth-label"
        :class="{ errorchangelabel: $v.email.$anyError }"
      >
        Email:
      </label>
      <!-- The blur trigger error v-on handler-->
      <input
        v-model.lazy="email"
        type="email"
        name="email"
        @blur="$v.email.$touch()"
        class="auth-input"
        value
      />
      <div v-if="$v.email.$error">
        <p v-if="!$v.email.$model" class="auth-error auth-error__validation">
          Enter an email.
        </p>
        <p
          v-if="$v.email.$invalid && $v.email.$model"
          class="auth-error auth-error__validation"
        >
          Invalid email.
        </p>
      </div>
      <label
        for="password"
        class="auth-label"
        :class="{ errorchangelabel: $v.password.$anyError }"
        >Password:</label
      >
      <input
        v-model="password"
        type="password"
        name="password"
        @blur="$v.password.$touch()"
        class="auth-input"
        value
      />
      <div v-if="$v.password.$error">
        <p v-if="!$v.password.$model" class="auth-error auth-error__validation">
          Enter a password.
        </p>
      </div>
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
          Login
        </button>
      </div>
      <p class="auth-text">
        Don't have an account?
        <router-link :to="{ name: 'register' }" class="auth-text__link">
          Register</router-link
        >
      </p>
      <p class="auth-text auth-text__forgot-password">
        <router-link :to="{ name: 'forgotpassword' }" class="auth-text__link"
          >Forgot Password ?</router-link
        >
      </p>
    </form>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: null, //get updated when server send error, used to display errors
      ButtonDisable: "#ccc"
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  methods: {
    login() {
      this.error = null;
      this.$v.$touch(); // Set dirty flag to true on any field
      // Call vuex action Login with payload (email password...)
      if (!this.$v.$invalid) {
        this.$store
          .dispatch("login", {
            email: this.email,
            password: this.password
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
