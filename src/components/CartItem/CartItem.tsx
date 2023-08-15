import './CartItem.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useContext } from 'react';
import closeButton from '../../images/Icons/Close_white.svg';
import { CartsItem } from '../../types/CartsItem';
import { Action, CartContext } from '../contexts/CartContextProvider';

type Props = {
  phoneId: string,
  category: string,
  image: string,
  name: string,
  price: number,
  cartItem: CartsItem,
};

export const CartItem: React.FC<Props> = ({
  phoneId,
  category,
  image,
  name,
  price,
  cartItem,
}) => {
  const { removeFromCart, changeQuantity } = useContext(CartContext);

  const handlerRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  const handleQuantityPlus = (productId: string) => {
    changeQuantity(productId, Action.Increase);
  };

  const handleQuantityMinus = (productId: string) => {
    changeQuantity(productId, Action.Decrease);
  };

  return (
    <li
      className="cart-item"
    >
      <button
        data-cy="cartDeleteButton"
        className="cart__button cart-item__button-delete"
        type="button"
        onClick={() => handlerRemoveItem(cartItem.id)}
      >
        <img
          className="cart__button-img cart-item__button-img"
          src={closeButton}
          alt={closeButton}
        />
      </button>

      <Link
        className="cart__link cart-item__link"
        to={`/${category}/${phoneId}`}
      >
        <div className="cart__img-box cart-item__img-box">
          <img className="cart__img cart-item__img" src={`newImg/${image}`} alt={image} />
        </div>

        <div className="cart-item__name">
          {name}
        </div>

      </Link>

      <div className="cart-item__amount">
        <div className="cart__quantity-box cart-item__quantity-box">
          <button
            type="button"
            disabled={cartItem.quantity === 1}
            className={classNames(
              'cart-item__button',
              'cart-item__button-decrease',
              {
                'cart-item__button-decrease--disabled': cartItem.quantity === 1,
              },
            )}
            onClick={() => handleQuantityMinus(cartItem.id)}
          >
            -
          </button>
          <div className="cart__quantity cart-item__quantity">
            {cartItem.quantity}
          </div>
          <button
            type="button"
            className="
           cart-item__button
           cart-item__button-increase
           "
            onClick={() => handleQuantityPlus(cartItem.id)}
          >
            +
          </button>
        </div>

        <div className="cart__price cart-item__price">
          {`$${price * cartItem.quantity}`}
        </div>
      </div>

    </li>
  );
};
