import { useOutletContext } from 'react-router-dom';
import { FavoritesContextType } from '../../types/FavoritesContextType';
import { Product } from '../../types/Product';
import './CartItem.scss';

type Props = {
  product: Product;
};

export const CartItem: React.FC<Props> = ({ product }) => {
  const {
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
  }
    = useOutletContext<FavoritesContextType>();

  return (
    <div className="cartItem">
      <button
        data-cy="cartDeleteButton"
        type="button"
        className="cartItem__delete-button"
        onClick={() => product && removeFromCart(product.id)}
      >
        <img
          src="_new/img/icons/close.svg"
          alt="delete-button"
        />
      </button>

      <img
        src={`/_new/${product.image}`}
        alt={product.name}
        className="cartItem__img"
      />

      <p className="cartItem__name">{product.name}</p>

      <div className="cartItem__counter">
        <button
          type="button"
          className="counter-button"
          disabled={product.quantity === 1 || !product.quantity}
          onClick={() => product && decrementQuantity(product.id)}
        >
          <img
            src={product.quantity === 1 || !product.quantity
              ? '/_new/img/icons/Minus.svg' : '/_new/img/icons/MinusDark.svg'}
            alt="counter-button"
          />
        </button>
        <span
          data-cy="productQuantity"
          className="counter-quantity"
        >
          {product.quantity || 1}
        </span>
        <button
          type="button"
          className="counter-button"
          onClick={() => incrementQuantity(product.id)}
        >
          <img
            src="/_new/img/icons/Plus.svg"
            alt="counter-button"
          />
        </button>
      </div>

      <h2 className="price">
        $
        {product.price * (product.quantity || 1)}
      </h2>
    </div>
  );
};
