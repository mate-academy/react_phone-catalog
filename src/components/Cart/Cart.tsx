import { NavLink } from 'react-router-dom';
import styles from './Cart.module.scss';
import { CartItem } from '../CartItem';

const product = {
  id: 1,
  category: 'phones',
  itemId: 'apple-iphone-7-32gb-black',
  name: 'Apple iPhone 7 32GB Black',
  fullPrice: 400,
  price: 375,
  screen: "4.7' IPS",
  capacity: '32GB',
  color: 'black',
  ram: '2GB',
  year: 2016,
  image: 'img/phones/apple-iphone-7/black/00.webp',
};

export const Cart = () => {
  return (
    <main className={styles.page}>
      <div className={styles.pageContent}>
        <NavLink to="/" className={styles.pathHome}>
          <span className={styles.pathHome_title}>&lt;</span>
          <span className={styles.pathHome_title}>Back</span>
        </NavLink>

        <h1 className={styles.pageInfo_title}>Cart</h1>

        <div className={styles.pageItems}>
          <div className={styles.pageItems_list}>
            {[1, 2, 3].map(() => (
              <CartItem key={product.id} product={product} />
            ))}
          </div>
          <div className={styles.pageItems_checkout}>
            <div className={styles.pageItems_checkout_info}>
              <span className={styles.pageItems_checkout_info_price}>
                $2657
              </span>
              <span className={styles.pageItems_checkout_info_text}>
                Total for 3 items
              </span>
            </div>
            <div className={styles.pageItems_checkout_line}></div>
            <button className={styles.pageItems_checkout_button}>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
