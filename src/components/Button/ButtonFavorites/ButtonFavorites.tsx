/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext } from 'react';

import classNames from 'classnames';
import './ButtonFavorites.scss';

import { FavoriteContext } from '../../../contexts/FavoriteContextProvider';
import { Product } from '../../../types/Product';

type Props = {
  product: Product;
};

export const ButtonFavorites: React.FC<Props> = ({ product }) => {
  const {
    favorites,
    addToFavorite,
    removeFromFavorite,
  } = useContext(FavoriteContext);

  const isAdded = favorites.find(({ phoneId }) => phoneId === product.phoneId);

  const handleAddFavorites = () => {
    if (isAdded) {
      removeFromFavorite(product.phoneId);
    } else {
      addToFavorite(product);
    }
  };

  return (
    <button
      type="button"
      onClick={handleAddFavorites}
      className={classNames(
        'button-favorites',
        { 'button-favorites-active': isAdded },
      )}
    />
  );
};
