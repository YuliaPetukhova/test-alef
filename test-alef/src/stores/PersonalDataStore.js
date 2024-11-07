import {defineStore} from 'pinia'

export const usePersonalDataStore = defineStore('personalDataStore', {
    state: () => ({
        data: [
            {
                name: '',
                age: null,
                children: [
                    {
                        name: '',
                        age: null
                    }
                ]
            },
        ],
    }),

    actions: {
        saveData() {
            localStorage.setItem('personalData', JSON.stringify(this.data));
        },

        addChild(adultIndex, child) {
            if (this.data[adultIndex].children.length < 5) {
                this.data[adultIndex].children.push(child);
            }
        },

        removeChild(adultIndex, childIndex) {
            this.data[adultIndex].children.splice(childIndex, 1);
        }
    }
});
