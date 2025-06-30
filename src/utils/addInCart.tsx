import { Product } from '../types/Product';

export const addInCart = (object: Product) => {
  const cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');

  const isInCart = cart.some(
    el =>
      el.id === object.id &&
      el.capacity === object.capacity &&
      el.color === object.color,
  );

  let updatedCart: Product[];

  if (isInCart) {
    // Видалити об'єкт
    updatedCart = cart.filter(
      el =>
        !(
          el.id === object.id &&
          el.capacity === object.capacity &&
          el.color === object.color
        ),
    );
  } else {
    // Додати об'єкт
    updatedCart = [...cart, object];
  }

  localStorage.setItem('cart', JSON.stringify(updatedCart));
  window.dispatchEvent(new CustomEvent('cartChanged'));

  return updatedCart;
};
