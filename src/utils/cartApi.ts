/* eslint-disable @typescript-eslint/no-shadow */
import { useState } from 'react';
import { Cart } from '../types/Cart';
import { Phone } from '../types/Phone';

type Setter = [Cart[], (val: Cart[]) => void];

export const useLocalstorage
= (key: string, initialValue: Cart[]): Setter => {
  const [value, setValue] = useState<Cart[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || '') || initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (value: Cart[]) => {
    setValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [value, save];
};

export const addOneCart = (list: Cart[], cart: Cart) => {
  const current = list.find(item => item.id === cart.id);
  const copy = [...list];

  return current
    ? copy.map(item => {
      return item.id === current.id
        ? {
          ...item,
          quantity: item.quantity + 1,
        }
        : item;
    })
    : [
      ...list,
      cart,
    ];
};

export const removeOneCart = (list: Cart[], cart: Cart) => {
  const current = list.find(item => item.id === cart.id);
  const copy = [...list];

  if (current && current.quantity > 1) {
    return copy.map(item => {
      return item.id === cart.id
        ? {
          ...item,
          quantity: item.quantity - 1,
        }
        : item;
    });
  }

  if (current && current.quantity === 1) {
    return copy.filter(item => item.id !== cart.id);
  }

  return list;
};

export const deleteCart = (list: Cart[], cart: Cart) => {
  return list.filter(item => item.id !== cart.id);
};

export const path = process.env.PUBLIC_URL;

export const cart = (phone: Phone): Cart => {
  const imagePath = `${path}_new/${phone.image}`;

  return {
    id: phone.id,
    name: phone.name,
    price: phone.price,
    image: imagePath,
    quantity: 1,
  };
};
