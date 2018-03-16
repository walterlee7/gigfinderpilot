import * as baseService from './base';

async function isLoggedIn() {
    return checkLogin();
}

async function checkLogin() {
    await baseService.getAuthToken();

    try {
        const user = await me();
        if (!user) {
            return false;
        }

        return true;
    } catch (e) {
        return false;
    }
}

async function checkUser() {
    await baseService.getAuthToken();

    try {
        const user = await me();
        console.log('user: ' + user);
        console.dir(user);
        if (!user) {
            return -1;
        }

        return user.id;
    } catch (e) {
        return -1;
    }
}

async function login(email, password) {
    await logout();

    const response = await baseService.post('/api/auth/login', {
        email,
        password
    });

    await baseService.setAuthToken(response.token);
}

async function logout() {
    await baseService.clearAuthToken();
}

async function me() {
    return baseService.get('/api/users/me');
}

export { isLoggedIn, checkLogin, login, logout, me, checkUser };