<template>
    <h4>User Name : {{user}}</h4>
</template>

<script>
import { mapState } from 'vuex';
    export default{
        computed: {
            ...mapState({
                user: state => state.auth.user,
            })
        }
    }
</script>