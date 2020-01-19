<template>
  <div>
    <h1 class="auth-h1">Success !</h1>
    <div class="auth-text">
      <router-link :to="{ name: 'login' }">Login now !</router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth-h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 2rem;
}
</style>
