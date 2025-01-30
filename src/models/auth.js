import { getItem, removeItem, setItem } from "@/helpers/persistaneStorage"
import apiService from "@/services/AuthService"
import router from "@/router/index.js"
const state = {
    isLoading : false,
    user:  getItem("username")?? null,
    errors: null,
    isLoggedIn: getItem("token")? true : false,

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
        state.isLoggedIn = false
    },
    loginSuccess(state, payload) {
        state.isLoading = false;
        state.user = payload;
        state.isLoggedIn = true;
        setItem("username", payload.username); 
    },
    loginFailure(state,payload) {
        state.isLoading = false
        state.errors = payload
        state.isLoggedIn = false
    },
    logout(state) {
        state.user = null
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
                setItem("username",response.data.user);
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
        router.push({name:'login'})
    }
}

export default {
    state,
    mutations,
    actions,
}