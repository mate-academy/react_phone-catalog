/* eslint-disable jsx-a11y/control-has-associated-label */
import './Buttons.scss';

import classNames from 'classnames';
import { useContext } from 'react';
import { GlobalContext } from '../../GlobalContext';

type Props = {
  id: string,
  width: string,
  height: string,
};

export const Buttons: React.FC<Props> = ({ id, width, height }) => {
  const {
    productsList,
    cartItems,
    setCartItems,
    favouriteItems,
    setFavouriteItems,
  } = useContext(GlobalContext);

  const handleAdd = (itemId: string) => {
    const updated = productsList.find(item => item.itemId === itemId);

    if (updated) {
      if (cartItems.some(item => item.id === itemId)) {
        setCartItems([...cartItems].filter(item => item.id !== itemId));
      } else {
        setCartItems([
          ...cartItems, { id: updated.itemId, quantity: 1, product: updated },
        ]);
      }
    }
  };

  const handleFavourite = (itemId: string) => {
    const updated = productsList.find(item => item.itemId === itemId);

    if (updated) {
      if (favouriteItems.some(item => item.itemId === itemId)) {
        setFavouriteItems([...favouriteItems]
          .filter(item => item.itemId !== itemId));
      } else {
        setFavouriteItems([...favouriteItems, updated]);
      }
    }
  };

  const cartIds = cartItems.map(item => item.id);
  const favouriteIds = favouriteItems.map(item => item.itemId);

  return (
    <div className="Buttons">
      <button
        type="button"
        style={{
          height,
        }}
        className={classNames(
          'Buttons__button',
          'Buttons__button--add',
          { 'active-button': cartIds.includes(id) },
        )}
        onClick={() => handleAdd(id)}
      >
        {cartIds.includes(id) ? (
          <span>Added to cart</span>
        ) : (
          <span>Add to cart</span>
        )}
      </button>

      <button
        data-cy="addToFavorite"
        type="button"
        style={{
          height,
          width,
        }}
        className={classNames(
          'Buttons__button',
          'Buttons__button--favourite',
          {
            'active-button': favouriteIds
              .includes(id),
          },
        )}
        onClick={() => handleFavourite(id)}
      />
    </div>
  );
};
