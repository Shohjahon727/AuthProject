<template>
     <div class="form-signin w-100 m-auto mt-3">
        <div class=" p-2 mx-auto w-25">
            <h1 class="fw-normal">Please Login</h1>

            <Input :label="'Name'" :type="'text'" v-model="username"/>
            <Input :label="'Password'" :type="'password'" v-model="password"/>
            <Button type="submit" :disabled="isLoading" @click="submitHandler">Login</Button>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
    export default {
        data() {
            return {
                username: '',
                password: ''
            }
        },

        computed: {
            ...mapState({
                isLoading: state => state.auth.isLoading,
            }),
            // isLoading() {
            //     return this.$store.state.auth.isLoading
            // },
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
                    this.$store.dispatch('login',data).then(user => {
                        this.$router.push({name: 'home'})
                    })
                }
                
            }
        }
    }
</script>