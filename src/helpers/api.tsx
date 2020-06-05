const URL_API = 'https://mate-academy.github.io/react_phone-catalog/api/products';

const getProducts = () => {
  return fetch(`${URL_API}.json`)
    .then(responce => responce.json());
};

export const getProduct = (productUrl: string) => {
  return fetch(`${URL_API}/${productUrl}.json`)
    .then(responce => responce.json());
};


export const getAllProducts = async (): Promise< Products[]> => {
  const products = await getProducts();

  return products;
};
