<template>
    <h4>User Name :{{ user?.username }}</h4>
</template>

<script>
import { mapState } from 'vuex';
    export default{
        computed: {
            ...mapState({
                user: state => state.auth.user?.user
            })
        }
    }
</script>