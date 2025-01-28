import apiService from "@/services/AuthService"
const state = {
    isLoading : false,
    user: null,
    errors: null
}

const mutations = {
    registerStart(state) {
        state.isLoading = true
        state.user = null
        state.errors = null
    },
    registerSuccess(state,payload) {
        state.isLoading = false
        state.user = payload
    },
    registerFailure(state,payload) {
        state.isLoading = false
        state.errors = payload
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
    }
}

export default {
    state,
    mutations,
    actions
}