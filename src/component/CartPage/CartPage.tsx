import { useContext, useState } from 'react';
import { BackLink } from '../BackLink/BackLink';
import style from './CartPage.module.scss';
import { StateContext } from './../../hooks/SelectionState';
import { Products } from './../../types/Products';
import { CartItem } from './CartItem';
import { CheckoutModal } from './CartItem/CheckoutModal/CheckoutModal';

export interface CartProduct {
  quantity: number;
  product: Products;
  id: string;
}

export const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cart } = useContext(StateContext);

  const totalPrice = cart.reduce(
    (total, p) => total + p.product.price * p.quantity,
    0,
  );
  const totalQuantity = cart.reduce((count, p) => count + p.quantity, 0);

  return (
    <section className={style['cart-page']}>
      <BackLink fromCategory="/" />
      <h1 className={style['cart-page__title']}>Cart</h1>

      {cart.length ? (
        <div className={style['cart-page__container']}>
          <ul className={style['cart-page__list']}>
            {cart.map(product => {
              return (
                <li key={product.id}>
                  <CartItem product={product} />
                </li>
              );
            })}
          </ul>
          <div className={style['cart-page__total']}>
            <p className={style['cart-page__total-price']}>${totalPrice}</p>
            <p className={style['cart-page__total-desc']}>
              Total for {totalQuantity} item{cart.length > 1 ? 's' : ''}
            </p>
            <button
              className={style['cart-page__button--checkout']}
              onClick={() => setIsModalOpen(true)}
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className={style['empty-cart']}>
          <p className={style['empty-cart__text']}>Your cart is empty</p>
          <img
            className={style['empty-cart__image']}
            src="img/cart-is-empty.png"
            alt="Empty Cart"
          />
        </div>
      )}

      {isModalOpen && (
        <CheckoutModal
          close={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </section>
  );
};
