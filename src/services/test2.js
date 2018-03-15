import * as baseService from './base';

async function insert(data) {
    return baseService.post('/api/test2', data);
}

function updateInstruments(id, data) {
    return baseService.put(`/api/test2/${id}`, data);
}

export { insert, updateInstruments };