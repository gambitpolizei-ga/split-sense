import sendRequest from "./send-request";
const BASE_URL = '/api/participants';

export async function getAll() {
    return sendRequest(BASE_URL);
};

export async function getById(id) {
    return sendRequest(`${BASE_URL}/${id}`);
};

export async function create(participant) {
    return sendRequest(`${BASE_URL}/create`, 'POST', { participant });
};

export async function deleteParticipant(id) {
    return sendRequest(`${BASE_URL}/${id}`, 'DELETE');
};

export async function updateParticipant(id, participant) {
    return sendRequest(`${BASE_URL}/${id}`, 'PUT', { participant });
};