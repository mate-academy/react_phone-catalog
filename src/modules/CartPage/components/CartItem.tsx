import React, { useContext } from 'react';
import { UpdatedProduct } from '../../shared/Types/types';
import classNames from 'classnames';
import { CartStoreContext } from '../../../Store/CartStore';
// eslint-disable-next-line max-len
import { newListOfSavedItems } from '../../shared/Shared_Components/ActionButtons/utils/utilsFunctions';
import { Link } from 'react-router-dom';

interface Props {
  cartItem: UpdatedProduct;
  isCheckout?: boolean;
}

export const CartItem: React.FC<Props> = ({ cartItem, isCheckout }) => {
  const itemPrice = cartItem.discount ? cartItem.price : cartItem.fullPrice;

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
      })}
    >
      <div className="cart__item-head">
        <button
          className="cart__remove-button"
          onClick={() => setCartList(newListOfSavedItems(cartItem, cartList))}
        />

        <img className="cart__item-image" src={cartItem.image} alt="" />

        <Link
          to={`/${cartItem.category}/${cartItem.itemId}`}
          className="cart__text cart__text--name"
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
          <button
            onClick={() => setCartList(changeQuantity('decrease'))}
            className={classNames('carousel__button carousel__button--left', {
              'carousel__button--active-left': cartItem.quantity > 1,
            })}
            disabled={cartItem.quantity === 1}
          />

          <p className="cart__text">{cartItem.quantity}</p>

          <button
            onClick={() => setCartList(changeQuantity('increase'))}
            className={classNames('carousel__button carousel__button--right', {
              'carousel__button--active-right': cartItem.quantity < 10,
            })}
            disabled={cartItem.quantity >= 10}
          />
        </div>

        <h2 className="title title--h2">{`$${itemPrice * cartItem.quantity}`}</h2>
      </div>
    </div>
  );
};
