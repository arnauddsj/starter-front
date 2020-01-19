<template>
  <div class="auth-container">
    <div class="container-grid">
      <section class="auth-content">
        <router-view />
      </section>
    </div>
  </div>
</template>

<style lang="scss">
.auth-container {
  width: 100%;
  height: 100vh;
  background-color: #cacaca;
}

.container-grid {
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 15rem 1fr 20rem;
  grid-gap: 10rem;
  align-content: center;
}

.auth-content {
  background-color: var(--white);
  border-radius: 5px;
  width: 45rem;
  grid-column: 2 / 3;
  grid-row: 2/2;
  padding: 4rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
}

.auth-label {
  display: block;
  font-size: 1.2rem;
  color: #747474;

  &:not(:first-child) {
    margin-top: 2rem;
  }
}

.auth-input {
  height: 4rem;
  border: 0;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 2px solid #c8ccd4;
  background-color: rgba(0, 0, 0, 0);
  border-color: #eaeaea;
  border-radius: 0;
  color: #223254;

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }
}
.auth-submit {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__left {
    text-align: left;
  }

  &__button {
    margin: 2rem 0rem;
    right: 2rem;
    font-size: 1.4rem;
    font-weight: 600;
    border: 2px solid #000;
    padding: 0.8rem 1rem;
  }
}

.auth-error {
  font-size: 1.4rem;
  padding: 1rem 0 0 0;
  display: flex;
  align-items: center;

  &__message {
    color: red;
  }
  &__validation {
    color: red;
  }
}

.disabledButton {
  border: 2px solid #ccc;
}

.errorchangelabel {
  color: red;
}

.auth-text {
  font-size: 1.4rem;

  &__link {
  }

  &__forgot-password {
    margin-top: 1rem;
  }
}
</style>
