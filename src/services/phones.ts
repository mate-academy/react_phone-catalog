export function getPhones() {
  return fetch('https://mixelio.github.io/react_phone-catalog/api/phones.json').then(response => {
    if (!response.ok) {
    }

    return response.json();
  });
}
