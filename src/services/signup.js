import * as baseService from './base';

async function insert(data) {
    return baseService.post('/api/signup', data);
}

export { insert };