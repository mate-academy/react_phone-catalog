export function getPhones() {
  return fetch('http://localhost:3000/api/phones.json')
    .then((response) => {
      if (!response.ok) {

      }

      return response.json();
  })
}
