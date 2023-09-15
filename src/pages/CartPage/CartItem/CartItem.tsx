import { Link } from 'react-router-dom';

import classNames from 'classnames';
import './CartItem.scss';

import { useContext } from 'react';
import { CartItem as CartItemType } from '../../../types/CartItem';
import { Action, CartContext } from '../../../contexts/CartContextProvider';
import { IMAGE_URL } from '../../../helpers/IMAGE_URL';

type Props = {
  name: string,
  image: string,
  price: number,
  category: string,
  phoneId: string,
  cartItem: CartItemType,
};

export const CartItem: React.FC<Props> = ({
  name,
  price,
  image,
  phoneId,
  cartItem,
  category,
}) => {
  const {
    removeFromCart,
    cartAmount,
  } = useContext(CartContext);

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  const handleQuantityPlus = (productId: string) => {
    cartAmount(productId, Action.Increase);
  };

  const handleQuantityMinus = (productId: string) => {
    cartAmount(productId, Action.Decrease);
  };

  return (
    <li className="cart-item">
      <button
        type="button"
        onClick={() => handleRemoveItem(cartItem.id)}
        className="cart-item--button-delete"
      >
        <div className="cart-item--button-delete-image" />
      </button>

      <Link
        to={`/${category}/${phoneId}`}
        className="cart-item__link"
      >
        <div className="cart-item__link--item">
          <img
            src={`${IMAGE_URL}${image}`}
            alt={image}
            className="cart-item__link--image"
          />
        </div>

        <div className="cart-item__link--name">
          {name}
        </div>
      </Link>

      <div className="cart-item__amount">
        <div className="cart-item__quantity-container">
          <button
            type="button"
            disabled={cartItem.quantity === 1}
            onClick={() => handleQuantityMinus(cartItem.id)}
            className={classNames(
              'cart-item__amount--button',
              'cart-item__amount--button-decrease',
              {
                'cart-item__amount--button-decrease-disabled':
                cartItem.quantity === 1,
              },
            )}
          >
            <div className={classNames(
              'cart-item__amount--button-image',
              'cart-item__amount--button-image-minus',
              {
                'cart-item__amount--button-image-minus-disabled':
                cartItem.quantity === 1,
              },
            )}
            />
          </button>

          <div className="cart-item--quantity">
            {cartItem.quantity}
          </div>

          <button
            type="button"
            className="
              cart-item__amount--button
              cart-item__amount--button-increase"
            onClick={() => handleQuantityPlus(cartItem.id)}
          >
            <div className="
              cart-item__amount--button-image
              cart-item__amount--button-image-plus"
            />
          </button>
        </div>

        <h2 className="cart-item--price">
          {`$${price * cartItem.quantity}`}
        </h2>
      </div>

    </li>
  );
};
