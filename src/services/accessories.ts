export function getAccessories() {
  return fetch('http://localhost:3000/api/accessories.json')
    .then((response) => {
      if (!response.ok) {

      }

      return response.json();
  })
}
