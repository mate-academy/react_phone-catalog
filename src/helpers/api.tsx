// import { Category } from '../types/Category';
import { Product } from '../types/Product';

// eslint-disable-next-line max-len
export const MAIN_URL = 'https://mate-academy.github.io/react_phone-catalog/_new';

export const getProducts: () => Promise<Product[]> = () => {
  return fetch(`${MAIN_URL}/products.json`)
    .then(response => response.json());
};

// export const getHotPriceProducts = () => {
//   return getProducts()
//     .then(products => products
//       .sort((a: Product, b: Product) => {
//         return (b.fullPrice - b.price) - (a.fullPrice - a.price);
//       }));
// };

// export const getBrandNewProducts = () => {
//   return getProducts()
//     .then(products => products
//       .sort((a: Product, b: Product) => {
//         return b.price - a.price;
//       }));
// };

// export const getPhones = () => {
//   return getProducts()
//     .then(products => products
//       .filter(product => product.category === Category.Phones));
// };

// export const getTablets = () => {
//   return getProducts()
//     .then(products => products
//       .filter(product => product.category === Category.Tablets));
// };

// export const getAccessories = () => {
//   return getProducts()
//     .then(products => products
//       .filter(product => product.category === Category.Accessories));
// };

export const getProductDetails = (productId: string) => {
  return fetch(`${MAIN_URL}/products/${productId}.json`)
    .then(result => result.json());
};

export const getSuggestedProducts = (productsCount: number) => {
  return getProducts()
    .then(products => {
      const generateIndex = () => Math.floor(Math.random() * products.length);
      const result: Product[] = [];

      for (let i = 0; i < productsCount; i += 1) {
        let index = generateIndex();

        while (result.includes(products[index])) {
          index = generateIndex();
        }

        result.push(products[index]);
      }

      return result;
    });
};
