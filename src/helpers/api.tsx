const URL_API = 'https://mate-academy.github.io/react_phone-catalog/api/products';

const getProducts = () => {
  return fetch(`${URL_API}.json`)
    .then(responce => responce.json());
};

export const getProduct = (productUrl: string) => {
  return fetch(`${URL_API}/${productUrl}.json`)
    .then(responce => responce.json())
    .then(data => (data));
};


export const getAllProducts = async (): Promise< Products[]> => {
  const products = await getProducts();

  return products;
};


export const loadProductInfo = async (productUrl: string) => {
  const productFromServer = await getProduct(productUrl);
  const productsFromServer = await getAllProducts();
  const currentProd = productsFromServer
    .find(product => product.id === productFromServer.id);

  return {
    ...currentProd,
    ...productFromServer,
  };
};
