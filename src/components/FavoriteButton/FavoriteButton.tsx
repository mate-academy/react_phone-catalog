import React, { useContext, useMemo } from 'react';
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

  const selectedItem = useMemo(() => {
    if ('itemId' in product) {
      return product;
    }
    return goods?.find(good => good.itemId === product.id) || null;
  }, [product, goods]);

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

  const isFavorited = favoriteItems?.some(item => item.itemId === selectedItem?.itemId);

  return (
    <button
      className={isFavorited ? styles.favorited : styles.favoriteButton}
      onClick={isFavorited ? handleRemoveFromFavorites : handleAddToFavorites}
      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
    ></button>
  );
};
