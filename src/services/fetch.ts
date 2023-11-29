export const getItems
  = () => fetch('http://localhost:3000/_new/products.json')
    .then((response) => response.json());
