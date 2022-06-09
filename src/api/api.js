const BASE_URL
  = 'https://mate-academy.github.io/react_phone-catalog/api/products';

const request = (url) => fetch(`${BASE_URL}${url}`)
  .then(res => {
    if (!res.ok) {
      throw new Error('Something wrong...');
    }

    return res.json();
  });

export const getProducts = () => request('.json');

export const getHotPriceProducts = () => (
  getProducts()
    .then(products => products.filter(product => product.discount > 0)
      .sort((prod1, prod2) => (prod2.price * (prod2.discount / 100)
      - prod1.price * (prod1.discount / 100)
      )))
);

export const getBrandNewProducts = () => (
  getProducts()
    .then(products => products.filter(product => product.discount === 0)
      .sort((prod1, prod2) => prod2.price - prod1.price))
);

export const getSuggestedProducts = () => (
  getProducts()
    .then(products => products.sort(() => Math.random() - 0.5))
);

export const getPhones = () => (
  getProducts()
    .then(res => res.filter(product => product.type === 'phone'))
);

export const getTablets = () => (
  getProducts()
    .then(res => res.filter(product => product.type === 'tablet'))
);

export const getAccessories = () => (
  getProducts()
    .then(res => res.filter(product => product.type === 'accessorie'))
);

export const getProduct = (id) => request(`/${id}.json`);
