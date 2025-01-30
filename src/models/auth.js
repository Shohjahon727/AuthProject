import { removeItem, setItem } from "@/helpers/persistaneStorage"
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
        // state.isLoggedIn = null
    },
    registerSuccess(state,payload) {
        state.isLoading = false
        state.user = payload
        // state.isLoggedIn = true
    },
    registerFailure(state,payload) {
        state.isLoading = false
        state.errors = payload
        // state.isLoggedIn = false
    },
    loginStart(state) {
        state.isLoading = true
        state.user = null
        state.errors = null
        state.isLoggedIn = null
    },
    loginSuccess(state,payload) {
        state.isLoading = false
        state.user = payload
        state.isLoggedIn = true
    },
    loginFailure(state,payload) {
        state.isLoading = false
        state.errors = payload
        state.isLoggedIn = false
    },
    logout(state) {
        state.user = null
        state.isLoggedIn =null
    }
}

const actions = {
    async register(context, user) {
        return new Promise(async (resolve, reject) => {
            context.commit('registerStart')
            try {
                let response = await apiService.register(user);
                console.log('Response', response);
                context.commit('registerSuccess', response.data);
                setItem("token",response.data.refreshToken);
                setItem("username",response.data.username);
                resolve(response.data);
            } catch (error) {
                context.commit('registerFailure', error);
                reject(error);
            }
        });
    },
    async login(context, user) {
        return new Promise(async (resolve, reject) => {
            context.commit('loginStart')
            try {
                let response = await apiService.login(user);
                context.commit('loginSuccess', response.data);
                
                resolve(response.data);
            } catch (error) {
                context.commit('loginFailure', error);
                reject(error);
            }
        });
    },
    async logout(context) {
        context.commit('logout')
        removeItem('token')
        removeItem('username')
    }
}

export default {
    state,
    mutations,
    actions
}