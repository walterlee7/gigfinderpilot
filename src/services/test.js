import * as baseService from './base';

async function insert(data) {
    return baseService.post('/api/test', data);
}

export { insert };