const productsURL = 'https://mate-academy.github.io/react_phone-catalog/api';

export const getDataFromServer = (url) => {
  return fetch(url)
    .then(response => (response.ok
      ? response.json()
      : Promise.reject(new Error('Cannot load data from server'))));
};

export const getProducts = () => getDataFromServer(`${productsURL}/products.json`);

export const getProductDetails = (productId) => getDataFromServer(`${productsURL}/products/${productId}.json`);

export const getHotPriceProducts = () => {
  return getProducts()
    .then(result => result.filter(product => product.discount !== 0));
};

export const getBrandNewProducts = () => {
  return getProducts()
    .then(result => result.filter(product => product.discount === 0));
};

export const getSuggestedProducts = () => {
  return getProducts()
    .then(result => result.sort(() => Math.random() - Math.random())
      .slice(0, 8));
};

export const getPhones = () => {
  return getProducts()
    .then(result => result.filter(product => product.type === 'phone'));
};

export const getTablets = () => {
  return getProducts()
    .then(result => result.filter(product => product.type === 'tablet'));
};

export const getAccessories = () => {
  return getProducts()
    .then(result => result.filter(product => product.type === 'accessorie'));
};
