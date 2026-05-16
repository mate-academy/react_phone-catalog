export enum LocalKeys {
  Cart = 'Cart',
  Favs = 'Favs',
}

export const setLocalStorage = (itemName: LocalKeys, value: string) => {
  localStorage.setItem(itemName, value);
};
