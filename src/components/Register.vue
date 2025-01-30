<template>
    <div class="form-signin w-100 m-auto mt-3">
        <div class=" p-2 mx-auto w-25">
            <h1 class="fw-normal">Please Register</h1>
            <!-- <ValidationError v-if="validationErrors" :validationErrors="validationErrors"/> -->
            <Input :label="'User Name'" :type="'text'" v-model="username"/>
            <Input :label="'Password'" :type="'password'" v-model="password"/>
            <Button type="submit" :disabled="isLoading" @click="submitHandler">Register</Button>
        </div>
    </div>
</template>

<script>
import apiService from '@/services/AuthService';
import ValidationError from './ValidationError.vue';
import { mapState } from 'vuex';
export default{
    data() {
        return {
            username: '',
            password: ''
        }
    },
    components : {
        ValidationError
    },
    computed: {
        ...mapState({
                isLoading: state => state.auth.isLoading,

            }),
        // isLoading() {
        //     return this.$store.state.auth.isLoading 
        // },
        validationErrors() {
            return this.$store.state.auth.errors
        },
        isDisabled() {
            return !(this.username && this.password)
        }
    },
    methods: {
        submitHandler(e) {
            e.preventDefault()
            if(!this.isDisabled) {
                const data = {
                    username: this.username,
                    password: this.password
                }
                this.$store.dispatch('register',data).then(user => {
                    this.$router.push({name:'login'})
                })

            }
        }
    }
}
</script>