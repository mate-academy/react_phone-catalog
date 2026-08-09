/* eslint-disable @typescript-eslint/no-explicit-any */
//#region iconImports
import Right from '../../icons/Right.svg';
import Home from '../../icons/Home.svg';
//#endregion

//#region import
import styles from './Cart.module.scss';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Link } from 'react-router-dom';
import { CartCard } from '../../components/CartCard';
import { useCart } from '../../context/CartContext';
//#endregion

export function Cart() {
  const { cart, totalPrice, totalItems } = useCart();

  return (
    <div className={styles.cartBlock}>
      <Header />

      <main className={styles.main}>
        <div className={styles.BreadCrumbs}>
          <Link to={'/'} className={styles.BreadCrumbs__link}>
            <img src={Home} alt="" className={styles.BreadCrumbs__img} />
          </Link>
          <img src={Right} alt="" />
          <Link to={'/cart'} className={styles.BreadCrumbs__link}>
            Cart
          </Link>
        </div>
        <h2 className={styles.title}>Cart</h2>
        <div className={styles.cart}>
          <div className={styles.products}>
            {cart.map(item => (
              <CartCard
                key={item.product.itemId}
                product={item.product}
                quantity={item.quantity}
              />
            ))}
          </div>
          <div className={styles.total}>
            <h2 className={styles.total__price}>${totalPrice}</h2>
            <p className={styles.total__items}>Total for {totalItems} items</p>
            <hr className={styles.total__divider} />
            <button className={styles.total__button}>Checkout</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
