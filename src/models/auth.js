import { getItem, removeItem, setItem } from "@/helpers/persistaneStorage"
import apiService from "@/services/AuthService"
import router from "@/router/index.js"
const state = {
    isLoading : false,
    user:  getItem("username")?? null,
    errors: null,
    isLoggedIn: getItem("token")? true : false,
    role: getItem("role") ?? null,
    token: getItem("token") ?? null,
}

const mutations = {
    registerStart(state) {
        state.isLoading = true
        state.user = null
        state.errors = null
        state.token = null
    },
    registerSuccess(state,payload) {
        state.isLoading = false
        state.user = payload
        state.role = payload
        state.token = payload.refreshToken
    },
    registerFailure(state,payload) {
        state.isLoading = false
        state.errors = payload
    },
    loginStart(state) {
        state.isLoading = true
        state.user = null
        state.errors = null
        state.isLoggedIn = false
        state.role = null
        state.token = null
    },
    loginSuccess(state, payload) {
        state.isLoading = false;
        state.user = payload.username;
        state.isLoggedIn = true;
        state.role = payload.role;
        state.token = payload.refreshToken

        setItem("username", payload.username)
        setItem("token", payload.refreshToken)
        setItem("role", payload.role) // Roleni saqlash
    },
    loginFailure(state,payload) {
        state.isLoading = false
        state.errors = payload
        state.isLoggedIn = false
    },
    logout(state) {
        state.user = null
        state.token = null
        state.role = null
        state.isLoggedIn =false
    },
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
                setItem("token",response.data.refreshToken);
                setItem("username",response.data.username);
                setItem('role', response.data.role);
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
        removeItem('role')
        await router.push({name:'login'})
    }
}

export default {
    state,
    mutations,
    actions,
}