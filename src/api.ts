/* eslint-disable max-len */
export function getProducts() {
  return fetch('/api/products.json').then(response => response.json());
}

export function getSuggestedProducts() {
  return fetch('/api/products.json')
    .then(response => response.json())
    .then(suggestedProducts => {
      const randomProducts = [...suggestedProducts];

      for (let i = randomProducts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [randomProducts[i], randomProducts[j]] = [randomProducts[j], randomProducts[i]];
      }

      return randomProducts.slice(0, 10);
    });
}

export function getPhones() {
  return fetch('/api/phones.json').then(response => response.json());
}

export function getTablets() {
  return fetch('/api/tablets.json').then(response => response.json());
}

export function getAccessories() {
  return fetch('/api/accessories.json').then(response => response.json());
}
