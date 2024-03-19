/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import './CartItem.scss';

// @ts-ignore
import closeIcon from '../../images/icons/close.svg';
// @ts-ignore
import minus from '../../images/icons/minus.svg';
// @ts-ignore
import plus from '../../images/icons/plus.svg';

type Props = {
  cartProduct: Product,
};

export const CartItem: React.FC<Props> = ({ cartProduct }) => {
  const [quantity, setQuantity] = useState<number>(cartProduct.quantity || 1);

  const handleIncreaseCount = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrementCount = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const handleDeleteFromCart = () => {
    const localCart: Product[] = JSON
      .parse(localStorage.getItem('CartItems') || '[]');

    const index = localCart
      .findIndex(item => item.id === cartProduct.id);

    if (index !== -1) {
      localCart.splice(index, 1);
      localStorage.setItem('CartItems', JSON.stringify(localCart));
    }
  };

  useEffect(() => {
    const localCart: Product[] = JSON
      .parse(localStorage.getItem('CartItems') || '[]');
    const index = localCart.findIndex(item => item.id === cartProduct.id);

    if (index !== -1) {
      localCart[index].quantity = quantity;
      localStorage.setItem('CartItems', JSON.stringify(localCart));
    }
  }, [quantity, cartProduct.id]);

  return (
    <div className="cartItem">
      <img
        className="cartItem__closeIcon"
        src={closeIcon}
        alt={closeIcon}
        onClick={handleDeleteFromCart}
      />

      <Link to={`/phones/${cartProduct.phoneId}`}>
        <img
          className="cartItem__phoneImage"
          src={`_new/${cartProduct.image}`}
          alt={cartProduct.image}
        />
      </Link>

      <p className="cartItem__name">{cartProduct.name}</p>

      <div className="cartItem__buttons">
        <button
          className={cn('cartItem__button', {
            'cartItem__button-active': quantity !== 1,
          })}
          type="button"
          onClick={handleDecrementCount}
          disabled={quantity === 1}
        >
          <img
            src={minus}
            alt="minus"
            className={quantity !== 1 ? 'cartItem__blackImage' : ''}
          />
        </button>
        <p className="cartItem__countOfItem">{quantity}</p>
        <button
          className="cartItem__button-active"
          type="button"
          onClick={handleIncreaseCount}
        >
          <img src={plus} alt={plus} />
        </button>
      </div>

      <h2 className="cartItem__price">{`$${cartProduct.price}`}</h2>
    </div>
  );
};
