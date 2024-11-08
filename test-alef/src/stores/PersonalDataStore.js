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
        maxChildren: 5,
    }),

    actions: {
        saveData() {
            localStorage.setItem('personalData', JSON.stringify(this.data));
        },

        checkChildrenCount(adultIndex) {
            return this.data[adultIndex].children.length < this.maxChildren;
        },

        addChild(adultIndex, child) {
            if (this.data[adultIndex].children.length < this.maxChildren) {
                this.data[adultIndex].children.push(child);
            }
        },

        removeChild(adultIndex, childIndex) {
            this.data[adultIndex].children.splice(childIndex, 1);
        }
    }
});
