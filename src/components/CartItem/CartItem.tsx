/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import React, { useContext } from 'react';
import classNames from 'classnames';
import { CartItemType } from '../../types/CartItemType';
import './CartItem.scss';
import { GeneralContext } from '../../helpers/GeneralContext';

type Props = {
  product: CartItemType;
};

export const CartItem: React.FC<Props> = ({ product }) => {
  const { cartList, setCartList } = useContext(GeneralContext);

  const deleteItemFromCart = () => {
    const newCartList = cartList.filter(item => {
      return item.id !== product.id;
    });

    setCartList(newCartList);
  };

  const changeNumber = (change: number) => {
    const changedProduct = product;
    const index = cartList.findIndex(item => item.id === product.id);

    changedProduct.quantity += change;

    const newCart = [...cartList];

    newCart.splice(index, 1, changedProduct);

    setCartList(newCart);
  };

  const increaseNumber = () => changeNumber(1);
  const decreaseNumber = () => changeNumber(-1);

  return (
    <div className="cartItem">
      <div>
        <button
          type="button"
          className="cartItem__delete-btn"
          data-cy="cartDeleteButton"
          onClick={deleteItemFromCart}
        >
          <img
            src={require('../../images/icons/delete-from-cart.svg').default}
            alt="Delete"
          />
        </button>

        <img
          src={`${process.env.PUBLIC_URL}/_new/${product.product.image}`}
          alt="Phone"
          className="cartItem__img"
        />

        <span className="cartItem__title">
          {product.product.name}
        </span>
      </div>

      <div className="cartItem__calculation">
        <div className="cartItem__quantity">
          <button
            type="button"
            className={classNames('cartItem__btn', {
              'cartItem__btn--disabled': product.quantity === 1,
            })}
            onClick={decreaseNumber}
            disabled={product.quantity === 1}
          >
            -
          </button>

          <span className="cartItem__number">
            {product.quantity}
          </span>

          <button
            type="button"
            className="cartItem__btn"
            onClick={increaseNumber}
          >
            +
          </button>
        </div>

        <div className="cartItem__totalPrice">
          {`$${product.quantity * product.product.price}`}
        </div>
      </div>
    </div>
  );
};
