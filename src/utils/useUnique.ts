import { Tablet } from '../types/Tablet';
import { Phone } from '../types/Phone';
import { Accessory } from '../types/Accessory';

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum productCategory {
  PHONE = 'phones',
  TABLET = 'tablets',
  ACCESSORY = 'accessories',
}

export const useUnique = (
  products: Phone[] | Tablet[] | Accessory[] | null,
) => {
  let uniqueNames: string[] = [];
  let uniqueProductsFromServer: Phone[] | Tablet[] | Accessory[] = [];

  if (products) {
    products.forEach(product => {
      switch (product.category) {
        case productCategory.PHONE:
          products?.forEach(phone => {
            if (!uniqueNames.includes(phone.namespaceId)) {
              const currentProduct = products?.find(
                item => item.id === phone.id,
              );

              uniqueNames = [...uniqueNames, phone.namespaceId];

              if (currentProduct !== undefined) {
                uniqueProductsFromServer = [
                  ...uniqueProductsFromServer,
                  currentProduct,
                ];
              }
            }
          });
          break;
        case productCategory.TABLET:
          products?.forEach(tablet => {
            if (!uniqueNames.includes(tablet.namespaceId)) {
              const currentProduct = products?.find(
                item => item.id === tablet.id,
              );

              uniqueNames = [...uniqueNames, tablet.namespaceId];

              if (currentProduct !== undefined) {
                uniqueProductsFromServer = [
                  ...uniqueProductsFromServer,
                  currentProduct,
                ];
              }
            }
          });
          break;
        default:
          products?.forEach(accessory => {
            if (!uniqueNames.includes(accessory.namespaceId)) {
              const currentProduct = products?.find(
                item => item.id === accessory.id,
              );

              uniqueNames = [...uniqueNames, accessory.namespaceId];

              if (currentProduct !== undefined) {
                uniqueProductsFromServer = [
                  ...uniqueProductsFromServer,
                  currentProduct,
                ];
              }
            }
          });
      }
    });
  }

  return uniqueProductsFromServer;
};
