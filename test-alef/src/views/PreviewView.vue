<script>
import {defineComponent} from "vue";
import {usePersonalDataStore} from "@/stores/PersonalDataStore.js";

export default defineComponent({
    setup() {
        const adult = usePersonalDataStore().data;

        return {
            adult,
        };
    },

    methods: {
        getAgeSuffix(age) {
            const lastDigit = age % 10;
            const lastTwoDigits = age % 100;
            if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
                return 'лет';
            } else if (lastDigit === 1) {
                return 'год';
            } else if (lastDigit >= 2 && lastDigit <= 4) {
                return 'года';
            } else {
                return 'лет';
            }
        }
    }
})
</script>

<template>
    <div class="preview-container">
        <p class="title">Персональные данные</p>

        <div>
            <div class="title-bold" v-if="adult.age !== null && adult.age !== undefined">
                {{ adult.name + ', ' }}{{ adult.age }} {{ getAgeSuffix(adult.age) }}
            </div>

            <div class="children-container">
                <p class="title">Дети</p>

                <div class="children" v-for="(child, childIndex) in adult.children" :key="childIndex">
                    <div class="title-bold" v-if="child.age !== null">
                        {{ child.name + ', ' }}{{ child.age }} {{ getAgeSuffix(child.age) }}
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>
.preview-container {
    max-width: 800px;
    margin-left: 375px;
}

.children-container {
    max-width: 176px;
    width: 100%;
    margin-top: 60px;
}

.children {
    height: 44px;
    margin-bottom: 20px;
    padding: 10px 20px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    background-color: var(--color-greyL);
    border-radius: 5px;
}

.children:last-child {
    margin-bottom: 0;
}
</style>
