/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext } from 'react';
import classNames from 'classnames';
import { FavContext } from '../contexts/FavContextProvider';
import './ButtonFav.scss';
import { Product } from '../../types/Product';
// import classNames from 'classnames';

type Props = {
  product: Product
};

export const ButtonFav: React.FC<Props> = ({ product }) => {
  const { favourites, addToFav, removeFromFav } = useContext(FavContext);

  const isAdded = favourites.find(({ phoneId }) => phoneId === product.phoneId);

  const handleAddToFav = () => {
    if (isAdded) {
      removeFromFav(product.phoneId);
    } else {
      addToFav(product);
    }
  };

  return (
    <button
      className={classNames('button-fav', {
        'button-fav--active': isAdded,
      })}
      // className="button-fav"
      type="button"
      onClick={handleAddToFav}
    />
  );
};
