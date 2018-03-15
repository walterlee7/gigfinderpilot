import * as baseService from './base';

function all() {
    return baseService.get('/api/user');
}

function one(id) {
    return baseService.get(`/api/user/${id}`);
}

function insert(data) {
    return baseService.post('/api/user', data);
}

function update(id, data) {
    return baseService.put(`/api/user/${id}`, data);
}

function destroy(id) {
    return baseService.destroy(`/api/user/${id}`);
}

function destroyAll() {
    return baseService.destroy('/api/user');
}

export { all, one, insert, update, destroy, destroyAll };