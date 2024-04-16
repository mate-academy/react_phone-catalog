import { ProductInfo } from '../types/ProductInfo';

export const getNewModels = (phones: ProductInfo[]) => {
  return [...phones]
    .sort((phone1, phone2) => phone2.priceRegular - phone1.priceRegular)
    .slice(0, 12);
};
