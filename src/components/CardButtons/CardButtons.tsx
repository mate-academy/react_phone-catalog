/* eslint-disable jsx-a11y/control-has-associated-label */
import { useMemo } from 'react';
import classNames from 'classnames';
import './CardButtons.scss';
import { Phone } from '../../types/Phone';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as favoritesActions from '../../features/favorites';
import * as cartActions from '../../features/cart';

type Props = {
  card: Phone;
  info: 'card' | 'detail';
};

export const CardButtons: React.FC<Props> = ({ card, info }) => {
  const { favorites } = useAppSelector(state => state.favorites);
  const { cart } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  const isAddedToCart = useMemo(() => (
    cart.find(value => value.id === card.id)
  ), [cart]);

  const handleClickCart = () => {
    if (isAddedToCart) {
      dispatch(cartActions.remove(card.id));
    } else {
      dispatch(cartActions.add(
        { id: card.id, quantity: 1, product: card },
      ));
    }
  };

  const handleClickFavorites = () => {
    if (favorites.find(value => value.id === card.id)) {
      dispatch(favoritesActions.remove(card.id));
    } else {
      dispatch(favoritesActions.add(card));
    }
  };

  return (
    <div className="card-buttons">
      <button
        type="button"
        className={classNames(
          'card-buttons__cart',
          {
            'card-buttons__cart--detail': info === 'detail',
            'card-buttons__cart--selected': isAddedToCart,
          },
        )}
        onClick={handleClickCart}
      >
        {isAddedToCart
          ? 'Added to cart'
          : 'Add to cart'}
      </button>
      <button
        type="button"
        className={classNames(
          'card-buttons__favorite',
          {
            'card-buttons__favorite--detail': info === 'detail',
            'card-buttons__favorite--selected':
            favorites.find(value => value.id === card.id),
          },
        )}
        onClick={handleClickFavorites}
        data-cy="addToFavorite"
      />
    </div>
  );
};
