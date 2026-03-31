import React from 'react';
import { Product } from '../../types/Product';
import { Main } from './components/Main';

type Props = {
  products: Product[];
  favourites: Product[];
  onToggleFavourite: (product: Product) => void;
  onAddToCart: (product: Product) => void;
};

export const HomePage: React.FC<Props> = ({
  products,
  favourites,
  onToggleFavourite,
  onAddToCart,
}) => {
  return (
    <Main
      products={products}
      favourites={favourites}
      onToggleFavourite={onToggleFavourite}
      onAddToCart={onAddToCart}
    />
  );
};
