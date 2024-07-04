import classNames from 'classnames';
import styles from './Buttons.module.scss';
import { useContext } from 'react';
import { DispatchContext, StateContext } from '../../../Store';
import { getId } from '../../../utils/getId';

type Props = {
  category: string;
  id: string;
};

export const Buttons: React.FC<Props> = ({ category, id }) => {
  const dispatch = useContext(DispatchContext);
  const { products, favourites, cart } = useContext(StateContext);

  const hasInCart = cart.some(
    item => item.id === getId(category, products, id),
  );

  const onClickFavHandle = () => {
    const itemId = getId(category, products, id);

    if (itemId) {
      dispatch({ type: 'addToFavourites', id: itemId });
    }
  };

  const onClickCart = () => {
    const itemId = getId(category, products, id);

    if (itemId) {
      dispatch({ type: 'addToCart', id: itemId });
    }
  };

  return (
    <div className={classNames(styles.buttons)}>
      {hasInCart ? (
        <button
          className={classNames(
            styles.buttons__button,
            styles['buttons__button-cart'],
            styles['buttons__button-cartActive'],
          )}
          onClick={onClickCart}
        >
          Added
        </button>
      ) : (
        <button
          className={classNames(
            styles.buttons__button,
            styles['buttons__button-cart'],
          )}
          onClick={onClickCart}
        >
          Add to cart
        </button>
      )}

      <button
        className={classNames(
          styles.buttons__button,
          styles['buttons__button-fav'],
          {
            [styles['buttons__button-fav-selected']]: favourites.some(
              item => item.id === getId(category, products, id),
            ),
          },
        )}
        onClick={onClickFavHandle}
      />
    </div>
  );
};
