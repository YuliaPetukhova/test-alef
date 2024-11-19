<script>
import {usePersonalDataStore} from "@/stores/PersonalDataStore.js";
import {defineComponent} from "vue";
import {useRouter} from 'vue-router';
import FormInputs from "@/components/FormInputs.vue";

export default defineComponent({

    components: {FormInputs},

    data() {
        return {
            personalDataStore: usePersonalDataStore(),
            router: useRouter(),
            adult: {
                name: null,
                age: null,
                children: [],
            },
            maxChildrenNumber: 5,
            minAdultAgeNumber: 16,
        };
    },

    computed: {
        canAddChild() {
            return this.adult.children.length < this.maxChildrenNumber;
        },

        isAdultAgeValid() {
            return this.adult.age >= this.minAdultAgeNumber;
        }
    },

    methods: {
        addChild() {
            this.adult.children.push({name: '', age: null});
        },

        removeChild(childIndex) {
            this.adult.children = this.adult.children.filter((child, index) => index !== childIndex);
        },

        saveData(event) {
            const form = event.target;
            if (!form.checkValidity()) {
                return;
            }

            this.personalDataStore.saveData(this.adult);
            this.router.push({name: 'Preview'});
        },
    },
})

</script>

<template>
    <div class="personal-container">

        <h1 class="title">Персональные данные</h1>

        <form @submit.prevent="saveData">

            <div>
                <div class="adult-data">
                    <FormInputs v-model="adult" :min="minAdultAgeNumber"></FormInputs>
                </div>

                <div class="children-data">

                    <div class="children-data-header">
                        <h2 class="title">Дети (макс.{{ maxChildrenNumber }})</h2>

                        <button
                            type="button"
                            v-if="canAddChild"
                            @click="addChild()"
                            class="add-button"
                        >
                            <img class="add-plus" src="../assets/plus.svg" alt="Plus add child">
                            Добавить ребенка
                        </button>
                    </div>

                    <div v-for="(child, childIndex) in adult.children" :key="childIndex">
                        <div class="name children-container">

                            <FormInputs v-model="adult.children[childIndex]"></FormInputs>

                            <button type="button" @click="removeChild(childIndex)" class="delete-button">
                                Удалить
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <button type="submit" class="save-button">Сохранить</button>
        </form>
    </div>

</template>

<style scoped>
.personal-container {
    width: 616px;

    display: block;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;

    margin: 0 auto;
}

.adult-data {
    width: 616px;
    font-family: Montserrat, sans-serif;
}

.children-data {
    margin-top: 23px;
}

.children-data-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
}

.add-button {
    width: 204px;
    height: 44px;

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;

    background: #fff;
    border: 2px solid var(--color-primary);
    border-radius: 24px;
    font-size: 14px;
    color: var(--color-primary);
    line-height: 24px;
    cursor: pointer;
    margin-bottom: 11px;
}

.add-plus {
    margin-right: 4px;
}

.children-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: space-evenly;
}

.save-button {
    padding: 10px 20px;
    margin-top: 30px;

    background: var(--color-primary);

    border: 2px solid var(--color-primary);
    border-radius: 24px;

    font-size: 16px;
    font-family: Montserrat, sans-serif;
    color: white;
    cursor: pointer;
}

.delete-button {
    background: none;
    border: none;
    font-size: 14px;
    font-family: Montserrat, sans-serif;
    color: var(--color-primary);
    cursor: pointer;
}
</style>
