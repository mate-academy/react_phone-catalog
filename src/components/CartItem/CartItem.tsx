import React from 'react';
import { Button } from '../Button/Button';
import { Product } from '../../types/Product';
import { usePhones } from '../../hooks/usePhones';

type Props = {
  item: Product,
};

export const CartItem: React.FC<Props> = ({
  item,
}) => {
  const {
    removeCartItem,
    getProductCount,
    plusCartItem,
    minusCartItem,
  } = usePhones();
  const {
    image,
    name,
    price,
    itemId,
  } = item;

  const count = getProductCount(itemId);

  const localPrice = count * price;

  return (
    <div className="cart__item">
      <Button
        className="
          button
          button__remove-item
          cart__remove-btn
        "
        onClick={() => removeCartItem(itemId)}
      >
        <img src="img/icons/close.svg" alt="Cross" />
      </Button>

      <div className="cart__item-img">
        <img src={image.replace('../', '')} alt="Phone" />
      </div>

      <div className="cart__item-title">
        {name}
      </div>

      <div className="cart__item-select-count">
        <Button
          className="
            button
            button__secondary
            button--small
            button__nav
            cart__item-minus
          "
          disabled={count <= 1}
          onClick={() => minusCartItem(itemId)}
        >
          <img src="img/icons/minus.svg" alt="Minus" />
        </Button>

        <div className="cart__item-count">
          {getProductCount(itemId)}
        </div>

        <Button
          className="
            button
            button__secondary
            button--small
            button__nav
            cart__item-plus
          "
          onClick={() => plusCartItem(itemId)}
        >
          <img src="img/icons/plus.svg" alt="Plus" />
        </Button>
      </div>

      <div className="cart__item-total-price">
        {`$${localPrice}`}
      </div>
    </div>
  );
};
