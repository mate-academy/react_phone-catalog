import { Product } from '../types/Product';

export const addInCart = (object: Product) => {
  const valueCart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');

  if (valueCart.some(el => el.id === object.id)) {
    const newValue = valueCart.filter(obj => obj.id !== object.id);

    localStorage.setItem('cart', JSON.stringify(newValue));
    window.dispatchEvent(new CustomEvent('cartChanged'));

    return newValue;
  }

  window.dispatchEvent(new CustomEvent('cartChanged'));
  localStorage.setItem('cart', JSON.stringify([...valueCart, object]));

  return [...valueCart, object];
};
