import * as baseService from './base';

async function insert(data) {
    return baseService.post('/api/test', data);
}

function updateGenres(id, data) {
    return baseService.put(`/api/test/${id}`, data);
}

export { insert, updateGenres };