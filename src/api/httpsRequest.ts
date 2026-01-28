import { ProductAllType, ProductType } from '../types/Product';
import phones from '../../public/api/phones.json';
import tablets from '../../public/api/tablets.json';
import accessories from '../../public/api/accessories.json';
import productsAll from '../../public/api/products.json';
import { NameCategory, NameProducts } from '../types/NameProducts';

export const getProducts = async (param: NameProducts) => {
  return new Promise<ProductType[] | ProductAllType[]>((resolve, reject) => {
    // setTimeout(() => {
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
    // }, 1000);
  });
};

export const getProduct = async (category: NameCategory, itemId: string) => {
  return new Promise<ProductType>((resolve, reject) => {
    switch (category) {
      case 'phones': {
        const product = phones.find(item => item.id === itemId);

        return product ? resolve(product) : reject('Product not found');
      }

      case 'tablets': {
        const product = tablets.find(item => item.id === itemId);

        return product ? resolve(product) : reject('Product not found');
      }

      case 'accessories': {
        const product = accessories.find(item => item.id === itemId);

        return product ? resolve(product) : reject('Product not found');
      }

      default:
        return reject('Invalid category');
    }
  });
};
