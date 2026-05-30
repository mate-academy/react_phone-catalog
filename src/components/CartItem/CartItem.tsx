import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { CartContext } from '../../contexts/cartContext';
import { CartItemType } from '../../types/сartItemType';

import Minus from '../../Images/Icons/Minus.svg';
import Plus from '../../Images/Icons/Plus.svg';
import Close from '../../Images/Icons/Close.svg';

import './cartItem.scss';

type Props = {
  item: CartItemType;
};

export const CartItem: React.FC<Props> = ({ item }) => {
  const { setCart } = useContext(CartContext);
  const newPath = './new/';

  const isMinusDisabled = item.quantity === 1;
  const isPlusDisabled = item.quantity === 10;

  const handleDelete = () => {
    setCart(prev => prev.filter(cartItem => cartItem.id !== item.id));
  };

  const handlePlusQuantity = () => {
    setCart(prev =>
      prev.map(cartItem => {
        return cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem;
      }),
    );
  };

  const handleMinusQuantity = () => {
    setCart(prev =>
      prev.map(cartItem => {
        return cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem;
      }),
    );
  };

  return (
    <div className="cart-item">
      <div
        className="cart-item__close"
        onClick={handleDelete}
        data-cy="cartDeleteButton"
        aria-hidden
      >
        <img src={Close} alt="Close" />
      </div>

      <Link
        to={`/${item.product.category}/${item.product.itemId}`}
        style={{ display: 'block' }}
      >
        <div className="cart-item__preview">
          <img
            src={newPath + item.product.image}
            alt={item.product.name}
            className="cart-item__preview-img"
          />
        </div>
      </Link>

      <Link
        to={`/${item.product.category}/${item.product.itemId}`}
        style={{ display: 'block', flexGrow: 1 }}
      >
        <p className="cart-item__title">{item.product.name}</p>
      </Link>

      <div className="cart-item__quantity-box">
        <button
          type="button"
          className="cart-item__quantity-button"
          onClick={handleMinusQuantity}
          disabled={isMinusDisabled}
        >
          <img src={Minus} alt="Minus" />
        </button>

        <span className="cart-item__quantity">{item.quantity}</span>

        <button
          type="button"
          className="cart-item__quantity-button"
          onClick={handlePlusQuantity}
          disabled={isPlusDisabled}
        >
          <img src={Plus} alt="Plus" />
        </button>
      </div>

      <span className="cart-item__price">{`$${item.product.price}`}</span>
    </div>
  );
};
