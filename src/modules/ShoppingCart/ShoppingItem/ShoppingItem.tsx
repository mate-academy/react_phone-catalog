/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import classNames from 'classnames';
import { IconClose } from '../../shared/IconsSVG';
import { NumberOrSymbol } from '../../shared/Buttons/MoveButtons';
import { ShoppingCartContext } from '../../../store/ShoppingCartContext';
import { CartItem } from '../../../types/CartItem';

type Props = {
  cartItem: CartItem;
};

export const ShoppingItem: React.FC<Props> = React.memo(({ cartItem }) => {
  const { name, image, currentPrice, itemId } = cartItem;

  const { shoppingList, setShoppingList } = useContext(ShoppingCartContext);

  const countItems = shoppingList.reduce((total, device) => {
    if (device.itemId === itemId) {
      return total + 1;
    }

    return total;
  }, 0);

  const onDecrease = () => {
    if (countItems === 1) {
      return;
    }

    const indx = shoppingList.lastIndexOf(cartItem);

    const updatedShoppingList = [
      ...shoppingList.slice(0, indx),
      ...shoppingList.slice(indx + 1),
    ];

    setShoppingList(updatedShoppingList);
  };

  const onAdding = () => {
    setShoppingList([...shoppingList, cartItem]);
  };

  const deleteDevice = () => {
    const updatedShoppingList = shoppingList.filter(
      device => device !== cartItem,
    );

    setShoppingList(updatedShoppingList);
  };

  return countItems > 0 ? (
    <div className="shopping-item">
      <div className="shopping-item__main-row">
        <button
          type="button"
          className="shopping-item__delete"
          onClick={deleteDevice}
        >
          <IconClose />
        </button>

        <div className="shopping-item__img-wrapper">
          <img src={image} alt={name} className="shopping-item__img" />
        </div>

        <p className="shopping-item__name">{name}</p>
      </div>

      <div className="shopping-item__count-and-price">
        <div className="shopping-item__change-count">
          <div
            className={classNames('shopping-item__decrease', {
              disabled: countItems === 1,
            })}
          >
            <NumberOrSymbol move={onDecrease} />
          </div>

          <p className="shopping-item__count-items">{countItems}</p>

          <div className="shopping-item__adding">
            <NumberOrSymbol move={onAdding} />
          </div>
        </div>

        <p className="shopping-item__price">{`$${currentPrice}`}</p>
      </div>
    </div>
  ) : null;
});
