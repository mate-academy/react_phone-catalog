import './CartItem.scss';
import React, { useCallback, useContext, useMemo } from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '../Icon';
import { IconType } from '../../types/IconTypes';
import { CartItemType } from '../../types/CartItemType';
import { BASE_URL } from '../../helpers/constants';
import { Colors } from '../../types/Colors';
import { CartContext } from '../CartContextProvider';

interface Props {
  cartItem: CartItemType;
}

export const CartItem: React.FC<Props> = ({ cartItem: { item, quantity } }) => {
  const isRemoveOneDisabled = useMemo(() => quantity === 1, [quantity]);
  const { cart, setCart } = useContext(CartContext);
  const { pathname } = useLocation();

  const removeItem = useCallback(() => {
    setCart(cart.filter(({ id }) => id !== item.id));
  }, [cart, setCart, item]);

  const addOne = useCallback(() => {
    setCart(
      cart.map(({ id, quantity: amout, item: product }) => {
        if (id === item.id) {
          return {
            id,
            quantity: amout + 1,
            item: product,
          };
        }

        return {
          id,
          quantity: amout,
          item: product,
        };
      }),
    );
  }, [cart, setCart, item]);

  const removeOne = useCallback(() => {
    setCart(
      cart.map(({ id, quantity: amount, item: product }) => {
        if (id === item.id && amount > 1) {
          return {
            id,
            quantity: amount - 1,
            item: product,
          };
        }

        return {
          id,
          quantity: amount,
          item: product,
        };
      }),
    );
  }, [cart, setCart, item]);

  return (
    <li className="cart-item">
      <div className="cart-item__top">
        <button
          type="button"
          data-cy="cartDeleteButton"
          aria-label="remove item from cart"
          className="cart-item__remove-button"
          onClick={removeItem}
        >
          <Icon iconType={IconType.close} color={Colors.disabled} />
        </button>

        <Link
          to={`../${item.category}/${item.itemId}`}
          state={pathname}
          className="cart-item__link"
        >
          <img
            src={`${BASE_URL}/${item.image}`}
            alt="product"
            className="cart-item__img"
          />

          <p className="cart-item__name">
            {item.name}
          </p>
        </Link>

      </div>

      <div className="cart-item__bottom">
        <div className="cart-item__params">
          <button
            type="button"
            aria-label="remove one"
            className={classNames('cart-item__button', {
              'cart-item__button--disabled': isRemoveOneDisabled,
            })}
            disabled={isRemoveOneDisabled}
            onClick={removeOne}
          >
            <Icon
              iconType={IconType.minus}
              color={isRemoveOneDisabled ? Colors.disabled : Colors.primary}
            />
          </button>

          <span className="cart-item__quantity">
            {quantity}
          </span>

          <button
            type="button"
            aria-label="add one"
            className="cart-item__button"
            onClick={addOne}
          >
            <Icon iconType={IconType.plus} />
          </button>
        </div>

        <p className="cart-item__price">
          {`$${item.price}`}
        </p>
      </div>
    </li>
  );
};
