/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext, useMemo } from 'react';
import classNames from 'classnames';
import './CardButtons.scss';
import { Phone } from '../../types/Phone';
import { LocalContext } from '../../LocalContext';

type Props = {
  card: Phone;
  info: 'card' | 'detail';
};

export const CardButtons: React.FC<Props> = ({ card, info }) => {
  const {
    favorites, setFavorites, cart, setCart,
  } = useContext(LocalContext);

  const isAddedToCart = useMemo(() => (
    cart.find(value => value.id === card.id)
  ), [cart]);

  const handleClickCart = () => {
    if (!isAddedToCart) {
      setCart([...cart, { id: card.id, quantity: 1, product: card }]);
    }
  };

  const handleClickFavorites = () => {
    if (favorites.find(value => value.id === card.id)) {
      setFavorites(favorites.filter(value => value.id !== card.id));
    } else {
      setFavorites([...favorites, card]);
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
        disabled={!!isAddedToCart}
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
