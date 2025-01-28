import axios from "./axios";

const apiService = {
    async register(user){
        return await axios.post('Auth/register',user);
    }
}

export default apiService