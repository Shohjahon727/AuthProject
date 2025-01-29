<template>
    <div class="form-signin w-100 m-auto mt-3">
        <div class=" p-2 mx-auto w-25">
            <h1 class="fw-normal">Please Register</h1>

            <Input :label="'User Name'" :type="'text'" v-model="username"/>
            <Input :label="'Password'" :type="'password'" v-model="password"/>
            <Button type="submit" :disabled="isDisabled" @click="submitHandler">Register</Button>
        </div>
    </div>
</template>

<script>
import apiService from '@/services/AuthService';
export default{
    data() {
        return {
            username: '',
            password: ''
        }
    },
    computed: {
        isLoading() {
            return this.$store.state.auth.isLoading 
        },
        isDisabled() {
            return this.username === '' && this.password === ''
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
                    console.log('USER',user)
                    this.$router.push({name:'home'})
                })

            }
        }
    }
}
</script>