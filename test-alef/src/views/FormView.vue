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
    <div class="personal-container">

        <h1 class="title">Персональные данные</h1>

        <div v-for="(adult, adultIndex) in personalDataStore.$state.data" :key="adultIndex">

            <div class="adult-data">

                <div class="form-control">

                    <label for="adult.name">Имя</label>

                    <input
                        type="text"
                        id="adult.name"
                        v-model="adult.name"
                        class="user-name"
                        required
                    >
                </div>

                <div class="form-control">

                    <label for="adult.age">Возраст</label>
                    <input
                        type="number"
                        id="adult.age"
                        v-model="adult.age"
                        class="user-age"
                        min="14"
                        required>
                </div>

            </div>

            <div class="children-data">

                <div class="children-data-header">
                    <h2 class="title">Дети (макс.5)</h2>

                    <button type="submit" v-if="personalDataStore.checkChildrenCount(adultIndex)"
                            @click="addChild(adultIndex)" class="add-button">Добавить ребенка
                    </button>
                </div>

                <div v-for="(child, childIndex) in adult.children" :key="childIndex">
                    <div class="name children-container">

                        <div class="form-control">
                            <label :for="'child-name-' + childIndex">Имя</label>
                            <input
                                type="text"
                                v-model="child.name"
                                :id="'child-name-' + childIndex"
                                required
                            >
                        </div>

                        <div class="form-control">

                            <label :for="'child-age-' + childIndex">Возраст</label>
                            <input
                                type="number"
                                v-model="child.age"
                                :id="'child-age-' + childIndex"
                                class="user-age"
                                min="0"
                                required
                            >
                        </div>

                        <button type="submit" @click="removeChild(adultIndex, childIndex)" class="delete-button">
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

.form-control {
    width: 100%;
    height: 56px;
    margin: 0 18px 10px 0;
    position: relative;
}

.form-control input {
    display: block;
    outline: none;
    width: 100%;
    height: 56px;
    background: #fff;
    border: 1px solid var(--color-greyL);
    border-radius: 6px;
    font-size: 13px;
    color: var(--color-black);
    font-family: inherit;
    cursor: pointer;
    padding: 0 0 0 16px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

input[type='number'] {
    -moz-appearance: textfield;
}

.form-control label {
    padding: 3px 0 0 0;
    cursor: pointer;
    display: block;
    position: absolute;
    left: 15px;
    color: #aaa;
    font-size: 13px;
    -webkit-transition: .2s;
    transition: .2s;
}

.form-control input:valid + label,
.form-control input:focus + label {
    top: 0;
    font-size: 13px;
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
    background: #fff;
    border: 2px solid var(--color-primary);
    border-radius: 24px;
    font-size: 14px;
    color: var(--color-primary);
    line-height: 24px;
    cursor: pointer;
    margin-bottom: 11px;
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
