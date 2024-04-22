import './CartItem.scss';
import { RoundButton } from '../../../../components/RoundButton';
import { Product } from '../../../../types/Product';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  removeFromCart,
  decreaseQuantity,
  increaseQuantity,
} from '../../../../features/cartSlice';

interface CartItemProps {
  cartItem: Product;
}

export const CartItem: React.FC<CartItemProps> = ({ cartItem }) => {
  const { name, image, price, itemId } = cartItem;
  const dispatch = useAppDispatch();
  const quantity = useAppSelector(state => state.cart.quantities[itemId]);

  return (
    <div className="cart-item">
      <div className="cart-item__content">
        <button
          className="cart-item__delete-btn"
          onClick={() => dispatch(removeFromCart(itemId))}
        ></button>
        <div className="cart-item__img">
          <img src={image} alt="Product Image" />
        </div>
        <div className="cart-item__name">{name}</div>
      </div>
      <div className="cart-item__actions">
        <div className="cart-item__quantity">
          <RoundButton
            buttonType="minus"
            onClick={() => dispatch(decreaseQuantity(itemId))}
          />
          {quantity}
          <RoundButton
            buttonType="plus"
            onClick={() => dispatch(increaseQuantity(itemId))}
          />
        </div>
        <div className="cart-item__total-price">${price}</div>
      </div>
    </div>
  );
};
