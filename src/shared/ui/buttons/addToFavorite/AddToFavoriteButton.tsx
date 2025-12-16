import React, { useContext } from 'react';
import styles from './AddToFavoriteButton.module.scss';
import { Product } from '../../../types/Product';
import { ProductDispatchContext } from '../../../context/ProductsContext';

type Props = {
  product?: Product;
};

export const AddToFavoriteButton: React.FC<Props> = ({ product }) => {
  const productDispatch = useContext(ProductDispatchContext);
  const isProductFavorite = !!product?.isFavorite;

  const addToFavorite = () => {
    if (product) {
      productDispatch({
        type: 'toggle_favorite',
        payload: { id: product?.itemId },
      });
    }
  };

  return (
    <button className={styles.button} onClick={addToFavorite}>
      {!isProductFavorite ? (
        <img src={`img/icons/favorites.svg`} alt="favorite" />
      ) : (
        <img src={`img/icons/favoritesSelected.svg`} alt="favoriteSelected" />
      )}
    </button>
  );
};
