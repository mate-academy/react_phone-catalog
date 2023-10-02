export const productsURL
= 'https://mate-academy.github.io/react_phone-catalog/api/products.json';

export const detailsURL
= 'https://mate-academy.github.io/react_phone-catalog/api/products/';

export const getProducts = (URL: string) => {
  return fetch(
    URL,
  )
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.json();
    })
    .then(json => json)
    .catch(error => {
      throw error;
    });
};
