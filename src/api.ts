const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/api';

export const fetchProducts: FetchProductsType = () => {
  const URL = `${BASE_URL}/products.json`;

  return fetch(URL)
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      throw new Error(res.statusText);
    });
};

export const fetchPhones: FetchProductsType = () => {
  return fetchProducts()
    .then(res => res.filter(product => product.type === 'phone'));
};

export const fetchTablets: FetchProductsType = () => {
  return fetchProducts()
    .then(res => res.filter(product => product.type === 'tablet'));
};

export const fetchAccessories: FetchProductsType = () => {
  return fetchProducts()
    .then(res => res.filter(product => product.type === 'accessory'));
};

/*
  This is a dedicated API call to fetch product details.
  Details fetched by this call will not contain details provided when fetching all products
  using the fertchProducts method
*/
export const fetchProductDetails: FetchProductType = (productId) => {
  const URL = `${BASE_URL}/products/${productId}.json`;

  return fetch(URL)
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      throw new Error(res.statusText);
    });
};

// this method finds a product in the general array of products
export const fetchGeneralDetails: FetchGeneralDetailsType = (productId) => {
  return fetchProducts()
    .then(res => {
      const result = res.find((product) => product.id === productId);

      return result;
    });
};

export const fetchCompleteDetails: FetchProductType = (productId) => {
  return Promise.all([
    fetchGeneralDetails(productId),
    fetchProductDetails(productId),
  ]).then(([res1, res2]) => ({ ...res1, ...res2 }));
};
