import { useContext } from 'react';
import { DispatchContext, Do, StateContext } from '../../../../context/context';
import styles from './AddButtons.module.scss';
import { Product } from '../../../../types/product';
import classNames from 'classnames';
import HeartIcon from '../../icons/HeartIcon/Icon';

type Props = {
  product: Product;
};

export const AddButtons: React.FC<Props> = ({ product }) => {
  const { favorites, cart } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const activeFavorite = favorites.find(p => p.itemId === product.itemId);
  const addedToCart = cart.find(item => item.itemId === product.itemId);

  function handleFavClick() {
    if (activeFavorite) {
      return dispatch({ type: Do.DELETE_FAV, payload: product });
    } else {
      return dispatch({ type: Do.ADD_FAV, payload: product });
    }
  }

  function handleCartClick() {
    return dispatch({ type: Do.ADD_CART, payload: product });
  }

  return (
    <div className={styles.buttons}>
      <button
        className={styles.buttons__cart}
        onClick={() => handleCartClick()}
        disabled={addedToCart ? true : false}
      >
        Add to cart
      </button>
      <div
        className={classNames(styles.buttons__fav, {
          [styles['buttons__fav--active']]: activeFavorite,
        })}
        onClick={() => handleFavClick()}
      >
        <HeartIcon active={activeFavorite ? true : false} />
      </div>
    </div>
  );
};

export default AddButtons;
