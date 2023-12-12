import React, { useContext } from 'react';
import classNames from 'classnames';
import './ButtonFavorites.scss';
import { Product } from '../../types/Product';
import { FavoriteContext } from '../../api/context/FavotiteContext';

interface Props {
  product: Product,
}

export const ButtonFavorites: React.FC<Props> = ({ product }) => {
  const {
    favProducts,
    handleAddFavorites,
  } = useContext(FavoriteContext);

  const isProductFavorite = favProducts.some(fav => fav.id === product.id);

  return (
    <button
      className="buttonFavorites"
      type="button"
      data-cy="addToFavorite"
      onClick={(event) => {
        event.preventDefault();
        handleAddFavorites(product);
      }}
    >
      <div
        className={classNames('icon', {
          'icon--fav': !isProductFavorite,
          'icon--fav-add': isProductFavorite,
        })}
      />
    </button>
  );
};
