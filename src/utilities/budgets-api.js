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

export async function deleteBudget(id) {
    return sendRequest(`${BASE_URL}/${id}`, 'DELETE');
}

export async function editBudget(id) {
    return sendRequest(`${BASE_URL}/${id}`, 'GET');
}

export async function updateBudget(id) {
    return sendRequest(`${BASE_URL}/${id}`, 'PUT');
}