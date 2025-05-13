import { useContext } from 'react';
import { CartContext, CartContextProps } from './CartContext';
import { Phone, Tablet, Accessories } from '../Types/BaseItem';

type ItemType = Phone | Tablet | Accessories;

export interface CartItemType {
  item: ItemType;
  quantity: number;
}

export const useCartContext = (): CartContextProps => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }

  return context;
};
