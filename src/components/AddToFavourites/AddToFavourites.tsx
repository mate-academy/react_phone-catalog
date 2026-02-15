import React, { useContext } from 'react';
import styles from './AddToFavourites.module.scss';
import classNames from 'classnames';
import { Products } from '../../utils/types';
import { FavoritesContext } from '../../context/FavoritesContext';
import { useTheme } from '../../context/ThemeContext';

type Props = {
  size: 's' | 'm';
  product: Products;
};
export const AddToFavourites: React.FC<Props> = ({ size, product }) => {
  const { isDarkTheme } = useTheme();
  const { favorites, setFavorites } = useContext(FavoritesContext);

  const productExistinFavorites = favorites.find(
    favItem => favItem.itemId === product.itemId,
  );

  const handleFavoritesAdd = () => {
    setFavorites(prevFavorites => [...prevFavorites, product]);
  };

  const handleFavoritesRemove = () => {
    setFavorites(previousFavorites =>
      previousFavorites.filter(prevItem => prevItem.itemId !== product.itemId),
    );
  };

  const elementSize =
    size === 's'
      ? { width: '40px', height: '40px' }
      : { width: '48px', height: '48px' };

  return (
    <button
      style={elementSize}
      className={classNames(styles.addToFavourites, {
        [styles['addToFavourites--dark']]: isDarkTheme,
        [styles['addToFavourites--added']]: productExistinFavorites,
      })}
      onClick={
        productExistinFavorites ? handleFavoritesRemove : handleFavoritesAdd
      }
    ></button>
  );
};
