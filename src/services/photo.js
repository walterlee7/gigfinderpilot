import * as baseService from './base';

async function getPhoto(id) {
    return baseService.get(`/api/photo/${id}`);
}

async function insertPhoto(id, data) {
    return baseService.post(`/api/photo/insertPhoto/${id}`, data);
}

async function updatePhoto(id, data) {
    return baseService.put(`/api/photo/updatePhoto/${id}`, data);
}

async function updateFormPhoto(id, data) {
    return baseService.formPut(`/api/photo/updatePhoto/${id}`, data);
}

export { getPhoto, insertPhoto, updatePhoto, updateFormPhoto };