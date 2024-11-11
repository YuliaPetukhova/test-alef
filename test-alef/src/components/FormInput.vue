<script>
export default {
    name: 'FormInput',
    props: {
        label: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: 'text'
        },
        modelValue: {
            type: [String, Number],
            required: true
        },
        inputId: {
            type: String,
            required: true
        },
        inputClass: {
            type: String,
            default: ''
        },
        min: {
            type: Number,
            default: null
        },
    },
    emits: ['update:modelValue'],
    data() {
        return {
            isInvalid: false,
            errorMessage: ''
        };
    },
    methods: {
        validateInput(event) {
            let value = event.target.value;
            if (this.min !== null && value < this.min) {
                this.isInvalid = true;
                this.errorMessage = `Минимальный возраст ${this.min} лет`;
            } else {
                this.isInvalid = false;
                this.errorMessage = '';
            }
            this.$emit('update:modelValue', value);
        }
    }
};</script>

<template>

    <div class="form-control">
        <label :for="inputId">{{ label }}</label>
        <input :type="type"
               :id="inputId"
               :class="[{ 'invalid': isInvalid }, inputClass]"
               :min="min"
               required
               :value="modelValue"
               @input="validateInput"/>
    </div>
    <div v-if="isInvalid" class="error-message">{{ errorMessage }}</div>
</template>

<style scoped>

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

.form-control input.invalid {
    border-color: red;
}

.error-message {
    color: red;
    font-size: 0.875rem;
    margin-top: 0.25rem;
}
</style>
