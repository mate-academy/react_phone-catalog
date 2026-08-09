import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Product } from '../types/Product';

type CartItem = { id: string; quality: number; product: Product };

interface CardProps {
  item: CartItem[];
  add: (prod: Product) => void;
  remove: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clear: () => void;
  totalQuality: number;
  totalAmount: number;
}

const Context = createContext<CardProps | undefined>(undefined);
const KEY = 'cart';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [item, setItem] = useState<CartItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(item));
  }, [item]);

  const api: CardProps = useMemo(
    () => ({
      item,
      add: prod =>
        setItem(prev =>
          prev.find(index => index.id === prod.id)
            ? prev
            : [...prev, { id: prod.id, quality: 1, product: prod }],
        ),
      remove: id => setItem(prev => prev.filter(index => index.id !== id)),
      increment: id =>
        setItem(prev =>
          prev.map(index =>
            index.id === id ? { ...index, quality: index.quality + 1 } : index,
          ),
        ),
      decrement: id =>
        setItem(prev =>
          prev.map(index =>
            index.id === id
              ? { ...index, quality: Math.max(1, index.quality - 1) }
              : index,
          ),
        ),
      clear: () => setItem([]),
      totalQuality: item.reduce((s, index) => s + index.quality, 0),
      totalAmount: item.reduce(
        (s, index) =>
          s +
          index.quality * (index.product.priceRegular || index.product.price),
        0,
      ),
    }),
    [item],
  );

  return <Context.Provider value={api}>{children}</Context.Provider>;
};

export const useCard = () => {
  const card = useContext(Context);

  if (!card) {
    throw new Error('ERROR');
  }

  return card;
};
