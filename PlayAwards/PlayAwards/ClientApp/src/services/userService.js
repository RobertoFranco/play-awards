import http from "./httpService";

export function createUser(user){
    return http.post('/api/Users', user);
}

export function login(email, password){
    return http.post('/api/Users/Login', { email, password });
}

export function requestResetPassword(email){
    return http.post('/api/Users/RequestResetPassword', { email });
}

export function resetPassword(email, token, newPassword){
    return http.post('/api/Users/ResetPassword', { email, token, newPassword });
}

const userService = {
    createUser,
    login,
    resetPassword,
    requestResetPassword
}

export default userService;