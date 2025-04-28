import { useContext } from 'react';
import styles from './AddSelection.module.scss';
import cn from 'classnames';
import favourite from '../../../images/icons/Favourite.png';
import favouriteFilled from '../../../images/icons/Favourite Filled.png';
import { DispatchContext, StateContext } from '../../hooks/SelectionState';
import { Products } from '../../../types/Products';

interface Props {
  product: Products;
  className?: string;
}

export const AddSelection: React.FC<Props> = ({ product, className }) => {
  const { favourites, cart } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const { itemId } = product;

  const isInFavourite = favourites.find(p => p.itemId === itemId);
  const isInCart = cart.find(p => p.id === itemId);

  const changeStatus = () => {
    if (isInFavourite) {
      dispatch({ type: 'removeFavourites', payload: itemId });
    } else {
      dispatch({ type: 'addFavourites', payload: product });
    }
  };

  const addToCart = () => {
    if (!isInCart) {
      dispatch({
        type: 'addCart',
        payload: { product: product, quantity: 1, id: product.itemId },
      });
    }
  };

  return (
    <div className={cn(styles['add-selection'], className)}>
      <button
        className={cn(styles['add-selection__button-cart'], {
          [styles['add-selection__button-cart--active']]: isInCart,
        })}
        onClick={addToCart}
      >
        {isInCart ? 'Added to cart' : 'Add to cart'}
      </button>

      <button
        className={cn(styles['add-selection__button-favourites'], {
          [styles['add-selection__button-favourites--active']]: isInFavourite,
        })}
        onClick={changeStatus}
      >
        {isInFavourite ? (
          <img
            src={favouriteFilled}
            alt="liked"
            className={styles['add-selection__icon']}
          />
        ) : (
          <img
            src={favourite}
            alt="unliked"
            className={styles['add-selection__icon']}
          />
        )}
      </button>
    </div>
  );
};
