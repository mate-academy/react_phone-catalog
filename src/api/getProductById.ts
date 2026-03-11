import products from '../../public/api/products.json';
import phones from '../../public/api/phones.json';
import tablets from '../../public/api/tablets.json';
import accessories from '../../public/api/accessories.json';
import { ProductDetailsType } from '../types/ProductDetailsType';

export const getProductById = (
  productId: string | undefined,
): Promise<ProductDetailsType | null> => {
  return new Promise(resolve => {
    setTimeout(() => {
      if (!productId) {
        resolve(null);

        return;
      }

      const basic = products.find(product => product.itemId === productId);

      if (!basic) {
        resolve(null);

        return;
      }

      let details;

      switch (basic.category) {
        case 'phones':
          details = phones.find(phone => phone.id === productId);
          break;

        case 'tablets':
          details = tablets.find(tablet => tablet.id === productId);
          break;

        case 'accessories':
          details = accessories.find(accessory => accessory.id === productId);
          break;
      }

      if (!details) {
        resolve(null);

        return;
      }

      resolve({ basic, details });
    }, 500);
  });
};
