export function getAccessories() {
  return fetch('http://localhost:5173/api/accessories.json').then(response => {
    if (!response.ok) {
    }

    return response.json();
  });
}
