<script setup>
import {RouterLink, RouterView} from 'vue-router'
</script>

<template>
    <header class="header">
        <div class="container">
            <img src="./assets/logoAlef.svg" alt="Logo" class="logo">

            <nav class="menu">
                <RouterLink to="/form" class="nav-form">Форма</RouterLink>
                <RouterLink to="/preview">Превью</RouterLink>
            </nav>
        </div>
    </header>

    <RouterView/>
</template>

<style scoped>
.header {
    height: 76px;
    display: flex;
    align-items: center;
}

.container {
    display: flex;
    align-items: center;
    justify-content: normal;
    max-width: 1200px;
    margin: 0 auto;
}

a {
    text-decoration: none;
    color: var(--color-grey);
    cursor: pointer;
}

.nav-form {
    margin-right: 1rem;
}

.logo {
    margin: 0 41px 0 41px;
}

.logo img {
    vertical-align: bottom;
}

.menu {
    margin-left: 432px;
    margin-right: 574px;
}
</style>
