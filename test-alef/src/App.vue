<script setup>
import {RouterLink, RouterView} from 'vue-router'
</script>

<template>
    <div>

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
        <footer class="footer">
            <div class="rights">all rights reserved</div>
        </footer>
    </div>
</template>

<style scoped>
.header {
    height: 76px;
    align-items: center;

    padding: 1rem;
}

.container {
    display: flex;
    align-items: center;

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

.footer {
    width: 100%;

    padding: 136px 0 0 0;
    margin: 0 ;
    text-align: center;
    position: relative;
    bottom: 0;
}

.rights {
    padding: 30px 0;

    background-color: var(--color-greyM);
    color: black;
}
</style>
