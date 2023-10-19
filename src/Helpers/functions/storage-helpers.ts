import { Dispatch, SetStateAction } from 'react';
import { StorageItem } from '../types/StorageItem';

export const parseStorage = (storageName: string) => {
  const items = localStorage.getItem(storageName);

  return items
    ? JSON.parse(items)
    : [];
};

export const findItem = (
  storage: StorageItem[],
  id: string,
) => {
  return storage.find(
    (item: StorageItem) => item.id === id,
  );
};

export const setItemInStorage = (
  storageName: string,
  storage: StorageItem[],
) => {
  localStorage.setItem(
    storageName,
    JSON.stringify(storage),
  );
};

export const addHandler = (
  storageName: string,
  addedItem: StorageItem,
  setState: Dispatch<SetStateAction<StorageItem | undefined>>,
  setContext: Dispatch<SetStateAction<number>>,
  prevContext: number,
) => {
  let parsedStorage = parseStorage(storageName);
  const isAdded = findItem(parsedStorage, addedItem.id);

  if (isAdded) {
    setContext(prevContext - addedItem.quantity);
    setState(undefined);
    parsedStorage = parsedStorage.filter(
      (storageItem: StorageItem) => {
        return storageItem.id !== addedItem.id;
      },
    );
  } else {
    parsedStorage.push(addedItem);
    setState(addedItem);
    setContext(prevContext + 1);
  }

  setItemInStorage(storageName, parsedStorage);
};
