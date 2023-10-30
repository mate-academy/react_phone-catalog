const PRODUCTS = `https://mate-academy.github.io/react_phone-catalog
/api/products.json`;
const PRODUCT_DETAILS = `https://mate-academy.github.io/react_phone-catalog/
api/products/`;

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
  setProductInfo: any,
  setDefaultImage: any,
) => (
  fetch(`${PRODUCT_DETAILS}${id}.json`)
    .then((res) => {
      if (!res.ok) {
        throw new Error('Error with loading data...');
      }

      return res.json();
    })
    .then((data) => {
      setProductInfo(data);
      setDefaultImage(data.images[0]);
    })
);
