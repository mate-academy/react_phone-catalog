/* eslint-disable no-restricted-syntax */
import { useLocalStorage } from './useLocalStorage';

type Item<T> = {
  quantity: number,
  item: T;
};

export function useStorage<T>(ininitalValue: Item<T>[], key: string):
[
  (item: T) => void,
  (item: T) => boolean,
  () => number,
  (item: T) => void,
  (item: T) => void,
] {
  const [values, setValues] = useLocalStorage(ininitalValue, key);

  const getQuantity = () => {
    return values.length;
  };

  const reduceItem = (item: T) => {
    const newValues = [];

    for (const value of values) {
      if (value.item !== item) {
        newValues.push(value);
      }
    }

    setValues(newValues);
  };

  const isIncluded = (item: T) => {
    for (const value of values) {
      if (value.item === item) {
        return true;
      }
    }

    return false;
  };

  const manageItem = (item: T) => {
    if (isIncluded(item)) {
      reduceItem(item);
    } else {
      setValues(prev => [...prev, { quantity: 1, item }]);
    }
  };

  const increaseQuantity = (item: T) => {
    for (const value of values) {
      if (value.item === item) {
        value.quantity += 1;
      }
    }
  };

  const decreaseQuantity = (item: T) => {
    for (const value of values) {
      if (value.item === item && value.quantity === 1) {
        reduceItem(item);
      } else if (value.item === item) {
        value.quantity -= 1;
      }
    }
  };

  return [
    manageItem,
    isIncluded,
    getQuantity,
    increaseQuantity,
    decreaseQuantity,
  ];
}
