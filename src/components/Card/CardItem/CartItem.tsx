import { Link } from 'react-router-dom';
import { useCart, CartItemType } from '../../../context/CartContext';
import './CartItem.scss';

export const CartItem: React.FC<CartItemType> = ({ product, quantity }) => {
  const { decreaseQuantity, increaseQuantity, removeFromCart } = useCart();

  return (
    <div className="cartItem">
      <div className="cartItem__info">
        <button
          className="cartItem__info-btn"
          onClick={() => removeFromCart(product.itemId)}
        >
          <img src={`img/Icons/closing-icon.svg`} alt="x" />
        </button>
        <Link
          className="cartItem__info-link"
          to={`/product/${product.category}/${product.itemId}`}
        >
          <img className="cartItem__info-img" src={product.image} />

          <p className="cartItem__info-title">{product.name}</p>
        </Link>
      </div>
      <div className="cartItem__actions">
        <div className="cartItem__quantity">
          <button
            className="cartItem__quantity-btn"
            onClick={() => decreaseQuantity(product.itemId)}
          >
            -
          </button>
          <p className="cartItem__quantity-value">{quantity}</p>

          <button
            className="cartItem__quantity-btn"
            onClick={() => increaseQuantity(product.itemId)}
          >
            +
          </button>
        </div>
        <p className="cartItem__price">${product.price}</p>
      </div>
    </div>
  );
};
