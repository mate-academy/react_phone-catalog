import classNames from 'classnames';
import React from 'react';
import { useProducts } from '../../context/productsContext';
import styles from './IconButton.module.scss';
import { Product } from '../../types';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

type Props = {
  item: Product;
  isBig?: boolean;
};

const IconButton: React.FC<Props> = ({ item, isBig = false }) => {
  const { favorites, setFavorites } = useProducts();
  const isFavorite = favorites.find(product => product.id === item.id);

  const storeFavorites = () => {
    if (!isFavorite) {
      setFavorites(prev => [...prev, item]);
    } else {
      setFavorites(prev => [...prev].filter(product => product.id !== item.id));
    }
  };

  return (
    <button
      onClick={storeFavorites}
      className={classNames(styles.favorite, {
        [styles.favorite_active]: isFavorite,
        [styles.favorite_big]: isBig,
      })}
    >
      {isFavorite ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
};

export default IconButton;
