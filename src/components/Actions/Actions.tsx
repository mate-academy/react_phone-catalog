import cn from 'classnames';
import styles from './Actions.module.scss';
import { useContext } from 'react';
import { SvgIcon } from '../SvgIcon';
import { DispatchContext, StateContext } from '../../contex/State';
import { Product } from '../../types';

interface Props {
  product: Product;
  className?: string;
}

export const Actions: React.FC<Props> = ({ className, product }) => {
  const { favourites, cart } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const { itemId } = product;

  const isFavourite = favourites.find(p => p.itemId === itemId);
  const isInCart = cart.find(p => p.id === itemId);

  const changeFavouriteStatus = () => {
    if (isFavourite) {
      dispatch({ type: 'removeFavourites', payload: itemId });
    } else {
      dispatch({ type: 'addFavourites', payload: product });
    }
  };

  const changeCartStatus = () => {
    if (isInCart) {
      return;
    } else {
      dispatch({
        type: 'addCart',
        payload: { product: product, quantity: 1, id: product.itemId },
      });
    }
  };

  return (
    <div className={cn(styles.actions, className)}>
      <button
        className={cn(styles['actions__btn-cart'], {
          [styles['actions__btn-cart--active']]: isInCart,
        })}
        onClick={changeCartStatus}
      >
        {isInCart ? 'Added to cart' : 'Add to cart'}
      </button>

      <button
        className={cn(styles['actions__btn-favourites'], {
          [styles['actions__btn-favourites--active']]: isFavourite,
        })}
        onClick={changeFavouriteStatus}
        aria-label="Change favourite status"
      >
        {isFavourite ? (
          <SvgIcon type={'heart-like'} />
        ) : (
          <SvgIcon type={'heart'} />
        )}
      </button>
    </div>
  );
};
