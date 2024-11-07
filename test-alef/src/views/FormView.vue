<script>
import {usePersonalDataStore} from "@/stores/PersonalDataStore.js";
import {defineComponent, ref} from "vue";
import {useRouter} from 'vue-router';

export default defineComponent({

        setup() {
            const personalDataStore = usePersonalDataStore()
            const data = ref(personalDataStore.data)
            const router = useRouter();

            return {
                personalDataStore,
                data,
                router
            };
        },

        methods: {
            addChild(adultIndex) {
                this.personalDataStore.addChild(adultIndex, {name: '', age: null});
            },

            removeChild(adultIndex, childIndex) {
                this.personalDataStore.removeChild(adultIndex, childIndex);
            },

            saveData() {
                console.log('Saved Data:', this.personalDataStore.data);
                this.personalDataStore.saveData();
                this.router.push({name: 'Preview'});
            },

            resetForm() {
                this.personalDataStore.data.forEach(adult => {
                        adult.name = '';
                        adult.age = null;
                        adult.children = [];
                    }
                );
            },

        },
        watch: {
            '$route': {
                handler() {
                    this.resetForm();
                },
                immediate: true
            }
        }
    }
)

</script>


<template>
    <div class="title">Персональные данные</div>

    <div v-for="(adult, adultIndex) in personalDataStore.$state.data" :key="adultIndex">

        <div class="name">
            <label for="'adult-name-' + adultIndex">adult name:</label><br>
            <input type="text" id="'adult-name-' + adultIndex" v-model="adult.name" class="user-name"><br>

            <label for="'adult-age-' + adultIndex">adult age:</label><br>
            <input type="number" id="'adult-age-' + adultIndex" v-model="adult.age" class="user-age">
        </div>

        <div class="children-data">
            <h1>Дети (макс.5)</h1>

            <button type="submit" @click="addChild(adultIndex)">Добавить
                ребенка
            </button>
            <div v-for="(child, childIndex) in adult.children" :key="childIndex">
                <div class="name">

                    <label for="'child-name-' + adultIndex + '-' + childIndex">child name:</label><br>
                    <input type="text" v-model="child.name" id="'child-name-' + adultIndex + '-' + childIndex"
                           class="user-name"><br>

                    <label for="child-age">child age:</label><br>
                    <input type="number" v-model="child.age" id="child-age" class="user-age">

                    <button type="submit" @click="removeChild(adultIndex, childIndex)">Delete</button>
                </div>
            </div>
        </div>
    </div>

    <button type="submit" @click="saveData">Save</button>

</template>

<style scoped>
</style>
