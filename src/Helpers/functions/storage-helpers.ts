import { Dispatch, SetStateAction } from 'react';
import { Product } from '../types/Product';
import { StorageCartItem } from '../types/StorageCartItem';

export const parseStorage = (storageName: string) => {
  const items = localStorage.getItem(storageName);

  return items
    ? JSON.parse(items)
    : [];
};

export const findItem = (
  storage: StorageCartItem[] | Product[],
  id: string,
) => {
  return storage.some(
    (item: StorageCartItem | Product) => item.id === id,
  );
};

export const setItemInStorage = (
  storageName: string,
  storage: StorageCartItem[] | Product[],
) => {
  localStorage.setItem(
    storageName,
    JSON.stringify(storage),
  );
};

// const filterItemsInStorage = (
//   id: string,
//   pa: StorageCartItem[] | Product[],
// ) => pa.filter(
//   (storageItem: StorageCartItem | Product) => {
//     return storageItem.id !== id;
//   },
// );

export const addHandler = (
  storageName: string,
  addedItem: StorageCartItem | Product,
  setState: Dispatch<SetStateAction<boolean>>,
  setContext: Dispatch<SetStateAction<number>>,
  prevContext: number,
) => {
  let parsedStorage = parseStorage(storageName);
  const isAdded = findItem(parsedStorage, addedItem.id);

  if (isAdded) {
    parsedStorage = parsedStorage.filter(
      (storageItem: StorageCartItem | Product) => {
        return storageItem.id !== addedItem.id;
      },
    );

    setState(false);
    setContext(prevContext - 1);
  } else {
    parsedStorage.push(addedItem);
    setState(true);
    setContext(prevContext + 1);
  }

  setItemInStorage(storageName, parsedStorage);
};
