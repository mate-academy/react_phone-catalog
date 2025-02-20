import { useState, useEffect } from 'react';
import { ShopItem } from '../../types/ShopItem';

export const useLocalStorage = <T extends ShopItem>() => {
  const [favItems, setFavItems] = useState<T[]>([]);

  useEffect(() => {
    const savedFavItems = localStorage.getItem('favItems');

    if (savedFavItems) {
      setFavItems(JSON.parse(savedFavItems));
    }
  }, []);

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
          ? prev.filter(el => el.id !== item.id)
          : [...prev, item];
          
        localStorage.setItem('favItems', JSON.stringify(newFavItems));

        return newFavItems;
      });
    }
  };

  //
  // else if (listName === 'cart') {
  //   setCartItems(prev => {
  //     const newCartItems = isPicked
  //       ? prev.filter(el => el.id !== item.id)
  //       : [...prev, item].map(item => ({
  //           ...item,
  //           quantity: 1,
  //         }));

  //     return newCartItems;
  //   });
  // }

  // localStorage.setItem('cartItems', JSON.stringify(cartItems));
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

// else if (listName === 'cart') {
//   setCartItems(prev => {
//     const itemExists = prev.find(el => el.id === item.id);
//     let newCartItems;

//     if (isPicked) {
//       // Видалити елемент
//       newCartItems = prev.filter(el => el.id !== item.id);
//     } else {
//       if (itemExists) {
//         // Якщо елемент вже в списку, не додавайте його повторно або просто оновіть quantity
//         newCartItems = prev.map(el =>
//           el.id === item.id ? { ...el, quantity: el.quantity + 1 } : el
//         );
//       } else {
//         // Додати новий елемент з quantity = 1
//         newCartItems = [...prev, { ...item, quantity: 1 }];
//       }
//     }

//     localStorage.setItem('cartItems', JSON.stringify(newCartItems));
//     return newCartItems;
//   });
// }
