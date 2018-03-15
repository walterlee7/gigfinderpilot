import * as baseService from './base';

async function insert(data) {
    return baseService.post('/api/message', data);
}

async function get(url) {
    return baseService.get('/api/message');
}

async function getRecent(url) {
    return baseService.get('/api/message/inbox');
}

export { insert, get, getRecent };