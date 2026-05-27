export const getProducts = () => {
  return fetch('/api/products.json').then(response => {
    if (!response.ok) {
      throw new Error('Unable to load products');
    }

    return response.json();
  });
};
