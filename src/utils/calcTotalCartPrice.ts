import { CartItem } from '../features/cart/types';

export const calcTotalCartPrice = (items: CartItem[]) => {
  const sumArr = items.map(item => item.itemCount * +item.itemInCart.price);

  return sumArr.reduce((sum, item) => item + sum, 0);
};
