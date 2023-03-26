export const requestListProducts = () => {
  return fetch(
    'https://mate-academy.github.io/react_phone-catalog/api/products.json',
  )
    .then(res => res.json());
};

export const requestDetailsProduct = (id: string) => {
  return fetch(
    `https://mate-academy.github.io/react_phone-catalog/api/products/${id}.json`,
  )
    .then(res => res.json());
};
