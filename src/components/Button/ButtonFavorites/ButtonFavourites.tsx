/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext } from 'react';

import classNames from 'classnames';
import './ButtonFavourites.scss';

import { FavouriteContext } from '../../../contexts/FavouriteContextProvider';
import { Product } from '../../../types/Product';

type Props = {
  product: Product;
};

export const ButtonFavourites: React.FC<Props> = ({ product }) => {
  const {
    favourites,
    addToFavourite,
    removeFromFavourite,
  } = useContext(FavouriteContext);

  const isAdded = favourites.find(({ phoneId }) => phoneId === product.phoneId);

  const handleAddFavourites = () => {
    if (isAdded) {
      removeFromFavourite(product.phoneId);
    } else {
      addToFavourite(product);
    }
  };

  return (
    <button
      type="button"
      onClick={handleAddFavourites}
      className={classNames(
        'button-favourites',
        { 'button-favourites--active': isAdded },
      )}
    />
  );
};
