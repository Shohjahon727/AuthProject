import axios from "./axios";

const apiService = {
    async register(user){
        return await axios.post('Auth/register',user);
    },
    async login(user) {
        return await axios.post('Auth/login',user);
    }
}

export default apiService