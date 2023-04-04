import classNames from 'classnames';
import { useContext } from 'react';
import { Product } from '../../types/Product';
import { FavContext } from '../contexts/FavContextProvider';

type FavButtonProps = {
  width: number,
  height: number,
  product: Product,
};

export const FavButton: React.FC<FavButtonProps> = ({
  width,
  height,
  product,
}) => {
  const { favItems, addToFav, removeFromFav } = useContext(FavContext);

  const isInFav = favItems.find(({ id }) => id === product.id);
  const handleFavToggle = () => {
    if (isInFav) {
      removeFromFav(product.id);
    } else {
      addToFav(product);
    }
  };

  return (
    <button
      style={{ width, height }}
      type="button"
      className="icon--btn"
      onClick={handleFavToggle}
    >
      <i className={classNames('icon', 'icon--fav', {
        'icon--fav-active': isInFav,
      })}
      />
    </button>
  );
};
