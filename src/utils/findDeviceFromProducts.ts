import { Product } from '../types/product';

export const findDeviceFromProducts = (
  products: Product[],
  idDevice: string,
) => {
  let numberYear = 0;

  products.map(p => {
    if (p.itemId === idDevice) {
      numberYear = p.year;
    }

    return;
  });

  return numberYear;
};
