export function getProducts() {
  return fetch('./api/products.json').then(response => response.json());
}

export function getPhone() {
  return fetch('./api/phones.json').then(response => response.json());
}

export function getAccessory() {
  return fetch('./api/accessories.json').then(response => response.json());
}

export function getTablet() {
  return fetch('./api/tablets.json').then(response => response.json());
}
