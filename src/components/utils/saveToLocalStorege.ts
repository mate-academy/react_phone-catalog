import { CartItems } from '../../modules/CartPage/components/cartItems/cartItems';

export const saveToLocalStorage = (key, items) => {
  localStorage.setItem(key, JSON.stringify(items));
};
