import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { CartItem } from '../../types/CartItem';
import { applyDiscount } from '../../helpers/applyDiscount';
import { Action } from '../../types/Action';
import { CartContext } from '../../context/CartContext';
import { getProductPath } from '../../helpers/getProductPath';
import './CartCard.scss';

type Props = {
  cartItem: CartItem;
};

export const CartCard: FC<Props> = ({ cartItem }) => {
  const {
    id,
    product,
    quantity,
  } = cartItem;

  const { removeFromCart, changeQuantity } = useContext(CartContext);

  const handleRemoveFromCart = (productId: string) => {
    removeFromCart(productId);
  };

  const handleReduceQty = (productId: string) => {
    changeQuantity(productId, Action.Remove);
  };

  const handleIncreaseQty = (productId: string) => {
    changeQuantity(productId, Action.Add);
  };

  return (
    <div className="cart-card__item">
      <div className="cart-card__box">
        <button
          type="button"
          className="cart-card__delete-button"
          onClick={() => handleRemoveFromCart(id)}
        >
          <img
            className="cart-card__cross-image"
            src="icons/cross.svg"
            alt="remove"
          />
        </button>
        <Link to={`/${getProductPath(product)}`} className="cart-card__link">
          <img
            className="cart-card__image"
            src={product.imageUrl}
            alt="product"
          />
          <div className="cart-card__name">{product.name}</div>
        </Link>
      </div>
      <div className="cart-card__quantity-container">
        <button
          type="button"
          className={classNames('cart-card__button square-button', {
            'square-button--disabled': quantity < 2,
          })}
          onClick={() => handleReduceQty(id)}
        >
          <img src="icons/minus.svg" alt="reduce quantity" />
        </button>
        <div className="cart-card__quantity">{quantity}</div>
        <button
          type="button"
          className="cart-card__button square-button"
          onClick={() => handleIncreaseQty(id)}
        >
          <img src="icons/plus.svg" alt="increase quantity" />
        </button>
      </div>
      {product.discount ? (
        <div className="cart-card__price">{`$${applyDiscount(product)}`}</div>
      ) : (
        <div className="cart-card__price">{`$${product.price}`}</div>
      )}
    </div>
  );
};
