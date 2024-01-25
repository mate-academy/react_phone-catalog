/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react';
import { Product } from '../../types/Product';
import { useLocalStorage } from '../../helpers/useLocalStorage';

interface State {
  cardProducts: Product[],
  setCardProducts: (products: Product[]) => void,
  handleAddToCard: (product: Product) => void,
  visbleProducts: Product[],
  removeProduct: (productId: string) => void,
  countProducts: (productId: string) => number,
  increment: (product: Product) => void,
  decrement: (productId: string) => void,
}

export const CardContext = React.createContext<State>({
  cardProducts: [],
  setCardProducts: () => {},
  handleAddToCard: () => {},
  visbleProducts: [],
  removeProduct: () => {},
  countProducts: () => 0,
  increment: () => {},
  decrement: () => {},
});

interface Props {
  children: React.ReactNode,
}

export const CardProvider: React.FC<Props> = ({ children }) => {
  const [
    cardProducts,
    setCardProducts,
  ] = useLocalStorage<Product[]>('card', []);

  const isInCard: string[] = [];

  const visbleProducts = cardProducts.filter(item => {
    if (isInCard.includes(item.id)) {
      return false;
    }

    isInCard.push(item.id);

    return true;
  });

  const countProducts = (productId: string) => {
    return cardProducts.filter(prod => prod.id === productId).length;
  };

  const handleAddToCard = (product: Product) => {
    if (cardProducts.some(item => item.id === product.id)) {
      setCardProducts((currentProduct: Product[]) => {
        return currentProduct.filter(item => item.id !== product.id);
      });
    } else {
      setCardProducts((currentProducts: Product[]) => {
        return [...currentProducts, product];
      });
    }
  };

  const removeProduct = (productId: string) => {
    setCardProducts(cardProducts.filter(item => item.id !== productId));
  };

  const increment = (product: Product) => {
    setCardProducts((currentProd: Product[]) => [...currentProd, product]);
  };

  const decrement = (productId: string) => {
    setCardProducts((currentProd: Product[]) => {
      const index = currentProd
        .reverse()
        .findIndex(item => item.id === productId);

      return currentProd
        .slice(0, index)
        .concat(currentProd.slice(index + 1))
        .reverse();
    });
  };

  const value = useMemo(() => ({
    cardProducts,
    setCardProducts,
    handleAddToCard,
    removeProduct,
    countProducts,
    increment,
    decrement,
    visbleProducts,
  }), [cardProducts]);

  return (
    <CardContext.Provider value={value}>
      {children}
    </CardContext.Provider>
  );
};
