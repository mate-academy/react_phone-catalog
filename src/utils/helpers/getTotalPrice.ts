import { Product } from 'src/types/Product';

export function getTotalPrice(arr: Product[]) {
  const arrOfPrices = [];

  for (let i = 0; i < arr.length; i += 1) {
    const numToPush = (arr[i].price
      || arr[i].fullPrice) * (arr[i].count || 1);

    arrOfPrices.push(numToPush);
  }

  const totalPrice = arrOfPrices.reduce((acc, currentValue) => {
    return +acc + +currentValue;
  }, 0);

  return totalPrice;
}
