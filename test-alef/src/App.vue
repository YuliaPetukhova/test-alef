<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">

      <nav>
        <RouterLink to="/form" class="nav-form">Form</RouterLink>
        <RouterLink to="/preview">Preview</RouterLink>
      </nav>

    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.nav-form {
    padding-right: 1rem;
}
</style>
