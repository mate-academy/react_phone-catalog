import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { ICartItem } from '../../types';
import * as cartActions from '../../slices/cartSlice';

import './CartItem.scss';

type Props = {
  item: ICartItem;
};

export const CartItem: React.FC<Props> = ({
  item: { id, product, quantity },
}) => {
  const dispatch = useAppDispatch();
  const { category, itemId, image, name, price } = product;

  const link = `/${category}/${itemId}`;

  const handleDeleteItem = () => {
    dispatch(cartActions.deleteItem(id));
  };

  const handleDecreaseQuantity = () => {
    dispatch(
      cartActions.setQuantity({
        id,
        quantity: quantity - 1,
      }),
    );
  };

  const handleIncreaseQuantity = () => {
    dispatch(
      cartActions.setQuantity({
        id,
        quantity: quantity + 1,
      }),
    );
  };

  return (
    <div className="cart-item">
      <div className="cart-item__details">
        <button
          type="button"
          className="cart-item__delete-button"
          data-cy="cartDeleteButton"
          onClick={handleDeleteItem}
        >
          x
        </button>

        <img src={image} alt={name} className="cart-item__product-image" />

        <Link to={link} className="cart-item__product-name">
          {name}
        </Link>
      </div>

      <div className="cart-item__quantity-price">
        <div className="cart-item__count-container">
          <button
            type="button"
            className="cart-item__count-button"
            onClick={handleDecreaseQuantity}
            disabled={quantity === 1}
          >
            -
          </button>

          <p className="cart-item__item-count">{quantity}</p>

          <button
            type="button"
            className="cart-item__count-button"
            onClick={handleIncreaseQuantity}
          >
            +
          </button>
        </div>

        <p className="cart-item__product-price">${price}</p>
      </div>
    </div>
  );
};
