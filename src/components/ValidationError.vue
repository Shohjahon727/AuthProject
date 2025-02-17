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
        
        computed: {
            errorMessages(){
                return ['username is required field','password is required field']
        }
        }
    }
</script>