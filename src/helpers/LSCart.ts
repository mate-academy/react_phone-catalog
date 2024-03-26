import { CartProduct } from '../types/CartProduct';
import { Product } from '../types/Product';

const addToLSCart = (el: Product) => {
  let cart: CartProduct[] = [];
  const stringLS = localStorage.getItem('cart');

  if (stringLS !== null) {
    cart = JSON.parse(stringLS);
  }

  const existingItemIndex = cart.findIndex(
    (cartItem: CartProduct) => cartItem.id === el.id,
  );

  if (existingItemIndex === -1) {
    cart.push({ id: el.id, quantity: 1, product: el });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
};

const incrementProductCountInLSCart = (el: Product) => {
  let cart: CartProduct[] = [];
  const stringLS = localStorage.getItem('cart');

  if (stringLS !== null) {
    cart = JSON.parse(stringLS);
  }

  const existingItemIndex = cart.findIndex(
    (cartItem: CartProduct) => cartItem.id === el.id,
  );

  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += 1;
  }

  localStorage.setItem('cart', JSON.stringify(cart));
};

const decrementProductCountInLSCart = (el: Product) => {
  let cart: CartProduct[] = [];
  const stringLS = localStorage.getItem('cart');

  if (stringLS !== null) {
    cart = JSON.parse(stringLS);
  }

  const existingItemIndex = cart.findIndex(
    (cartItem: CartProduct) => cartItem.id === el.id,
  );

  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity -= 1;
  }

  localStorage.setItem('cart', JSON.stringify(cart));
};

const removeProductFromLSCart = (el: Product) => {
  let cart: CartProduct[] = [];
  const stringLS = localStorage.getItem('cart');

  if (stringLS !== null) {
    cart = JSON.parse(stringLS);
  }

  const newCart = cart.filter(cartEl => cartEl.id !== el.id);

  localStorage.setItem('cart', JSON.stringify(newCart));
};

const checkProductInLSCart = (productId: string) => {
  let cart: CartProduct[] = [];
  const stringLS = localStorage.getItem('cart');

  if (stringLS !== null) {
    cart = JSON.parse(stringLS);
  }

  return cart.filter((item: CartProduct) => item.id === productId).length === 1;
};

const getTotalCartQuantity = () => {
  let cart: CartProduct[] = [];
  const stringLS = localStorage.getItem('cart');

  if (stringLS !== null) {
    cart = JSON.parse(stringLS);
  }

  let total = 0;

  cart.forEach(item => {
    total += item.quantity;
  });

  return total;
};

export const LSCart = {
  addToLSCart,
  removeProductFromLSCart,
  checkProductInLSCart,
  incrementProductCountInLSCart,
  decrementProductCountInLSCart,
  getTotalCartQuantity,
};
