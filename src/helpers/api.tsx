const URL_API = 'https://mate-academy.github.io/react_phone-catalog/api/products';

export const getProducts = () => {
  return fetch(`${URL_API}.json`)
    .then(responce => responce.json());
};

export const getPhones = async (): Promise< Products[]> => {
  const products = await getProducts();

  return products.filter((product: Products) => product.type === 'phone');
};
