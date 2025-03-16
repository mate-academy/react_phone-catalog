import React from 'react';
import style from './Favorite.module.scss';
import favoriteImg from '../assets/icons/favourites-heart-like.svg';
import { useCart } from '../../modules/HomePage/hook/CartContext';

export const Favorite: React.FC = () => {
  const cartContext = useCart();

  if (!cartContext) {
    return `Not loading context`;
  }

  const { favourite } = cartContext;

  return (
    <div className={style.container}>
      <img src={favoriteImg} alt="Favorite icon" className={style.favorite} />
      {favourite.length > 0 && <span className={style.countProduct}>{favourite.length}</span>}
    </div>
  );
};
