import style from './CartPage.module.scss';
import { CartItem } from './components/CartItem';
import { ButtonBack } from '../../shared/ui/ButtonBack';
import { useCart } from '../../store/CartContext';
import { ButtonAdd } from '../../shared/ui/ButtonAdd';
import { useEffect, useState } from 'react';
import { CartModal } from './components/CartModal';

export const CartPage = () => {
  const {
    state: { cart },
  } = useCart();
  const func = useCart();
  const [isCheck, setIsCheck] = useState(false);

  const checkoutCart = () => {
    setIsCheck(prev => !prev);
  };

  const closeModal = () => {
    setTimeout(() => {
      setIsCheck(false);
    }, 200);
  };

  useEffect(() => {
    if (isCheck === true) {
      document.body.style.position = 'relative';
    } else {
      document.body.style.position = 'auto';
    }
  }, [isCheck]);

  return (
    <div>
      <ButtonBack />

      <h1 className={style.pageTitile}>Cart</h1>

      {cart.length ? (
        <section className={style.wrapper}>
          <>
            <article className={style.itemsWrapper}>
              {cart.map((item, index) => (
                <CartItem key={index} item={item} />
              ))}
            </article>

            <article className={style.total}>
              <div className={style.textBlock}>
                <h2 className={style.price}>${func.getTotalPrice(cart)}</h2>
                <p className={style.countItem}>
                  Total for {func.getTotalItems(cart)} items
                </p>
              </div>
              <ButtonAdd title="Checkout" onClick={checkoutCart} />
            </article>

            {isCheck && <CartModal closeModal={closeModal} />}
          </>
        </section>
      ) : (
        <div className={style.cartEmpty}>
          <p className={style.textEmpty}>Your cart is empty...</p>
          <img
            src="./img/cart-is-empty.png"
            alt="empty cart"
            className={style.background}
          />
        </div>
      )}
    </div>
  );
};
