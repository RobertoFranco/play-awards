import axios from "axios";

const instance = axios.create();

instance.defaults.headers.post['Content-Type'] = 'application/json';

export function setAuthToken (token){
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}` 
}

export default instance;