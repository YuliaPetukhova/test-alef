<script>
import {usePersonalDataStore} from "@/stores/PersonalDataStore.js";
import {defineComponent} from "vue";
import {useRouter} from 'vue-router';
import FormInput from "@/components/FormInput.vue";

export default defineComponent({

    components: {FormInput},

    setup() {
        const personalDataStore = usePersonalDataStore()
        const router = useRouter();

        return {
            personalDataStore,
            router,
        };
    },

    data() {
        return {
            adult: {
                name: null,
                age: null,
                children: [],
            },
            maxChildrenNumber: 5,
        }
    },

    methods: {
        addChild() {
            this.adult.children.push({name: '', age: null});
        },

        checkChildrenCount() {
            return this.adult.children.length < this.maxChildrenNumber;
        },

        removeChild(childIndex) {
            this.adult.children = this.adult.children.filter((child, index) => index !== childIndex);
        },

        saveData() {
            let isValid = true;
            let errorMessage = '';
            if (this.adult.age < 14) {
                isValid = false;
                errorMessage = 'Минимальный возраст для взрослого - 14 лет.';
            }
            this.adult.children.forEach(child => {
                if (child.age < 0) {
                    isValid = false;
                    errorMessage = 'Возраст ребёнка не может быть отрицательным.';
                }
            });
            if (isValid) {
                this.personalDataStore.saveData(this.adult);
                this.router.push({name: 'Preview'});
            } else {
                alert(errorMessage);
            }
        },

    },
})

</script>

<template>
    <div class="personal-container">

        <h1 class="title">Персональные данные</h1>

        <div>

            <div class="adult-data">

                <FormInput
                    label="Имя"
                    v-model="adult.name"
                    :inputId="'adult-name-'"
                    inputClass="user-name"
                />

                <FormInput
                    label="Возраст"
                    type="number"
                    v-model="adult.age"
                    :inputId="'adult-age-'"
                    inputClass="user-age"
                    :min="14"
                />

            </div>

            <div class="children-data">

                <div class="children-data-header">
                    <h2 class="title">Дети (макс.5)</h2>

                    <button
                        type="submit"
                        v-if="this.checkChildrenCount()"
                        @click="addChild()"
                        class="add-button"
                    >
                        <img class="add-plus" src="../assets/plus.svg" alt="Plus add child">
                        Добавить ребенка
                    </button>
                </div>

                <div v-for="(child, childIndex) in adult.children" :key="childIndex">
                    <div class="name children-container">

                        <FormInput
                            label="Имя"
                            v-model="child.name"
                            :inputId="'child-name-' + childIndex"
                        />

                        <FormInput
                            label="Возраст"
                            type="number"
                            v-model="child.age"
                            :inputId="'child-age-' + childIndex"
                            inputClass="user-age"
                            :min="0"
                        />

                        <button type="submit" @click="removeChild(childIndex)" class="delete-button">
                            Удалить
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <button type="submit" @click="saveData" class="save-button">Сохранить</button>
    </div>

</template>

<style scoped>
.personal-container {
    display: block;
    width: 616px;
    align-items: flex-start;
    margin: 0 auto;
    flex-direction: column;
    justify-content: center;
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
    background: var(--color-primary);
    border: 2px solid var(--color-primary);
    border-radius: 24px;
    font-size: 16px;
    font-family: Montserrat, sans-serif;
    color: white;
    cursor: pointer;
    padding: 10px 20px;
    margin-top: 30px;
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
