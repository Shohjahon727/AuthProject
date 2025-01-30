<template>
    <ul>
        <li v-for="errorMessage in errorMessages" :key="errorMessage">{{ errorMessage }}</li>
    </ul>
</template>

<script>
import { errorMessages } from 'vue/compiler-sfc';

    export default{
        props : {
            validationErrors: {
                type: Object,
                required: true
            },
        },
        updated() {
            console.log(this.validationErrors)
        },
        computed: {
            errorMessages() {
                return null
            }
        }
    }
</script>