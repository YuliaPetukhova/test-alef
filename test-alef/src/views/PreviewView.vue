<script>
import {defineComponent} from "vue";
import {usePersonalDataStore} from "@/stores/PersonalDataStore.js";

export default defineComponent({
    setup() {
        const personalDataStore = usePersonalDataStore();
        console.log(personalDataStore, 'personalDataStore')

        return {
            personalDataStore,
        };
    },
})

</script>

<template>
    Персональные данные
    <div class="title" v-for="(adult, adultIndex) in personalDataStore.data" :key="adultIndex">
        <div class="adult">{{ adult.name }}, {{ adult.age }}</div>

        <div>
            Дети
            <div class="title" v-for="(child, childIndex) in adult.children" :key="childIndex">
                <div class="children">{{ child.name }}, {{ child.age }}</div>
            </div>
        </div>
    </div>
</template>

<style>
@media (min-width: 1024px) {
    .preview {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}
</style>
