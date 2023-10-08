import classNames from 'classnames';
import { useContext } from 'react';
import { FavContext } from '../contexts/FavContextProvider';
import { Product } from '../../types/Product';

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
    >
      {isAdded ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
