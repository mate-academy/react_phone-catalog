import { useEffect, useState } from 'react';
import { CartItem, Product } from '../../types/Product';

export const useProductlist = (key: string) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(key);

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(items));
  }, [items, key]);

  const add = (product: Product) => {
    setItems(prev => {
      const isExist = prev.some(item => String(item.id) === String(product.id));

      if (isExist) {
        return prev;
      }

      return [...prev, { ...product, id: String(product.id), quantity: 1 }];
    });
  };

  const has = (id: string | number) => {
    return items.some(item => String(item.id) === String(id));
  };

  const remove = (id: string | number) => {
    setItems(prev => prev.filter(item => String(item.id) !== String(id)));
  };

  const increaseQuantity = (id: string) => {
    setItems(prev =>
      prev.map(item =>
        String(item.id) === String(id) ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (id: string) => {
    setItems(prev =>
      prev.map(item =>
        String(item.id) === String(id)
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item,
      ),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  return {
    items,
    add,
    remove,
    has,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  };
};
