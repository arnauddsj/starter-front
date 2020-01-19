/* eslint-disable no-console */
<template>
  <div>
    <h1 class="auth-h1">Register</h1>
    <p class="auth-subtext">All fields are mandatory</p>
    <form @submit.prevent="register" class="auth-form">
      <!-- NAME -->
      <label
        for="name"
        class="auth-label"
        :class="{ errorchangelabel: $v.name.$anyError }"
        >Name:</label
      >
      <input
        v-model="name"
        type="text"
        name="name"
        class="auth-input"
        @blur="$v.name.$touch()"
        value
      />
      <!-- VALIDATION ERROR -->
      <div v-if="$v.name.$error">
        <p v-if="!$v.name.$model" class="auth-error auth-error__validation">
          You must enter your Name.
        </p>
      </div>
      <!-- EMAIL -->
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
      <!-- VALIDATION ERROR -->
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
      <!-- COMPANY -->
      <label
        for="company"
        class="auth-label"
        :class="{ errorchangelabel: $v.company.$anyError }"
        >Company:</label
      >
      <input
        v-model="company"
        type="text"
        name="company"
        class="auth-input"
        @blur="$v.company.$touch()"
        value
      />
      <!-- VALIDATION ERROR -->
      <div v-if="$v.company.$error">
        <p v-if="!$v.company.$model" class="auth-error auth-error__validation">
          You must enter your company name.
        </p>
      </div>
      <!-- PASSWORD -->
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
      <!-- VALIDATION ERROR -->
      <div v-if="$v.password.$error">
        <p v-if="!$v.password.$model" class="auth-error auth-error__validation">
          Enter a password, minimum 6 characters.
        </p>
        <p
          v-if="!$v.password.minLength"
          class="auth-error auth-error__validation"
        >
          Password must be at least 6 characters.
        </p>
      </div>
      <!-- SUBMIT -->
      <div class="auth-submit">
        <!-- SUBMIT ERRORS FROM SERVER -->
        <div class="auth-submit__left">
          <ul>
            <li
              v-for="(error, index) in errors"
              :key="index"
              class="auth-error auth-error__validation"
            >
              {{ error.msg }}
            </li>
          </ul>
        </div>
        <!-- SUBMIT BUTTON -->
        <button
          type="submit"
          name="button"
          :disabled="$v.$invalid"
          class="auth-submit__button"
          :class="{ disabledButton: $v.$invalid }"
        >
          Register
        </button>
      </div>
      <p class="auth-text">
        Already have an account?
        <router-link :to="{ name: 'login' }" class="auth-text__link">
          Login</router-link
        >
      </p>
    </form>
  </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
// Custom validator for authorized email to be automatic accepted after email verification.

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      company: "",
      errors: null,
      ButtonDisable: "#ccc",
      // Used to decide if admin validate manually registration or not
      adminValidation: false
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    },
    name: {
      required
    },
    company: {
      required
    }
  },
  methods: {
    register() {
      this.error = null;
      this.$v.$touch(); // Set dirty flag to true on any field
      if (!this.$v.$invalid) {
        if (this.adminValidation) {
          // User validate their email
          this.$store
            .dispatch("registerValidate", {
              email: this.email,
              password: this.password,
              name: this.name,
              company: this.company
            })
            .then(() => {
              console.log("register Validate");
              this.$router.push({ name: "registerValidate" });
            })
            .catch(error => {
              console.log("An error occurred:", error.response);
              this.errors = error.response.data.data;
            });
        } else {
          // Admin validate users
          this.$store
            .dispatch("registerPending", {
              email: this.email,
              password: this.password,
              name: this.name,
              company: this.company
            })
            .then(() => {
              console.log("register pending");
              this.$router.push({ name: "registerPending" });
            })
            .catch(error => {
              console.log("An error occurred:", error.response);
              this.errors = error.response.data.data;
            });
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.auth-h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.auth-subtext {
  margin-bottom: 2rem;
}

.authorizedDomain {
  background-color: rgb(245, 245, 245);
  color: rgb(192, 192, 192);
}
</style>
