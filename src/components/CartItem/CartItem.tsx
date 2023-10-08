import { Link } from 'react-router-dom';
import { useContext } from 'react';
import classNames from 'classnames';
import { CartsItem } from '../../types/CartsItem';
import { CartContext, Action } from '../contexts/CartContextProvider';
import closebutton from '../../Images/Icons/Close.svg';

type Props = {
  phoneId: string,
  image: string,
  price: number,
  name: string,
  category: string,
  cartItem: CartsItem,
};

export const CartItem: React.FC<Props> = ({
  phoneId,
  image,
  price,
  name,
  category,
  cartItem,
}) => {
  const { removeFromCart, changeQuantity } = useContext(CartContext);

  const handleItemRemove = (productId: string) => {
    removeFromCart(productId);
  };

  const handleItemChangeMore = (productId: string) => {
    changeQuantity(productId, Action.Increase);
  };

  const handleItemChangeLess = (productId: string) => {
    changeQuantity(productId, Action.Decrease);
  };

  return (
    <li className="cart-item">
      <button
        data-cy="deleteCardButton"
        className="cart__button cart-item__button-delete"
        type="button"
        onClick={() => handleItemRemove(cartItem.id)}
      >
        <img
          src={closebutton}
          alt={closebutton}
          className="cart__button-img cart-item__button-img"
        />
      </button>
      <Link
        className="cart__link cart-item__link"
        to={`/${category}/${phoneId}`}
      >
        <div className="cart__img-box cart-item__img-box">
          <img
            src={`/new/${image}`}
            alt={image}
            className="cart__img cart-item__img"
          />
        </div>
        <div className="cart-item__name">
          {name}
        </div>
      </Link>
      <div className="cart-item__amount">
        <div className="cart__quantity-box cart-item__quantity-box">
          <button
            type="button"
            className={classNames(
              'cart-item__button',
              'cart-item__button-decrease',
              {
                'cart-item__button-decrease--disabled': cartItem.quantity === 1,
              },
            )}
            disabled={cartItem.quantity === 1}
            onClick={() => handleItemChangeLess(cartItem.id)}
          >
            -
          </button>
          <div className="cart__quantity cart-item__quantity">
            {cartItem.quantity}
          </div>
          <button
            type="button"
            className={classNames(
              'cart-item__button',
              'cart-item__button-increase',
            )}
            onClick={() => handleItemChangeMore(cartItem.id)}
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
