export const getProductsDetails = (productId: string | undefined) => {
  return fetch(`https://mate-academy.github.io/react_phone-catalog/api/products/${productId}.json`)
    .then(response => response.json());
};
