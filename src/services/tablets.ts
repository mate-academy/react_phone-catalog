export function getTablets() {
  return fetch('http://localhost:3000/api/tablets.json')
    .then((response) => {
      if (!response.ok) {

      }

      return response.json();
  })
}
