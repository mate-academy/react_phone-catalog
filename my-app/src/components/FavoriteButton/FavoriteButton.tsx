import React, { useContext} from 'react';
import { ProductsContext } from '../../context/ProductsContext';
import { FavoritesContext } from '../../context/FavoritesContext';
import styles from './FavoriteButton.module.scss';
import { Product, ProductDetailed } from '../../types/types';

interface Props {
  product: Product | ProductDetailed;
}

export const FavoriteButton: React.FC<Props> = ({ product }) => {
  const { goods } = useContext(ProductsContext);
  const { favoriteItems, updateFavoriteItems } = useContext(FavoritesContext);

  const selectedItem =
    "itemId" in product
      ? product
      : goods?.find((good) => good.itemId === product.id);

  const handleAddToFavorites = () => {
    if (selectedItem) {
      updateFavoriteItems(favoriteItems ? [...favoriteItems, selectedItem] : [selectedItem]);
    }
  };

  const handleRemoveFromFavorites = () => {
    if (favoriteItems && selectedItem) {
      updateFavoriteItems(favoriteItems.filter(item => item.itemId !== selectedItem.itemId));
    }
  };

  return (
    <>
      {favoriteItems?.some((item) => item.itemId === selectedItem?.itemId) ? (
        <button
        className={styles.favorited}
        onClick={handleRemoveFromFavorites}
      ></button>
      ) : (
        <button
          className={styles.favoriteButton}
          onClick={handleAddToFavorites}
        ></button>
      )}
    </>
  );
};
