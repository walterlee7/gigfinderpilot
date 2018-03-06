import { AsyncStorage } from 'react-native';
const AUTH_TOKEN_KEY = 'authtoken';
const BASE_URL = 'http://localhost:3000';

async function setAuthToken(token) {
    return await AsyncStorage.setItem(AUTH_TOKEN_KEY, `Bearer ${token}`);
}

async function clearAuthToken() {
    return await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
}

async function getAuthToken() {
    return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
}

async function makeFetch(url, info) {
    return fetch(`${BASE_URL}${url}`, info);
}

async function json(url, method = 'GET', payload = {}) {
    const authToken = await getAuthToken();
    const headers = {
        'Content-Type': 'application/json',
    };

    if (!!authToken) {
        headers.Authorization = authToken;
    }

    const data = {
        method,
        body: JSON.stringify(payload),
        headers,
    };

    if (method === 'GET') {
        delete data.body;
    }

    const response = await makeFetch(url, data);
    const contentType = response.headers.get('Content-Type');

    if (response.ok) {
        if (contentType.indexOf('application/json') > -1) {
            return await response.json();
        } else if (response.statusText) {
            return response.statusText;
        } else if (response.status) {
            return response.status;
        }
    } else {
        if (contentType.indexOf('application/json') > -1) {
            throw await response.json();
        } else if (response.statusText) {
            throw response.statusText;
        } else if (response.status) {
            throw response.status;
        }
    }

    throw response;
}

async function get(url) {
    return json(url);
}

async function getMore(url, payload) {
    console.log('base.ios.js:' + payload);
    return json(url, payload);
}

async function post(url, payload) {
    return json(url, 'POST', payload);
}

async function put(url, payload) {
    return json(url, 'PUT', payload);
}

async function destroy(url, payload) {
    return json(url, 'DELETE', payload);
}

export {
    setAuthToken,
    getAuthToken,
    clearAuthToken,
    get,
    getMore,
    post,
    put,
    destroy,
    makeFetch,
};
