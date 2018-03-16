import * as baseService from './base';

async function insert(data) {
    return baseService.post('/api/message', data);
}

async function getUserConversation(userid, receiverid) {
    return baseService.get(`/api/message/chat/${userid}/${receiverid}`);
}

async function getUserInbox(userid) {
    return baseService.get('/api/message/inbox/' + userid);
}

export { insert, getUserConversation, getUserInbox };