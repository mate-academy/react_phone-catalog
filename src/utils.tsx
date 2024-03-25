import { PriceList } from './type/PriceList';

export const hasProdPriceList = (id: number, priceList: PriceList[]) => {
  return priceList.find(e => e.id === id);
};
