import { KeysOfStorage } from '../types/KeysOfStorage';

const getNewItems = (items: string[], item: string) => {
  const newItems = [...items];

  if (newItems.includes(item)) {
    while (newItems.includes(item)) {
      newItems.splice(newItems.indexOf(item), 1);
    }
  } else {
    newItems.push(item);
  }

  return newItems;
};

const handlerChangeStorage = (
  key: KeysOfStorage,
  productId: string,
) => {
  const gotParam = localStorage.getItem(key);
  const newIds: string[] = gotParam ? JSON.parse(gotParam) : [];

  localStorage.removeItem(key);
  localStorage.setItem(key, JSON.stringify(getNewItems(newIds, productId)));
};

export function handlerChangeContext(
  productId: string,
  values: string[],
  setValues: (values: string[]) => void,
  key: KeysOfStorage,
) {
  setValues(getNewItems(values, productId));
  handlerChangeStorage(key, productId);
}

export const handlerStorageOneIdIs = (isAdd: boolean, phoneId: string) => {
  const gotParam = localStorage.getItem(KeysOfStorage.Cart);
  const newIds: string[] = gotParam ? JSON.parse(gotParam) : [];

  localStorage.removeItem(KeysOfStorage.Cart);

  if (isAdd) {
    newIds.push(phoneId);
  } else {
    newIds.splice(newIds.indexOf(phoneId), 1);
  }

  localStorage.setItem(KeysOfStorage.Cart, JSON.stringify(newIds));
};
