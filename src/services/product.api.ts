export const getProducts = () => {
  return fetch('/api/products.json').then(response => {
    if (!response.ok) {
      throw new Error('Unable to load products');
    }

    return response.json();
  });
};

export const getPhones = () => {
  return fetch('/api/phones.json').then(response => {
    if (!response.ok) {
      throw new Error('Unable to load phones');
    }

    return response.json();
  });
};

export const getTablets = () => {
  return fetch('/api/tablets.json').then(response => {
    if (!response.ok) {
      throw new Error('Unable to load tablets');
    }

    return response.json();
  });
};

export const getAccessories = () => {
  return fetch('/api/accessories.json').then(response => {
    if (!response.ok) {
      throw new Error('Unable to load accessories');
    }

    return response.json();
  });
};
