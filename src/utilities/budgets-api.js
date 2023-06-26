import sendRequest from "./send-request";
const BASE_URL = '/api/budgets';

export async function getAll() {
    return sendRequest(BASE_URL);
}

export async function getById(id) {
    return sendRequest(`${BASE_URL}/${id}`);
}
export async function create(budget) {
    return sendRequest(`${BASE_URL}/create`, 'POST', {budget});
}