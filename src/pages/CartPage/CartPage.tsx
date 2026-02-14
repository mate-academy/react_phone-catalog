import { useEffect, useState } from 'react';
import './CartPage.scss';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../customHooks/customHooks';
import { CartProduct } from '../../components/CartProduct';
import { Modal } from '../../components/Modal';
import arrowLeft from '../../images/logo/arrowLeft.svg';
import emptyCart from '../../images/cart-is-empty.png';

export const CartPage: React.FC = () => {
  const { productsInCart } = useAppSelector(state => state.cart);

  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const totalCartPrice = productsInCart.reduce(
    (product, acc) => product + acc.price * acc.quantity,
    0,
  );

  const totalCartQuantity = productsInCart.reduce(
    (acc, product) => acc + product.quantity,
    0,
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const root = document.documentElement;

  if (isOpen) {
    root.style.overflow = 'hidden';
  } else {
    root.style.overflow = 'auto';
  }

  return (
    <section className="cart">
      <button className="cart__back_button" onClick={() => navigate(-1)}>
        <img src={arrowLeft} alt="Back" className="cart__back_button__img" />
        <p className="cart__back_button__text">Back</p>
      </button>
      <h1 className="cart__title">Cart</h1>

      <div className="cart__content">
        {productsInCart.length > 0 ? (
          <>
            <ul className="cart__list">
              {productsInCart.map(product => {
                return (
                  <li className="cart__item" key={product.id}>
                    <CartProduct product={product} />
                  </li>
                );
              })}
            </ul>

            <div className="cart__info">
              <div className="cart__info__price_section">
                <p className="cart__info__price_section-price">{`$${totalCartPrice}`}</p>
                <p className="cart__info__price_section-count">
                  {`Total for ${totalCartQuantity} item(s)`}
                </p>
              </div>

              <span className="cart__info__line"></span>

              <button
                className="cart__info__button"
                onClick={() => setIsOpen(true)}
              >
                Checkout
              </button>

              {isOpen && <Modal setIsOpen={setIsOpen} />}
            </div>
          </>
        ) : (
          <div className="cart__empty">
            <p className="cart__empty_title">Your Cart is empty</p>
            <img src={emptyCart} alt="EmptyCart" className="cart__empty_img" />
          </div>
        )}
      </div>
    </section>
  );
};
