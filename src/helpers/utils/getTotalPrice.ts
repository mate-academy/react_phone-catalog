import { Product } from '../../type/Product';

export function getTotalPrice(carts: Product[]) {
  const priceMap = carts.map(
    cart => cart.price - (cart.price * cart.discount) / 100,
  );

  const totalPrice = priceMap.reduce((acc, value) => {
    return acc + value;
  }, 0);

  return totalPrice;
}
