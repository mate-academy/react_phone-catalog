import React, { useCallback, useContext } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import './CartCard.scss';
import { ReactComponent as CloseIcon } from '../../assets/icons/Close.svg';
import { ReactComponent as PlusIcon } from '../../assets/icons/Plus.svg';
import { ReactComponent as MinusIcon } from '../../assets/icons/Minus.svg';
import { CartType } from '../../types/CartType';
import { FavAndCartContext } from '../context/FavAndCartContext';

type Props = {
  product: CartType,
};

export const CartCard: React.FC<Props> = ({ product }) => {
  const { cart, setCart } = useContext(FavAndCartContext);

  const handleRemoveClick = useCallback((phoneId: string) => {
    setCart(cart.filter(item => item.phoneId !== phoneId));
  }, [cart]);

  const handleActionClick = useCallback((
    phoneId: string,
    action: 'plus' | 'minus',
  ) => {
    const updateCart = cart.map(item => {
      if (phoneId === item.phoneId) {
        return action === 'plus'
          ? { ...item, quantity: item.quantity + 1 }
          : { ...item, quantity: item.quantity - 1 };
      }

      return item;
    });

    setCart(updateCart);
  }, [cart]);

  return (
    <div className="cart-card" key={product.phoneId}>
      <button
        type="button"
        className="cart-card__remove"
        onClick={() => handleRemoveClick(product.phoneId)}
        data-cy="cartDeleteButton"
      >
        <CloseIcon />
      </button>

      <div className="cart-card__links-wrap">
        <Link
          to={`/phones/${product.phoneId}`}
          className="cart-card__link-img"
        >
          <img
            src={`new/${product.image}`}
            className="cart-card__img"
            alt="Phone preview"
          />
        </Link>

        <Link
          to={`/phones/${product.phoneId}`}
          className="cart-card__link-title"
        >
          <h2 className="cart-card__name">{product.name}</h2>
        </Link>
      </div>

      <div className="cart-card__quantity" data-cy="productQauntity">
        <div className="cart-card__actions">
          <button
            type="button"
            name="minus"
            className={classNames('cart-card__action', {
              'cart-card__action--disabled': product.quantity === 1,
            })}
            onClick={() => (
              handleActionClick(product.phoneId, 'minus')
            )}
          >
            <MinusIcon />
          </button>

          <span className="cart-card__number">
            {product.quantity}
          </span>

          <button
            type="button"
            name="plus"
            className="cart-card__action"
            onClick={() => handleActionClick(product.phoneId, 'plus')}
          >
            <PlusIcon />
          </button>
        </div>

        <span className="cart-card__price">
          {`$${product.price * product.quantity}`}
        </span>
      </div>
    </div>
  );
};
