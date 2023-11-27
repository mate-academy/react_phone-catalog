import {
  useMemo, useContext, useState, useEffect,
} from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Cart } from '../../utils/types/Cart';
import { Context } from '../../utils/Context';
import { BlockTitle } from '../BlockTitle';

export const CartPage: React.FC = () => {
  const { cartList, editCartItem } = useContext(Context);
  const [shift, setShift] = useState(-700);

  const handleRemoveItem = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    item: Cart,
  ) => {
    e.preventDefault();
    editCartItem(item, null);
  };

  const totalAmount = useMemo(() => {
    return cartList
      .reduce((acum, item) => acum + item.price * item.quantity, 0);
  }, [cartList]);

  useEffect(() => {
    const timerId = setTimeout(() => setShift(-700), 5000);

    return () => clearTimeout(timerId);
  }, [shift]);

  return (
    <main className="cart">
      <BlockTitle title="Cart" subtitle={cartList.length} />
      <div className="cart__total">
        <div className="cart__total--amount">
          <h1>{`$${totalAmount}`}</h1>
          <p>{`Total for ${cartList.reduce((acum, { quantity }) => acum + quantity, 0)} items`}</p>
        </div>
        {cartList.length > 0 && (
          <button
            type="button"
            onClick={() => setShift(18)}
          >
            Checkout
          </button>
        )}
      </div>
      <div className="cart__total--message" style={{ right: shift }}>
        <span>The option will be available soon</span>
      </div>
      <ul className="cart__list">
        <TransitionGroup className="cart__list">
          {cartList.map(item => (
            <CSSTransition
              key={item.name}
              timeout={500}
              classNames="cart__item"
            >
              <li className="cart__item" key={item.id}>
                <button
                  type="button"
                  onClick={(e) => handleRemoveItem(e, item)}
                  className="cart__item--remove"
                >
                  <img
                    src="assests/images/Close.svg"
                    alt="icon close"
                  />
                </button>
                <img src={`${item.image}`} alt="" className="cart__item--img" />
                <span className="cart__item--name">{item.name}</span>
                <div className="cart__item--panel">
                  <button
                    disabled={item.quantity === 1}
                    onClick={() => editCartItem(item, -1)}
                    className="cart__item--action"
                    type="submit"
                    style={{
                      pointerEvents: item.quantity === 1
                        ? 'none'
                        : 'all',
                    }}
                  >
                    <img src={`assests/images/${item.quantity === 1 ? 'Minus-disabled' : 'Minus'}.svg`} alt="icon minus" />
                  </button>
                  <span className="cart__item--quantity">{item.quantity}</span>
                  <button
                    onClick={() => editCartItem(item, 1)}
                    className="cart__item--action"
                    type="submit"
                  >
                    <img src="assests/images/Plus.svg" alt="icon plus" />
                  </button>
                </div>

                <span className="cart__item--price">{`$${item.price}`}</span>
              </li>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ul>
    </main>
  );
};
