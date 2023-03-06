import { FC, useContext, useState } from 'react';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { CartProduct } from '../types/CartProduct';
import { BackButton } from './BackButton';
import { Footer } from './Footer';
import { Header } from './Header';
import '../styles/cartPage.scss';
import { CartItem } from './CartItem';
import { Context } from '../contexts/Context';

export const CartPage: FC = () => {
  const [isClick, setIsClick] = useState(false);
  const {
    cart,
    totalPrice,
    totalCount,
  } = useContext(Context);

  const { pathname } = useLocation();

  return (
    <>
      <Header />
      <main>
        <div className="cart container">
          <BackButton />
          <h2 className="cart__title">Cart</h2>
          {cart.length > 0 && (
            <div className="cart__content">
              <div className="cart__items">
                {cart.map((cartItem: CartProduct) => (
                  <CartItem
                    key={cartItem.item.id}
                    cartItem={cartItem}
                  />
                ))}
              </div>
              <div className="cart__sum">
                <h2 className="cart__sum-amout" data-cy="productQauntity">
                  {`$${totalPrice()}`}
                </h2>
                <p className="cart__sum-items">{`Total price for ${totalCount()} items`}</p>
                <button
                  className={classNames('cart__sum-button',
                    { 'cart__sum-button--active': isClick })}
                  type="button"
                  onClick={() => setIsClick(!isClick)}
                >
                  {!isClick && (
                    'Checkout'
                  )}
                  {isClick && (
                    'Order is processed'
                  )}

                </button>
              </div>
            </div>
          )}
          {!cart.length && (
            <p className="cart__subtitle">{`The ${pathname.slice(1)} is empty`}</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};
