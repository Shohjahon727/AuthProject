<template>
    <div class="form-signin w-100 m-auto mt-3">
        <form class=" p-2 mx-auto w-25">
            <h1 class="fw-normal">Please Register</h1>
            <div v-if="errorMessage" class="alert alert-danger">{{errorMessage}}</div>
            <Input :label="'User Name'" :type="'text'" v-model="username"/>
            <Input :label="'Password'" :type="'password'" v-model="password"/>
            <Button type="submit" :disabled="isLoading" @click="submitHandler">Register</Button>
        </form>
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
            password: '',
            errorMessage: ''
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

            // if(!this.isDisabled) {
            this.errorMessage = '';
            
            if(!this.username) {
                this.errorMessage = 'Username is required field'
                return;
            }
           
            if(!this.password) {
                this.errorMessage = 'Password is required field'
                return;
            }
            
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/; //(?=.*[@$!%*?&])
            if (!passwordRegex.test(this.password)) {
                this.errorMessage = 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character';
                return;
            }
                const data = {
                    username: this.username,
                    password: this.password
                }
                this.$store.dispatch('register',data).then(user => {
                    this.$router.push({name:'login'})
                })
                .catch(error => {
                    this.errorMessage = error.response.data 
                })
            // }
        }
    }
}
</script>