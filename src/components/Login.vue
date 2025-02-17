<template>
     <div class="form-signin w-100 m-auto mt-3">
        <form class=" p-2 mx-auto w-25">
            <h1 class="fw-normal">Please Login</h1>

            <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
            <Input :label="'Name'" :type="'text'" v-model="username"/>
            <Input :label="'Password'" :type="'password'" v-model="password"/>
            <Button type="submit" :disabled="isLoading" @click="submitHandler">Login</Button>
        </form>
    </div>
</template>

<script>
import {mapState} from 'vuex'
    export default {
        data() {
            return {
                username: '',
                password: '',
                errorMessage: ''
            }
        },

        computed: {
            ...mapState({
                isLoading: state => state.auth.isLoading,
            }),
            isLoading() {
                return this.$store.state.auth.isLoading
            },
            isDisabled() {
                return !(this.username && this.password)
            }
        },
        methods: {
            async submitHandler(e) {
                e.preventDefault()
                    this.errorMessage = '';
                    if(!this.username) {
                        this.errorMessage = 'Username is required field'
                        return
                    }
                    if(!this.password) {
                        this.errorMessage = 'Password is required field'
                        return
                    }
                        
                    const data = {
                        username: this.username,
                        password: this.password
                    }
                    this.$store.dispatch('login',data).then(user => {
                        this.$router.push({name:'home'})
                    })
                    .catch(error => {
                        this.errorMessage = error.response.data 
                    })
                
            }
        }
    }
</script>