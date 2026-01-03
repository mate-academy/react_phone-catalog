import {
  ProductAllType,
  ProductType,
  ProductTypeForAccessory,
} from '../types/Product';
import phones from '../../public/api/phones.json';
import tablets from '../../public/api/tablets.json';
import accessories from '../../public/api/accessories.json';
import productsAll from '../../public/api/products.json';
import { nameProducts } from '../types/NameProducts';

const getProducts = async (param: nameProducts) => {
  return new Promise<
    ProductType[] | ProductTypeForAccessory[] | ProductAllType[]
  >((resolve, reject) => {
    setTimeout(() => {
      switch (param) {
        case 'phones':
          resolve(phones);
          break;
        case 'tablets':
          resolve(tablets);
          break;
        case 'accessories':
          resolve(accessories);
          break;
        case 'allProducts':
          resolve(productsAll);
          break;
        default:
          reject('Invalid category');
      }
    }, 1000);
  });
};

export { getProducts };
