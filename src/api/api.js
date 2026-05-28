const BASE_URL = './api';
function wait(delay) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}
function getData(url) {
    return wait(1200)
        .then(() => fetch(BASE_URL + url))
        .then((response) => {
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        return response.json();
    });
}
function getPhones() {
    return getData('/phones.json');
}
export const api = {
    getPhones: getPhones,
};
