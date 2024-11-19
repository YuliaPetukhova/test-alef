<script>
export default {
    name: 'FormInputs',
    props: {
        modelValue: {
            type: Object,
            required: true
        },
        min: {
            type: Number,
            default: 0
        },
        inputClass: {
            type: String,
            default: ''
        },
    },
    emits: ['update:modelValue'],
    data() {
        return {
            isValid: false,
            errorMessage: '',
        };
    },

    computed: {
        isValid() {
            return this.modelValue.age >= this.min;
        }
    },

    watch: {
        isValid(newValue) {
            if (!newValue) {
                this.errorMessage = `Минимальный возраст ${this.min} лет`;
            } else {
                this.errorMessage = '';
            }
        }
    },

    methods: {
        updateName(event) {
            this.$emit('update:modelValue', {
                ...this.modelValue,
                name: event.target.value
            })
        },
        updateAge(event) {
            const newAge = event.target.value;
            this.$emit('update:modelValue', {
                ...this.modelValue,
                age: newAge
            })
        },
    }
}
</script>

<template>
    <div class="form-control">
        <label>Имя</label>
        <input
            type="text"
            :value="modelValue.name"
            required
            @input="updateName($event)"
        />
    </div>

    <div class="form-control">
        <label>Возраст</label>
        <input
            type="number"
            :value="modelValue.age"
            :min="min"
            required
            @input="updateAge($event)"
            :class="{ 'isValid': isValid }"/>
        <div v-if="!isValid" class="error-message">{{ errorMessage }}</div>
    </div>
</template>

<style scoped>
.form-control {
    width: 100%;
    height: 56px;
    margin: 0 18px 10px 0;
    position: relative;
}

.form-control input {
    width: 100%;
    height: 56px;

    padding: 0 0 0 16px;

    display: block;

    outline: none;
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

input::-ms-clear {
    display: none;
}

.form-control label {
    padding: 3px 0 0 0;

    display: block;

    position: absolute;
    left: 15px;

    color: #aaa;
    font-size: 13px;
    -webkit-transition: .2s;
    transition: .2s;
    cursor: pointer;
}

.form-control label:hover + input, .form-control input:hover {
    box-shadow: 0 0 20px 2px var(--color-greyL);
    border: 1px solid white;
}

.form-control input.isValid {
    background-color: var(--color-error-background);
    box-shadow: 0 0 20px 2px var(--color-error-background);
    border: none;
}

.error-message {
    margin-top: 0.25rem;

    color: var(--color-error-title);
    font-size: 0.875rem;
}
</style>
