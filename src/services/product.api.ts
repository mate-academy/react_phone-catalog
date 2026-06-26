const BASE_URL = import.meta.env.BASE_URL;

export const getProducts = () => {
  return fetch(`${BASE_URL}api/products.json`).then(response => {
    if (!response.ok) {
      throw new Error('Unable to load products');
    }

    return response.json();
  });
};

export const getPhones = () => {
  return fetch(`${BASE_URL}api/phones.json`).then(response => {
    if (!response.ok) {
      throw new Error('Unable to load phones');
    }

    return response.json();
  });
};

export const getTablets = () => {
  return fetch(`${BASE_URL}api/tablets.json`).then(response => {
    if (!response.ok) {
      throw new Error('Unable to load tablets');
    }

    return response.json();
  });
};

export const getAccessories = () => {
  return fetch(`${BASE_URL}api/accessories.json`).then(response => {
    if (!response.ok) {
      throw new Error('Unable to load accessories');
    }

    return response.json();
  });
};
