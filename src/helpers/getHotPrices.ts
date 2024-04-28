import { ProductInfo } from '../types/ProductInfo';

export const getHotPrices = (phones: ProductInfo[]) => {
  return [...phones]
    .sort((phone1, phone2) => {
      const priceDiff1 = phone1.priceRegular - phone1.priceDiscount;
      const priceDiff2 = phone2.priceRegular - phone2.priceDiscount;

      return priceDiff1 - priceDiff2;
    })
    .slice(0, 13);
};
