<template>
  <div>
    <h1 class="auth-h1">Reset passsword</h1>
    <form @submit.prevent="forgotPassword" class="auth-form">
      <label for="email" :class="{ errorchangelabel: $v.email.$anyError }">
        Email:
      </label>
      <input
        v-model="email"
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

      <p class="auth-text auth-text__forgot-password">
        <router-link :to="{ name: 'login' }" class="auth-text__link"
          >Back to login page</router-link
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
      error: null //get updated when server send error, used to display errors
    };
  },
  validations: {
    email: {
      required,
      email
    }
  },
  methods: {
    forgotPassword() {
      this.error = null;
      this.$store
        .dispatch("forgotPassword", {
          email: this.email
        })
        //then redirect to default app
        .then(() => {
          this.$router.push({ name: "messagepage" });
        })
        //error handeling
        .catch(error => {
          this.error = error.response.data.message;
        });
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
