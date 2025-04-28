import React from 'react';
import styles from './ButtonAddToFavorites.module.scss';
import cn from 'classnames';
import { IProductCard } from '../../../interfaces/ProductCard.interface';
import { useActions } from '../../../store/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

const ButtonAddToFavorites: React.FC<{
  product: IProductCard,
}> = ({ product }) => {
  const { addToFavourites, removeFromFavourites } = useActions();
  const items = useTypedSelector(state => state.favourites.items);
  const existingItem = items.find(item => item.id === product.id);

  const handleAddToFavorites = () => {
    if (existingItem) {
      removeFromFavourites(existingItem);
    } else {
      addToFavourites(product);
    }
  };

  return (
    <button
      className={cn(styles.btn, { [styles.selected]: existingItem })}
      onClick={handleAddToFavorites}
    >
      {existingItem ? (
        <img
          className={styles.btn__img}
          src="/images/icons/FavouritesAdded.png"
        />
      ) : (
        <img className={styles.btn__img} src="/images/icons/Favourites.png" />
      )}
    </button>
  );
};

export default ButtonAddToFavorites;
