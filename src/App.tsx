import React, { FC, useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';

import './styles/index.scss';
import { ProductCard } from './modules/shared/ProductCard';
import { useBoolean } from './hooks/useBoolean';
import { CartCard } from './modules/shared/CartCard';

const PRODUCT = {
  id: 24,
  category: 'phones',
  itemId: 'apple-iphone-11-pro-256gb-gold',
  name: 'Apple iPhone 11 Pro 256GB Gold',
  fullPrice: 1640,
  price: 1570,
  screen: "5.8' OLED",
  capacity: '256GB',
  color: 'gold',
  ram: '4GB',
  year: 2019,
  image: 'img/phones/apple-iphone-11-pro/gold/00.webp',
};

export const App: FC = () => {
  const [isFavourite, changeIsFavourite] = useBoolean(false);
  const [isInCart, changeIsInCart] = useBoolean(false);
  const [quantity, setQuantity] = useState(0);

  const increase = () => setQuantity(current => current + 1);
  const decrease = () => setQuantity(current => current - 1);

  return (
    <Router>
      <ProductCard
        to={'/'}
        product={PRODUCT}
        isFavourite={isFavourite}
        handleFavouriteClick={changeIsFavourite}
        isInCart={isInCart}
        handleAddToCart={changeIsInCart}
      />
      <CartCard
        to={'/'}
        count={quantity}
        decrease={decrease}
        increase={increase}
        removeProduct={() => {}}
        product={PRODUCT}
      />
    </Router>
  );
};
