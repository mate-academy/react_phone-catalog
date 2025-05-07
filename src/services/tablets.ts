export function getTablets() {
  return fetch('https://mixelio.github.io/react_phone-catalog/api/tablets.json').then(response => {
    if (!response.ok) {
    }

    return response.json();
  });
}
