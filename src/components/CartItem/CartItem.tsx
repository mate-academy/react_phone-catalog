import { useContext } from 'react';
import { CartItem as CartItemType } from '../../types/CartItem';
import './CartItem.scss';
import { ThemeContext } from '../../context/ThemeContext';

type Props = {
  item: CartItemType;
  onRemove: (productId: number) => void;
  onIncrease: (productId: number) => void;
  onDecrease: (productId: number) => void;
};

export const CartItem = ({ item, onRemove, onIncrease, onDecrease }: Props) => {
  const { product, quantity } = item;
  const { theme } = useContext(ThemeContext);

  return (
    <article className="cart-item">
      <button
        type="button"
        className="cart-item__remove"
        onClick={() => onRemove(product.id)}
      >
        <img
          src={
            theme === 'dark'
              ? '/img/icons/close.svg'
              : '/img/icons-light/close-light.svg'
          }
          alt="Cross icon"
        />
      </button>

      <img
        src={`/${product.image}`}
        alt={product.name}
        className="cart-item__image"
      />

      <h3 className="cart-item__title">{product.name}</h3>

      <div className="cart-item__quantity">
        <button
          type="button"
          className="cart-item__quantity-button"
          disabled={quantity === 1}
          onClick={() => onDecrease(product.id)}
        >
          -
        </button>

        <span>{quantity}</span>

        <button
          type="button"
          className="cart-item__quantity-button"
          onClick={() => onIncrease(product.id)}
        >
          +
        </button>
      </div>

      <p className="cart-item__price">${product.price}</p>
    </article>
  );
};
