import { useContext } from 'react';
import { CatalogContext } from '../CatalogContext';
import { Tablet } from '../types/Tablet';
import { Phone } from '../types/Phone';
import { Accessory } from '../types/Accessory';

export enum productCategory {
  PHONE = 'phones',
  TABLET = 'tablets',
  ACCESSORY = 'accessories',
}

export const useUnique = (
  products: Phone[] | Tablet[] | Accessory[] | null,
) => {
  const { phonesFromServer, tabletsFromServer, accessoriesFromServer } =
    useContext(CatalogContext);

  let uniqueNames: string[] = [];
  let uniqueProductsFromServer: Phone[] | Tablet[] | Accessory[] = [];

  if (products) {
    products.forEach(product => {
      switch (product.category) {
        case productCategory.PHONE:
          phonesFromServer?.forEach(phone => {
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
          tabletsFromServer?.forEach(tablet => {
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
        case productCategory.ACCESSORY:
          accessoriesFromServer?.forEach(accessory => {
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
