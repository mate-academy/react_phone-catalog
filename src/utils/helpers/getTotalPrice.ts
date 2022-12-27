import { Product } from 'src/types/Product';
import { getProductsWithActualPrice } from './getProductsWithActualPrice';

export function getTotalPrice(arr: Product[]) {
  const withActualPrice = getProductsWithActualPrice(arr);

  const arrOfPrices = [];

  for (let i = 0; i < withActualPrice.length; i += 1) {
    const numToPush = (withActualPrice[i].priceAfterDiscount
      || withActualPrice[i].price) * (arr[i].count || 1);

    arrOfPrices.push(numToPush);
  }

  const totalPrice = arrOfPrices.reduce((acc, currentValue) => {
    return +acc + +currentValue;
  }, 0);

  return totalPrice;
}
