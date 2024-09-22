export function getTablets() {
  return fetch('http://localhost:5173/api/tablets.json').then(response => {
    if (!response.ok) {
    }

    return response.json();
  });
}
