import { Product } from '../shared/types';
import { ShoppingCartItem } from '../shared/types/ShoppingCartItem';

const SHOPPING_CART_LOCAL_STORAGE = 'shoppingCart';

const saveShoppingCart = (items: ShoppingCartItem[]) => {
  localStorage.setItem(SHOPPING_CART_LOCAL_STORAGE, JSON.stringify(items));
};

export const clearShoppingCart = () => {
  localStorage.removeItem(SHOPPING_CART_LOCAL_STORAGE);
};

export const getShoppingCart = (): ShoppingCartItem[] => {
  const cart = localStorage.getItem(SHOPPING_CART_LOCAL_STORAGE);

  return cart ? JSON.parse(cart) : [];
};

export const addToShoppingCart = (product: Product): ShoppingCartItem[] => {
  const items = getShoppingCart();

  const productInCart = items.find(item => item.product.id === product.id);

  const updatedItem = productInCart
    ? { ...productInCart, quantity: productInCart.quantity + 1 }
    : { product, quantity: 1 };

  const updatedItems = productInCart
    ? items.map(item => (item.product.id === product.id ? updatedItem : item))
    : [...items, updatedItem];

  saveShoppingCart(updatedItems);

  return updatedItems;
};

export const removeFromShoppingCart = (
  productId: number,
): ShoppingCartItem[] => {
  const items = getShoppingCart();

  const updatedItems = items.filter(item => item.product.id !== productId);

  saveShoppingCart(updatedItems);

  return updatedItems;
};

export const increaseQuantityInShoppingCart = (
  productId: number,
): ShoppingCartItem[] => {
  const items = getShoppingCart();

  const updatedItems = items.map(item =>
    item.product.id === productId
      ? { ...item, quantity: item.quantity + 1 }
      : item,
  );

  saveShoppingCart(updatedItems);

  return updatedItems;
};

export const decreaseQuantityInShoppingCart = (
  productId: number,
): ShoppingCartItem[] => {
  const items = getShoppingCart();

  const updatedItems = items
    .map(item =>
      item.product.id === productId
        ? { ...item, quantity: item.quantity - 1 }
        : item,
    )
    .filter(item => item.quantity > 0);

  saveShoppingCart(updatedItems);

  return updatedItems;
};
