import { useContext, useState } from 'react';
import { AddToCartContext } from '../../contexts/AddToCartContext';
import style from './CartPage.module.scss';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { CartItems } from './components/CartItems';

export const CartPage = () => {
  const { cart, setCart } = useContext(AddToCartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = () => {
    setCart([]);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={style.cart}>
      <div className="container">
        {cart.length > 0 ? (
          <>
            <div className={style.cart__content}>
              <div className={style.cart__top}>
                <Link to=".." className={style.cart__back}>
                  back
                </Link>
                <h1 className={style.cart__title}>Cart</h1>
              </div>

              <div className={style.cart__main}>
                <CartItems />

                <div className={cn(style.cart__checkout, style.checkout)}>
                  <div className={style.checkout__content}>
                    <h2 className={style.checkout__price}>
                      $
                      {cart.reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0,
                      )}
                    </h2>

                    <p className={style.checkout__amount}>
                      {`Total for ${cart.reduce(
                        (sum, item) => sum + item.quantity,
                        0,
                      )} items`}
                    </p>

                    <div className={style.checkout__line}></div>

                    <button
                      className={style.checkout__button}
                      onClick={() => setIsModalOpen(true)}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {isModalOpen && (
              <div className={style.modal}>
                <div className={style.modal__overlay} onClick={handleCancel} />

                <div className={style.modal__content}>
                  <p className={style.modal__text}>
                    Checkout is not implemented yet. Do you want to clear the
                    Cart?
                  </p>

                  <div className={style.modal__actions}>
                    <button
                      className={style.modal__action}
                      onClick={handleConfirm}
                    >
                      Confirm
                    </button>

                    <button
                      className={style.modal__action}
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className={style['cart__no-items-container']}>
            <img
              src="public/img/cart-is-empty.png"
              alt="Cart is empty"
              className={style['cart__no-items']}
            />
          </div>
        )}
      </div>
    </div>
  );
};
