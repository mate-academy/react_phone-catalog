import { useContext } from 'react';
import { usersChoiceContext } from '../context/UsersChoiceContext';
import { Phone } from '../types/Phone';
import { PhoneInCart } from '../types/PhoneInCart';

export const useCart = () => {
  const {
    inCart,
    setInCart,
    inCartID,
    setInCartID,
  }
    = useContext(usersChoiceContext);

  const localStorageHandler = (
    inCartStorage: Phone[], inCartIDStorage: string[],
  ) => {
    localStorage
      .setItem('cart_array', JSON.stringify(inCartStorage));
    localStorage
      .setItem('cart_id_array', JSON.stringify(inCartIDStorage));
  };

  const addToCart = (info: Phone) => {
    if (inCartID.includes(info.id)) {
      return;
    }

    let inCartStorage: PhoneInCart[] = [];
    let inCartIDStorage: string[] = [];

    if (inCart.length === 0) {
      inCartStorage = [{ ...info, number: 1 }];
      inCartIDStorage = [info.id];
      setInCart([{ ...info, number: 1 }]);
      setInCartID([info.id]);
    } else {
      inCartStorage = [...inCart, { ...info, number: 1 }];
      inCartIDStorage = [...inCartID, info.id];

      setInCart(prev => [...prev, { ...info, number: 1 }]);
      setInCartID(prev => [...prev, info.id]);
    }

    localStorageHandler(inCartStorage, inCartIDStorage);
  };

  const removeFromCart = (infoId: string) => {
    if (!inCartID.includes(infoId)) {
      return;
    }

    const inCartStorage = [...inCart]
      .filter(el => el.id !== infoId);
    const inCartIDStorage = [...inCartID]
      .filter(el => el !== infoId);

    setInCart(inCartStorage);
    setInCartID(inCartIDStorage);

    localStorageHandler(inCartStorage, inCartIDStorage);
  };

  const changeNumber = (info: PhoneInCart, action?: string) => {
    const inCartStorage = [...inCart].map(el => {
      if (el.id === info.id) {
        const { number } = info;

        switch (action) {
          case 'SUBTRACT':
            return { ...el, number: number - 1 };
          default:
            return { ...el, number: number + 1 };
        }
      }

      return el;
    });

    setInCart(inCartStorage);

    localStorage
      .setItem('cart_array', JSON.stringify(inCartStorage));
  };

  return { addToCart, removeFromCart, changeNumber };
};
