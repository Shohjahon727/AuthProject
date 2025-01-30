<template>
    <div>
      <div class="d-flex flex-column flex-md-row align-items-center py-3 mb-4 border-bottom">
        <a class="d-flex align-items-center link-body-emphasis text-decoration-none">
          <img :src="logo" alt="Bu yerda logotip turadi"  style="height: 40px; cursor: pointer;" @click="toHomeHandler"/> 
        </a>
        <nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
          <template v-if="isLoggedIn">
          <a class="me-3 py-2 link-body-emphasis text-decoration-none" href="#" @click="logout">Logout</a>
          <RouterLink :to="{name:'userdata'}" class="me-3 py-2 link-body-emphasis text-decoration-none">User Account</RouterLink>
          
          </template>
          <template v-if="!isLoggedIn">
            <RouterLink :to="{name:'register'}" class="me-3 py-2 link-body-emphasis text-decoration-none">Register</RouterLink>
            <RouterLink :to="{name:'login'}"  class="me-3 py-2 link-body-emphasis  text-decoration-none">Login</RouterLink>
          </template>
        </nav>
      </div> 
    </div>
</template>
<script>
import { RouterLink } from 'vue-router';
import { mapState } from 'vuex';
import { logo } from '@/assets';
export default{
    data() {
        return {
            logo,
        }
    },
    computed: {
      ...mapState({
        user: state => state.auth.user,
        isLoggedIn: state => state.auth.isLoggedIn
      })
    },
    methods:{
      toHomeHandler(){
        return this.$router.push({name: 'home'});
      },
      logout() {
        return this.$store.dispatch('logout')
      }
    }
}
</script>