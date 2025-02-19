import { useState } from 'react';
import { ShopItem } from '../../types/ShopItem';

export const useLocalStorage = <T extends ShopItem>() => {
  const [favItems, setFavItems] = useState<T[]>(() => {
    const favItems = localStorage.getItem('favItems');

    return favItems ? JSON.parse(favItems) : [];
  });

  const [cartItems, setCartItems] = useState<T[]>(() => {
    const cartItems = localStorage.getItem('cartItems');

    return cartItems ? JSON.parse(cartItems) : [];
  });

  const manageItems = (
    item: T,
    listName: 'fav' | 'cart',
    isPicked: boolean,
  ) => {
    if (listName === 'fav') {
      setFavItems(prev => {
        const newFavItems = isPicked
          ? prev.filter(el => el !== item)
          : [...prev, item];
        localStorage.setItem('favItems', JSON.stringify(newFavItems));
        return newFavItems;
      });
    } else if (listName === 'cart') {
      setCartItems(prev => {
        const newCartItems = isPicked
          ? prev.filter(el => el !== item)
          : [...prev, item];

        const cartItemsQuantity = newCartItems.map(item => ({
          ...item,
          quantity: 1,
        }));

        localStorage.setItem('cartItems', JSON.stringify(cartItemsQuantity));

        return cartItemsQuantity;
      });
    }
  };

  const changeQuantity = (id: string, action: 'add' | 'delete') => {
    setCartItems(prev => {
      const changedItemsQuantity = prev.map(el => {
        if (el.id === id && el.quantity && action === 'add') {
          return { ...el, quantity: el.quantity + 1 };
        } else if (el.id === id && el.quantity && action === 'delete') {
          return { ...el, quantity: el.quantity > 1 ? el.quantity - 1 : 1 };
        }
        return el;
      });

      localStorage.setItem('cartItems', JSON.stringify(changedItemsQuantity));

      return changedItemsQuantity;
    });
  };

  return { favItems, cartItems, manageItems, changeQuantity };
};
