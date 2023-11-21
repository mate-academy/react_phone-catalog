import { useMemo } from 'react';
import classNames from 'classnames';
import { Carts } from '../../type/Carts';

import './Cart.scss';

type Props = {
  cart: Carts,
  handleCartAction: (
    id: string, action: 'add' | 'delete' | 'deleteAll') => void,
};

export const Cart: React.FC<Props> = ({
  cart,
  handleCartAction,
}) => {
  const {
    id,
    name,
    price,
    discount,
    count,
  } = cart;

  const productPrice = useMemo(
    () => price - (price * discount) / 100, [price, discount],
  );

  const totalPrice = productPrice * count;

  return (
    <section className="cart" key={id}>
      <div className="cart__cross-container">
        <button
          type="button"
          title="delite item"
          className="cart__button cart__button--cross"
          data-cy="cartDeleteButton"
          onClick={() => handleCartAction(id, 'deleteAll')}
        >
          <span className="icon icon--cross" />
        </button>
      </div>
      <div className="cart__img-container">
        <img
          src={`img/products/${id}.0.jpg`}
          alt="product"
          className="cart__img"
        />
      </div>
      <div className="cart__name-container">
        <p className="text">{name}</p>
      </div>
      <div className="cart__button-container">
        <button
          type="button"
          title="minus"
          className={classNames(
            'cart__button',
            { 'cart__button--minus': count === 1 },
          )}
          onClick={() => handleCartAction(id, 'delete')}
        >
          <span className={classNames(
            'icon',
            { 'icon--minus': count > 1 },
            { 'icon--minus-gray': count === 1 },
          )}
          />
        </button>
        <div className="cart__count">
          <p className="text">{count}</p>
        </div>
        <button
          type="button"
          title="plus"
          className="cart__button cart__button--plus"
          onClick={() => handleCartAction(id, 'add')}
        >
          <span className="icon icon--plus" />
        </button>
      </div>
      <p className="text text--h2 cart__price">{`$${totalPrice}`}</p>
    </section>
  );
};
