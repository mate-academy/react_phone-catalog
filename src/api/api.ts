/* eslint-disable */
const PRODUCTS = `${process.env.REACT_APP_LINK}api/products.json`;
const PRODUCT_DETAILS = `${process.env.REACT_APP_LINK}api/products/`;

export const getProducts = () => fetch(PRODUCTS)
  .then((res) => {
    if (!res.ok) {
      throw new Error('Error with loading data...');
    }

    return res.json();
  })

export const getPhones = (setPhoneList: any) => fetch(PRODUCTS)
  .then((res) => {
    if (!res.ok) {
      throw new Error('Error with loading data...');
    }

    return res.json();
  })
  .then((data) => {
    const phones = data.filter((item: any) => item.type === 'phone');

    setPhoneList(phones);
  });

export const getTablets = (setTabletsList: any) => fetch(PRODUCTS)
  .then((res) => {
    if (!res.ok) {
      throw new Error('Error with loading data...');
    }

    return res.json();
  })
  .then((data) => {
    const tablets = data.filter((item: any) => item.type === 'tablet');

    setTabletsList(tablets);
  });

export const getAccessories = (setAccessoriesList: any) => fetch(PRODUCTS)
  .then((res) => {
    if (!res.ok) {
      throw new Error('Error with loading data...');
    }

    return res.json();
  })
  .then((data) => {
    const accessories = data.filter((item: any) => item.type === 'accessories');

    setAccessoriesList(accessories);
  });

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
