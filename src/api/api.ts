/* eslint-disable */
const PRODUCTS = './api/products.json';
const PRODUCT_DETAILS = './api/products/';

export const getProducts = () => fetch(PRODUCTS)
  .then((res) => {
    if (!res.ok) {
      throw new Error('Error with loading data...');
    }

    return res.json();
  })

export const getPhones = () => fetch(PRODUCTS)
  .then((res) => {
    if (!res.ok) {
      throw new Error('Error with loading data...');
    }

    return res.json();
  })
  .then((data) => data.filter((item: any) => item.type === 'phone')

  );

export const getTablets = () => fetch(PRODUCTS)
  .then((res) => {
    if (!res.ok) {
      throw new Error('Error with loading data...');
    }

    return res.json();
  })
  .then((data) => data.filter((item: any) => item.type === 'tablet')

  );

export const getAccessories = () => fetch(PRODUCTS)
  .then((res) => {
    if (!res.ok) {
      throw new Error('Error with loading data...');
    }

    return res.json();
  })
  .then((data) => data.filter((item: any) => item.type === 'accessories')

  );

export const getProductItem = (
  id: string,
) => (
  fetch(`${PRODUCT_DETAILS}${id}.json`)
    .then((res) => {
      if (!res.ok) {
        throw new Error('Error with loading data...');
      }

      return res.json();
    })
);
