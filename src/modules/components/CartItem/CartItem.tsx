import { assetUrl } from '../../../utils/url';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../store';
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from '../../../store/cartSlice';
import type { CartItem as CartItemType } from '../../../types';
import './CartItem.scss';

interface Props {
  item: CartItemType;
}

export function CartItem({ item }: Props) {
  const dispatch = useAppDispatch();
  const { product, quantity } = item;

  return (
    <div className="cart-item">
      <button
        className="cart-item__remove"
        onClick={() => dispatch(removeFromCart(product.itemId))}
        aria-label="Remove from cart"
      >
        <img src={assetUrl('/icons/icon--close.svg')} alt="" />
      </button>

      <img
        className="cart-item__image"
        src={product.image}
        alt={product.name}
      />

      <Link
        className="cart-item__name"
        to={`/${product.category}/${product.itemId}`}
      >
        {product.name}
      </Link>

      <div className="cart-item__stepper">
        <button
          className="cart-item__stepper-btn"
          onClick={() => dispatch(decreaseQuantity(product.itemId))}
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
        >
          –
        </button>
        <span className="cart-item__quantity">{quantity}</span>
        <button
          className="cart-item__stepper-btn"
          onClick={() => dispatch(increaseQuantity(product.itemId))}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <p className="cart-item__price">${product.price * quantity}</p>
    </div>
  );
}
