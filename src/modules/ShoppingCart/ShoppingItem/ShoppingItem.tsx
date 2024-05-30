/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import classNames from 'classnames';
import { Product } from '../../../types/Product';
import { IconClose } from '../../shared/IconsSVG';
import { NumberOrSymbol } from '../../shared/Buttons/MoveButtons';
import { ShoppingCartContext } from '../../../store/ShoppingCartContext';

type Props = {
  product: Product;
};

export const ShoppingItem: React.FC<Props> = React.memo(({ product }) => {
  const { name, image, price, itemId } = product;

  const { shoppingList, setShoppingList } = useContext(ShoppingCartContext);

  const countItems = shoppingList.reduce((total, device) => {
    if (device === itemId) {
      return total + 1;
    }

    return total;
  }, 0);

  const onDecrease = () => {
    if (countItems === 1) {
      return;
    }

    const indx = shoppingList.indexOf(itemId);

    const updatedShoppingList = [
      ...shoppingList.slice(0, indx),
      ...shoppingList.slice(indx + 1),
    ];

    setShoppingList(updatedShoppingList);
  };

  const onAdding = () => {
    setShoppingList([...shoppingList, itemId]);
  };

  const deleteDevice = () => {
    const updatedShoppingList = shoppingList.filter(
      device => device !== itemId,
    );

    setShoppingList(updatedShoppingList);
  };

  return countItems !== 0 ? (
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

        <p className="shopping-item__price">{`$${price}`}</p>
      </div>
    </div>
  ) : null;
});
