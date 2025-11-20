import style from './ShoppingCart.module.scss';
import { useContext } from 'react';
import { CartContext } from '../../context/Cart';
import Cart from './Cart/Cart';
import { Link } from 'react-router-dom';
import { ProductsEmpty } from '@GlobalComponents';

export const ShoppingCart = () => {
  const { cartItems, getCartTotal } = useContext(CartContext);

  return (
    <>
      <main className="mian">
        <section className="section">
          <div className="container">
            <div className={style.wrapper}>
              <div className={style.back}>
                <Link className={style.back__link} to={'/'}>
                  Back
                </Link>
              </div>
              <h1 className={`title ${style.title}`}>Cart</h1>
              {cartItems.length > 0 ? (
                <div className={style.content}>
                  <div className={style.cards}>
                    {cartItems.map(item => (
                      <Cart item={item} key={item.id} />
                    ))}
                  </div>

                  <div className={style['cart-price']}>
                    <span className={style['cart-price__total']}>
                      ${getCartTotal()}
                    </span>
                    <span className={style['cart-price__quantity']}>
                      Total for 3 items
                    </span>

                    <div className={style['cart-price__button']}>
                      <button>Checkout</button>
                      <span className={style.line}></span>
                    </div>
                  </div>
                </div>
              ) : (
                <ProductsEmpty title="Cart" />
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
