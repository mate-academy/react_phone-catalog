import { Product } from '../types/Product';

export const togglePhoneInStorage = (object: Product, key: string) => {
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify([]));
  }

  let storge: Product[] = JSON.parse(localStorage.getItem(key) || '[]');

  if (storge.some(item => item.id === object.id)) {
    storge = storge.filter(item => item.id !== object.id);

    window.dispatchEvent(new CustomEvent('favouritesChanged'));

    localStorage.setItem(key, JSON.stringify(storge));

    return storge;
  }

  storge.push(object);
  localStorage.setItem(key, JSON.stringify(storge));

  window.dispatchEvent(new CustomEvent('favouritesChanged'));

  // dispatchEvent — викликає (поширює) подію.
  // new CustomEvent — створює подію.

  return storge;
};
