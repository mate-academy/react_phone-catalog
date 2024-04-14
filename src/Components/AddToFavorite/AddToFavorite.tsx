import React, { useContext } from 'react';
import classNames from 'classnames';
import { Product } from '../../types/Product';
import { FavoriteContext } from '../../context/FavoriteContext';

import './AddToFavorite.scss';

type Props = {
  product: Product;
};

export const AddToFavorite: React.FC<Props> = ({ product }) => {
  const { favoritesProducts, setFavoritesProducts } =
    useContext(FavoriteContext);

  const isFavorite = favoritesProducts.some(
    favProduct => favProduct.id === product.id,
  );

  const handleAddToFavorites = (newProduct: Product) => {
    let updatedFavorites: Product[];

    if (favoritesProducts.some(favProduct => favProduct.id === newProduct.id)) {
      updatedFavorites = favoritesProducts.filter(
        favProduct => favProduct.id !== newProduct.id,
      );
    } else {
      updatedFavorites = [newProduct, ...favoritesProducts];
    }

    setFavoritesProducts(updatedFavorites);
  };

  return (
    <button
      className={classNames('button-favorite', {
        'button-favorite--active': isFavorite,
      })}
      onClick={() => handleAddToFavorites(product)}
    />
  );
};
