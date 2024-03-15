import { useAppDispatch } from '../../app/hooks';
import { ICartItem } from '../../types';
import * as cartActions from '../../slices/cartSlice';

import './CartItem.scss';

type Props = {
  item: ICartItem,
};

export const CartItem: React.FC<Props> = ({
  item: {
    id,
    product,
    quantity,
  },
}) => {
  const dispatch = useAppDispatch();

  const handleDeleteItem = () => {
    dispatch(cartActions.deleteItem(id));
  };

  const handleDecreaseQuantity = () => {
    dispatch(cartActions.setQuantity({
      id,
      quantity: quantity - 1,
    }));
  };

  const handleIncreaseQuantity = () => {
    dispatch(cartActions.setQuantity({
      id,
      quantity: quantity + 1,
    }));
  };

  return (
    <div className="cart-item">
      <button
        type="button"
        className="
        cart-item__button
        cart-item__button--delete-button
        "
        data-cy="cartDeleteButton"
        onClick={handleDeleteItem}
      >
        x
      </button>

      <img
        src={product.image}
        alt={product.name}
        className="cart-item__product-image"
      />

      <p className="cart-item__product-name">
        {product.name}
      </p>

      <div className="cart-item__count-container">
        <button
          type="button"
          className="
          cart-item__button
          cart-item__count-button
          "
          onClick={handleDecreaseQuantity}
          disabled={quantity === 1}
        >
          -
        </button>

        <p className="cart-item__item-count">
          {quantity}
        </p>

        <button
          type="button"
          className="
          cart-item__button
          cart-item__count-button
          "
          onClick={handleIncreaseQuantity}
        >
          +
        </button>
      </div>

      <p className="cart-item__product-price">{product.price}</p>
    </div>
  );
};
