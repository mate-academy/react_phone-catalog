/* eslint-disable max-len */
import React, { useContext } from 'react';
import { UpdatedProduct } from '../../shared/Types/types';
import classNames from 'classnames';
import { CartStoreContext } from '../../../Store/CartStore';
import { newListOfSavedItems } from '../../shared/Shared_Components/ActionButtons/utils/utilsFunctions';
import { Link } from 'react-router-dom';
import { SecondaryButton } from '../../shared/Shared_Components/ActionButtons/SecondaryButton/SecondaryButton';
import { DarkModeContext } from '../../../Store/StoreThemeMode';

interface Props {
  cartItem: UpdatedProduct;
  isCheckout?: boolean;
}

export const CartItem: React.FC<Props> = ({ cartItem, isCheckout }) => {
  const itemPrice = cartItem.discount ? cartItem.price : cartItem.fullPrice;

  const { isDark } = useContext(DarkModeContext);
  const { cartList, setCartList } = useContext(CartStoreContext);

  const changeQuantity = (action: 'increase' | 'decrease') => {
    return cartList.map((item: UpdatedProduct) => {
      if (item.itemId === cartItem.itemId) {
        return {
          ...item,
          quantity:
            action === 'increase' ? item.quantity + 1 : item.quantity - 1,
        };
      }

      return item;
    });
  };

  return (
    <div
      className={classNames('cart__item', {
        'cart__item--is-in-checkout': isCheckout,
        'cart__item--dark': isDark,
      })}
    >
      <div className="cart__item-head">
        <SecondaryButton
          isClose
          isDark={isDark}
          onClickHandler={() =>
            setCartList(newListOfSavedItems(cartItem, cartList))
          }
        />

        <img className="cart__item-image" src={cartItem.image} alt="" />

        <Link
          to={`/${cartItem.category}/${cartItem.itemId}`}
          className={classNames('cart__text cart__text--name', {
            'cart__text--dark': isDark,
          })}
        >
          {cartItem.name}
        </Link>
      </div>

      <div
        className={classNames('cart__item-bottom', {
          'cart__item-bottom--is-in-checkout': isCheckout,
        })}
      >
        <div className="cart__quantity-buttons">
          <SecondaryButton
            onClickHandler={() => setCartList(changeQuantity('decrease'))}
            isDark={isDark}
            isDisabled={cartItem.quantity === 1}
          />

          <p
            className={classNames('cart__text', {
              'cart__text--dark': isDark,
            })}
          >
            {cartItem.quantity}
          </p>

          <SecondaryButton
            onClickHandler={() => setCartList(changeQuantity('increase'))}
            isRight
            isDark={isDark}
            isDisabled={cartItem.quantity >= 10}
          />
        </div>

        <h2
          className={classNames('title title--h2', {
            'title--is-Dark': isDark,
          })}
        >{`$${itemPrice * cartItem.quantity}`}</h2>
      </div>
    </div>
  );
};
