import { useGlobalData } from '@features/index';
import { useCallback, useMemo, useState } from 'react';

export const useCartPage = () => {
  const { itemsInCart } = useGlobalData();
  const [unitPrices, setUnitPrices] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};

    itemsInCart.forEach(item => {
      initial[item.id] = 0;
    });

    return initial;
  });

  const updatePrice = useCallback((id: string, unitPrice: number) => {
    setUnitPrices(prev => ({
      ...prev,
      [id]: unitPrice,
    }));
  }, []);

  const allPricesLoaded = useMemo(() => {
    return itemsInCart.every(
      item => unitPrices[item.id] && unitPrices[item.id] !== 0,
    );
  }, [unitPrices, itemsInCart]);

  const totalPrice = useMemo(() => {
    return itemsInCart.reduce((sum, item) => {
      const unitPrice = unitPrices[item.id] || 0;

      return sum + unitPrice * item.amount;
    }, 0);
  }, [unitPrices, itemsInCart]);

  return { itemsInCart, updatePrice, allPricesLoaded, totalPrice };
};
