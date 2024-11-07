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

            <div class="name">

                <div class="form-control">

                    <label for="'adult-name-' + adultIndex">Имя</label><br>

                    <input type="text" id="'adult-name-' + adultIndex" v-model="adult.name" class="user-name"
                           required><br>
                </div>

                <div class="form-control">

                    <label for="'adult-age-' + adultIndex">Возраст</label><br>
                    <input type="number" id="'adult-age-' + adultIndex" v-model="adult.age" class="user-age" min="14"
                           required>
                </div>

            </div>

            <div class="children-data">
                <h2>Дети (макс.5)</h2>

                <button type="submit" @click="addChild(adultIndex)">Добавить
                    ребенка
                </button>
                <div v-for="(child, childIndex) in adult.children" :key="childIndex">
                    <div class="name">

                        <div class="form-control">
                            <label for="'child-name-' + adultIndex + '-' + childIndex">Имя</label><br>
                            <input
                                type="text"
                                v-model="child.name" id="'child-name-' + adultIndex + '-' + childIndex"
                                class="user-name"
                                required
                            ><br>
                        </div>

                        <div class="form-control">

                            <label for="child-age">Возраст</label><br>
                            <input
                                type="number"
                                v-model="child.age"
                                id="child-age"
                                class="user-age"
                                min="0"
                                required
                            >
                        </div>

                        <button type="submit" @click="removeChild(adultIndex, childIndex)">Delete</button>
                    </div>
                </div>
            </div>
        </div>

        <button type="submit" @click="saveData">Save</button>
    </div>

</template>

<style scoped>
.personal-container {
    width: 616px;
    height: 166px;
    display: flex;
    align-items: flex-start;
    margin: 76px 375px 0 375px;
    flex-direction: column;
    justify-content: center;
}

.title {
    color: var(--color-black);
    margin-top: 30px;
    margin-bottom: 20px;
    line-height: 24px;
    font-size: 16px;
    font-family: 'Montserrat', sans-serif;
}

.form-control {
    width: 616px;
    font-family: 'Montserrat', sans-serif;
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
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

input[type='number'] {
    -moz-appearance: textfield;
}

.form-control label {
    cursor: pointer;
    display: block;
    position: absolute;
    left: 15px;
    top: 18px;
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
</style>
