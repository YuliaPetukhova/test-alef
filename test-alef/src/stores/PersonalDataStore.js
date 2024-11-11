import {defineStore} from 'pinia'

export const usePersonalDataStore = defineStore('personalDataStore', {
    state: () => ({
        data: {},
    }),

    actions: {
        saveData(adult) {
            this.data = adult;
            localStorage.setItem('personalData', JSON.stringify(this.data));
        },
    }
});
