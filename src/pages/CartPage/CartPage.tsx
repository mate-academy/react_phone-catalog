import { useState } from 'react';
import CartItem from '../../components/CartItem/CartItem';
import BackButton from '../../components/BackButton/BackButton';
import './CartPage.scss';
import { useAppSelector } from '../../features/hooks';

const CartPage = () => {
  const items = useAppSelector(state => state.cart.items);
  const totalPrice = useAppSelector(state => state.cart.totalPrice);
  const totalCount = items.reduce((sum, item) => item.count + sum, 0);
  const [isActive, setIsActive] = useState(false);

  const onClickCheckout = () => {
    setIsActive(true);

    setTimeout(() => {
      setIsActive(false);
    }, 3000);
  };

  return (
    <section className="cart main__section">
      <BackButton />
      <h1 className="cart__title">Cart</h1>
      <div className="cart__container">
        <div className="cart__list">
          {items.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {(items.length > 0)
          && (
            <div className="cart__checkout">
              <div className="cart__total-price">{`$${totalPrice}`}</div>
              <div className="cart__total-price__quantity">
                {`Total for 
                ${totalCount} items`}
              </div>
              <button
                type="button"
                className="cart__button-checkout"
                onClick={onClickCheckout}
              >
                Checkout
              </button>
            </div>
          )}

        {(items.length <= 0 && (
          <div className="cart__empty">
            <p className="cart__empty-name">YOU CART IS EMPTY!!!</p>
          </div>
        ))}

        {isActive && (
          <div className="cart__checkout__overlay">
            <div className="cart__checkout__message">
              We are sorry, but this feature is not implemented yet
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartPage;
