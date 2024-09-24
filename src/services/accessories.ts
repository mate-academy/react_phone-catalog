export function getAccessories() {
  return fetch('https://mixelio.github.io/react_phone-catalog/api/accessories.json').then(response => {
    if (!response.ok) {
    }

    return response.json();
  });
}
