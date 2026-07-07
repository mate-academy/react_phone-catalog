import { Link } from 'react-router-dom';

import styles from './Cart.module.scss';
import { useCart } from '../../context/CartContext';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalQuantity } = useCart();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  if (cart.length === 0) {
    return (
      <div className={styles.containerEmpty}>
        <img
          src="/img/cart-is-empty.png"
          alt="empty"
          className={styles.emptyImg}
        />
        <p className={styles.emptyText}>Your cart is empty</p>
        <Link to="/" className={styles.backHome}>
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <section className={styles.container}>
      <Link to="/" className={styles.home}>
        <button className={styles.homeButton}>
          <img src="/img/home.svg" alt="home" className={styles.homeImg} />
          <span className={styles.homeGo}>{'>'}</span>
          <span className={styles.homeGoTo}>Cart</span>
        </button>
      </Link>
      <h1 className={styles.titleContainer}>Cart</h1>
      <div className={styles.gridContainer}>
        <div className={styles.gridCartBlock}>
          <div className={styles.cartItem}>
            {cart.map(item => (
              <article key={item.product.id} className={styles.cartBlock}>
                <button
                  className={styles.buttonCartBlock}
                  onClick={() => removeFromCart(item.product)}
                >
                  <img
                    className={styles.imgClose}
                    src="./img/union.svg"
                    alt="close"
                  />
                </button>
                <img
                  className={styles.imgCartBlock}
                  src={item.product.image}
                  alt={item.product.name}
                />
                <h3>{item.product.name}</h3>
                <button
                  onClick={() =>
                    updateQuantity(item.product, item.quantity - 1)
                  }
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(item.product, item.quantity + 1)
                  }
                >
                  +
                </button>
                <div className={styles.cardPriceGoup}>
                  <span className={styles.cardPriceHot}>
                    ${item.product.price}
                  </span>
                  {/* <span className={styles.cardfullPriceHot}>
                    ${item.product.fullPrice}
                  </span> */}
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className={styles.totalPriceBlock}>
          <strong className={styles.cardTotal}>${totalPrice}</strong>
          <p className={styles.cardTotalFor}>Total for {totalQuantity} item</p>
          <button className={styles.checkOut}>Checkout</button>
        </div>
      </div>
    </section>
  );
};
