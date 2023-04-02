import { useCallback, useContext } from 'react';
import { CatalogContext } from '../../context';
import { CartAction } from '../../enums/enums';
import { CartItemType } from '../../types/CartItemType';
import { Button } from '../Button';
import './cart-item.scss';

type Props = {
  item: CartItemType;
};

export const CartItem: React.FC<Props> = ({ item }) => {
  const { dispatchCart } = useContext(CatalogContext);

  const onIncrease = useCallback(() => {
    dispatchCart({ type: CartAction.INCREASE, payload: item.id });
  }, [item]);

  const onDecrease = useCallback(() => {
    if (item.quantity === 1) {
      return;
    }

    dispatchCart({ type: CartAction.DECREASE, payload: item.id });
  }, [item]);

  const onRemove = useCallback(() => {
    dispatchCart({ type: CartAction.REMOVE, payload: item.id });
  }, [item]);

  return (
    <div className="cart-item">
      <Button
        width="10px"
        height="10px"
        type="button--close"
        handler={onRemove}
      >
        <img src="/img/icons/Close.svg" alt="Remove" />
      </Button>

      <img className="cart-item__img" src={item.imageUrl} alt="item" />
      <p className="cart-item__name">
        {item.product}
      </p>

      <div className="cart-item__buttons">
        <Button
          width="32px"
          height="32px"
          disabled={item.quantity === 1}
          handler={onDecrease}
        >
          <img src="/img/icons/Minus.svg" alt="decrease" />
        </Button>

        <span className="cart-item__count">
          {item.quantity}
        </span>

        <Button
          width="32px"
          height="32px"
          handler={onIncrease}
        >
          <img src="/img/icons/Plus.svg" alt="increase" />
        </Button>
      </div>

      <h2 className="cart-item__price">
        {`$${item.price * item.quantity}`}
      </h2>
    </div>
  );
};
