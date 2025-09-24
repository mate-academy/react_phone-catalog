/* eslint-disable max-len, padding-line-between-statements */
export function getProducts() {
  return fetch('/api/products.json').then(r => r.json());
}

export function getSuggestedProducts() {
  return fetch('/api/products.json')
    .then(r => r.json())
    .then((list: unknown[]) => {
      const arr = [...list];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr.slice(0, 10);
    });
}

export function getPhones() {
  return fetch('/api/phones.json').then(r => r.json());
}

export function getTablets() {
  return fetch('/api/tablets.json').then(r => r.json());
}

export function getAccessories() {
  return fetch('/api/accessories.json').then(r => r.json());
}
