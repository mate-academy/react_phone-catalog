export function getPhones() {
  return fetch('http://localhost:5173/api/phones.json').then(response => {
    if (!response.ok) {
    }

    return response.json();
  });
}
