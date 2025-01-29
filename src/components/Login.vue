<template>
     <div class="form-signin w-100 m-auto mt-3">
        <div class=" p-2 mx-auto w-25">
            <h1 class="fw-normal">Please Login</h1>

            <Input :label="'Name'" :type="'text'" v-model="username"/>
            <!-- <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingInput" placeholder="Username">
                <label for="floatingInput">Email</label>
            </div> -->
            <Input :label="'Password'" :type="'password'" v-model="password"/>
            <Button type="submit" :disabled="isDisabled" @click="submitHandler">Login</Button>
        </div>
    </div>
</template>

<script>
import { errorMessages } from 'vue/compiler-sfc';
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
            isDisabled() {
                return this.username === '' && this.password === ''
            }
        },
        methods: {
            submitHandler(e) {
                e.preventDefault()
                if(this.username != '' && this.password != '') {
                    const data = {
                        username: this.username,
                        password: this.password
                    }
                    this.$store.dispatch('login',data).then(user => {
                        console.log('USER',user)
                        this.$router.push({name: 'home'})
                    })
                }
                else {
                    return null
                }
            }
        }
    }
</script>