import apiService from "@/services/AuthService"
const state = {
    isLoading : false,
    user: null,
    errors: null,
    isLoggedIn: null
}

const mutations = {
    registerStart(state) {
        state.isLoading = true
        state.user = null
        state.errors = null
        state.isLoggedIn = null
    },
    registerSuccess(state,payload) {
        state.isLoading = false
        state.user = payload
        state.isLoggedIn = true
    },
    registerFailure(state,payload) {
        state.isLoading = false
        state.errors = payload
        state.isLoggedIn = false
    },
    loginStart(state) {
        state.isLoading = true
        state.user = null
        state.errors = null
        state.isLoggedIn = null
    },
    loginSuccess(state,payload) {
        state.isLoading = false
        state.errors = payload
        state.isLoggedIn = true
    },
    loginFailur(state,payload) {
        state.isLoading = false
        state.errors = payload
        state.isLoggedIn = false
    }
}

const actions = {
    async register(context,user){
        return new Promise(async resolve => {
            context.commit('registerStart')
            let response = await apiService.register(user);
            console.log('Response',response);
                context.commit('registerSuccess',response.data.username);
                resolve(response.data.username)
        });
    },
    async login(context,user) {
        return new Promise(async resolve => {
            context.commit('loginStart')
            let response = await apiService.login(user);
            context.commit('loginSuccess',response.data.username);
            resolve(response.data.username)
        }) 
    }
}

export default {
    state,
    mutations,
    actions
}