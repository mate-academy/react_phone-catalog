import React from 'react';
import style from './Favorite.module.scss';
import favoriteImg from '../assets/icons/favourites-heart-like.svg';

export const Favorite = () => {
  return <img src={favoriteImg} alt="favorite" className={style.favorite} />;
};
