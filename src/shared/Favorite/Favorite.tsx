import React from 'react';
import style from './Favorite.module.scss';
import favoriteImg from '../assets/icons/favourites-heart-like.svg';

export const Favorite: React.FC = () => {
  return <img src={favoriteImg} alt="Favorite icon" className={style.favorite} />;
};
